
from flask import Flask, render_template, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image, ImageOps
import io

app = Flask(__name__)

# Load trained CNN
model = tf.keras.models.load_model("digit_cnn_model.keras")


def preprocess_image(image):
    # Convert to grayscale
    image = image.convert("L")

    # Canvas already has white digits on a black background.
    # Do NOT invert the colors.

    pixels = np.array(image)

    # Find the digit's bounding box
    coords = np.argwhere(pixels > 30)

    if len(coords) == 0:
        raise ValueError("Please draw a digit first.")

    y_min, x_min = coords.min(axis=0)
    y_max, x_max = coords.max(axis=0) + 1

    # Crop around the digit
    cropped = image.crop((x_min, y_min, x_max, y_max))

    # Add padding to make the crop square
    width, height = cropped.size
    side = max(width, height) + 20

    square = Image.new("L", (side, side), 0)
    square.paste(
        cropped,
        ((side - width) // 2, (side - height) // 2)
    )

    # Resize digit to 20x20, leaving room around it
    digit = square.resize((20, 20), Image.Resampling.LANCZOS)

    # Place digit in the center of a 28x28 image
    final_image = Image.new("L", (28, 28), 0)
    final_image.paste(digit, (4, 4))

    # Normalize and reshape for CNN
    array = np.array(final_image).astype("float32") / 255.0
    array = array.reshape(1, 28, 28, 1)

    return array


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    try:
        file = request.files.get("image")

        if not file:
            return jsonify({"error": "No image received."}), 400

        image = Image.open(io.BytesIO(file.read()))
        processed = preprocess_image(image)

        probabilities = model.predict(processed, verbose=0)[0]
        digit = int(np.argmax(probabilities))
        confidence = float(probabilities[digit] * 100)

        return jsonify({
            "digit": digit,
            "confidence": round(confidence, 2)
        })

    except Exception as error:
        return jsonify({"error": str(error)}), 400


if __name__ == "__main__":
    app.run(debug=True)
