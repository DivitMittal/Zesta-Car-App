import sys
import base64
import numpy as np
import cv2
import easyocr
from ultralytics import YOLO

def write_out(text):
    with open("./result/output.txt", "w") as f:
        f.write(text)

try:
    with open("./uploads/image_base64.txt", "r") as f:
        b64 = f.read()
    arr = np.frombuffer(base64.b64decode(b64), dtype=np.uint8)
    img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    if img is None:
        write_out("ERROR: bad image")
        sys.exit(1)

    plates = YOLO("./models/best.pt")(img)[0].boxes.data.tolist()
    if not plates:
        write_out("NO_PLATE_DETECTED")
        sys.exit(0)

    # pick highest confidence
    x1, y1, x2, y2, score, _ = max(plates, key=lambda p: p[4])
    crop = img[int(y1):int(y2), int(x1):int(x2), :]

    results = easyocr.Reader(["en"], gpu=True).readtext(crop)
    if not results:
        write_out("OCR_FAILED")
        sys.exit(0)

    text = max(results, key=lambda r: r[2])[1]
    write_out(text)

except Exception as e:
    write_out(f"ERROR: {e}")
    sys.exit(1)
