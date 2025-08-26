from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
import cv2
from io import BytesIO

app = FastAPI()

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your React domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model = tf.keras.models.load_model("densenet121_tb_model.keras")

# Define image size
img_size = (224, 224)

# Class labels
labels = {0: "Normal", 1: "TB Affected", 2: "Confusing"}

@app.post("/predict/")
async def predict_image(file: UploadFile = File(...)):
    contents = await file.read()
    img_array = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
    img = cv2.resize(img, img_size)
    img = img / 255.0
    img = np.expand_dims(img, axis=0)

    predictions = model.predict(img)
    predicted_class = int(np.argmax(predictions))
    confidence = float(np.max(predictions))

    print(f"Prediction: {labels[predicted_class]} with confidence {confidence:.2f}")

    return {
        "class": labels[predicted_class],
        "confidence": round(confidence, 4)
    }
