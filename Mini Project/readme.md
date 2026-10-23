# DigitVision: CNN-Based Handwritten Digit Recognition

## About the Project

DigitVision is a web application that recognizes handwritten digits from 0 to 9 using a Convolutional Neural Network (CNN). Users can draw a digit on an interactive canvas, and the trained model predicts the digit and displays its confidence score.

The application is built using Python, TensorFlow/Keras, Flask, HTML, CSS, and JavaScript.

## Features

- Interactive canvas for drawing handwritten digits
- CNN-based digit classification from 0 to 9
- Prediction result with confidence score
- Image preprocessing to improve prediction accuracy
- Clear button to draw another digit
- Model evaluation using a confusion matrix
- Simple, responsive web interface

## Technologies Used

- **Python** — application logic
- **TensorFlow and Keras** — CNN model development and training
- **Flask** — web application backend
- **HTML and CSS** — webpage structure and styling
- **JavaScript** — interactive drawing canvas and prediction requests
- **NumPy and Pillow** — image processing
- **Matplotlib and scikit-learn** — model evaluation and confusion matrix

## Dataset

The project uses the **MNIST handwritten digit dataset**, which contains grayscale images of handwritten digits from 0 to 9.

- Image size: 28 × 28 pixels
- Training images: 60,000
- Testing images: 10,000
- Number of classes: 10

## CNN Model Architecture

The CNN consists of:

1. Convolutional layer with 32 filters and ReLU activation
2. Max-pooling layer
3. Convolutional layer with 64 filters and ReLU activation
4. Max-pooling layer
5. Flatten layer
6. Dense layer with 64 neurons and ReLU activation
7. Dropout layer
8. Output layer with 10 neurons and Softmax activation

The model is trained using the Adam optimizer and sparse categorical cross-entropy loss.

## Model Performance

The model achieved **99.10% test accuracy** during the recorded training run.

A confusion matrix is generated to visualize the model's classification performance across the ten digit classes.

## Project Structure

```text
DigitVision/
├── app.py
├── train_model.py
├── digit_cnn_model.keras
├── confusion_matrix.png
├── requirements.txt
├── README.md
├── templates/
│   └── index.html
└── static/
    ├── style.css
    └── script.js
```

## Installation and Execution

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd DigitVision
```

Replace `YOUR_REPOSITORY_URL` with the URL of your GitHub repository.

### 2. Create a virtual environment (optional)

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Activate it on Linux or macOS:

```bash
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the application

Ensure that `digit_cnn_model.keras` is present in the project root, then execute:

```bash
python app.py
```

### 5. Open the application

Visit the following address in your browser:

```text
http://127.0.0.1:5000
```

Draw a digit on the canvas and click **Predict Digit** to see the result.

## How It Works

1. The user draws a digit on the web canvas.
2. The frontend sends the drawing to the Flask backend.
3. The backend converts the image into grayscale and preprocesses it into the required 28 × 28 format.
4. The trained CNN predicts the digit.
5. The predicted digit and confidence score are displayed on the webpage.

## Future Enhancements

- Display prediction history
- Add sample digits for testing
- Improve recognition of different handwriting styles
- Compare multiple CNN architectures
- Add support for uploading digit images

## Conclusion

DigitVision demonstrates how a CNN can be trained to recognize handwritten digits and integrated into a web application. It combines image preprocessing, deep learning, model evaluation, and web development in a practical machine learning project.
