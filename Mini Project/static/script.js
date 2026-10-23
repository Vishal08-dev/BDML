
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const predictBtn = document.getElementById("predictBtn");
const clearBtn = document.getElementById("clearBtn");

let drawing = false;

// Black background, like MNIST after inversion
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = "white";
ctx.lineWidth = 18;
ctx.lineCap = "round";
ctx.lineJoin = "round";

function getPosition(event) {
    const rect = canvas.getBoundingClientRect();

    return {
        x: (event.clientX - rect.left) * canvas.width / rect.width,
        y: (event.clientY - rect.top) * canvas.height / rect.height
    };
}

canvas.addEventListener("pointerdown", (event) => {
    drawing = true;
    canvas.setPointerCapture(event.pointerId);

    const pos = getPosition(event);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.lineTo(pos.x + 0.1, pos.y + 0.1);
    ctx.stroke();
});

canvas.addEventListener("pointermove", (event) => {
    if (!drawing) return;

    const pos = getPosition(event);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
});

function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}

canvas.addEventListener("pointerup", stopDrawing);
canvas.addEventListener("pointercancel", stopDrawing);

clearBtn.addEventListener("click", () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    document.getElementById("digit").textContent = "?";
    document.getElementById("confidence").textContent =
        "Draw a digit to get started.";
});

predictBtn.addEventListener("click", async () => {
    predictBtn.disabled = true;
    predictBtn.textContent = "Predicting...";

    try {
        const blob = await new Promise(resolve =>
            canvas.toBlob(resolve, "image/png")
        );

        const formData = new FormData();
        formData.append("image", blob, "digit.png");

        const response = await fetch("/predict", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Prediction failed");
        }

        document.getElementById("digit").textContent = result.digit;
        document.getElementById("confidence").textContent =
            `Confidence: ${result.confidence}%`;

    } catch (error) {
        document.getElementById("confidence").textContent =
            "Error: " + error.message;
    } finally {
        predictBtn.disabled = false;
        predictBtn.textContent = "Predict Digit";
    }
});

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const predictBtn = document.getElementById("predictBtn");
const clearBtn = document.getElementById("clearBtn");

let drawing = false;

// Black background, like MNIST after inversion
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = "white";
ctx.lineWidth = 18;
ctx.lineCap = "round";
ctx.lineJoin = "round";

function getPosition(event) {
    const rect = canvas.getBoundingClientRect();

    return {
        x: (event.clientX - rect.left) * canvas.width / rect.width,
        y: (event.clientY - rect.top) * canvas.height / rect.height
    };
}

canvas.addEventListener("pointerdown", (event) => {
    drawing = true;
    canvas.setPointerCapture(event.pointerId);

    const pos = getPosition(event);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.lineTo(pos.x + 0.1, pos.y + 0.1);
    ctx.stroke();
});

canvas.addEventListener("pointermove", (event) => {
    if (!drawing) return;

    const pos = getPosition(event);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
});

function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}

canvas.addEventListener("pointerup", stopDrawing);
canvas.addEventListener("pointercancel", stopDrawing);

clearBtn.addEventListener("click", () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    document.getElementById("digit").textContent = "?";
    document.getElementById("confidence").textContent =
        "Draw a digit to get started.";
});

predictBtn.addEventListener("click", async () => {
    predictBtn.disabled = true;
    predictBtn.textContent = "Predicting...";

    try {
        const blob = await new Promise(resolve =>
            canvas.toBlob(resolve, "image/png")
        );

        const formData = new FormData();
        formData.append("image", blob, "digit.png");

        const response = await fetch("/predict", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Prediction failed");
        }

        document.getElementById("digit").textContent = result.digit;
        document.getElementById("confidence").textContent =
            `Confidence: ${result.confidence}%`;

    } catch (error) {
        document.getElementById("confidence").textContent =
            "Error: " + error.message;
    } finally {
        predictBtn.disabled = false;
        predictBtn.textContent = "Predict Digit";
    }
});
