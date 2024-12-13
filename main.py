import sys
import json
import cv2
import numpy as np
import skimage.color

def run_histogram_equalization(img_bgr):
    img_ycrcb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2YCrCb)
    img_ycrcb[:, :, 0] = cv2.equalizeHist(img_ycrcb[:, :, 0])
    img_bgr = cv2.cvtColor(img_ycrcb, cv2.COLOR_YCrCb2BGR)
    return img_bgr


def segment_otsu(image_grayscale, img_BGR):
    """Segment using otsu binarization and thresholding."""
    threshold_value, threshold_image = cv2.threshold(image_grayscale, 0, 255,cv2.THRESH_BINARY_INV+cv2.THRESH_OTSU)
    threshold_image_binary = 1 - (threshold_image / 255)
    threshold_image_binary = np.repeat(threshold_image_binary[:, :, np.newaxis], 3, axis=2)
    img_face_only = np.multiply(threshold_image_binary, img_BGR).astype('uint8')

    return img_face_only




def compute_ita(r, g, b):
    """Compute ITA angle based on RGB values."""
    if np.isnan(r) or np.isnan(g) or np.isnan(b):
        raise ValueError("Invalid RGB values: cannot compute ITA.")

    # Ensure values are within valid range (0-255)
    r, g, b = [max(0, min(255, v)) for v in (r, g, b)]

    # Convert RGB to LAB and compute ITA
    lab = skimage.color.rgb2lab([[[r, g, b]]], illuminant="D65", observer="10").flatten()
    l, _, b = lab
    # Avoid division by zero
    if b == 0:
        raise ValueError("Invalid LAB value: b is zero, cannot compute ITA.")

    ita = np.rad2deg(np.arctan((l - 50) / b))
    return ita
def predict_img(img_path, equalize=False):
    """Process and predict RGB values and ITA angle for the given image."""
    img_bgr = cv2.imread(img_path)
    if img_bgr is None:
        raise ValueError("Invalid image file or path")

    if equalize:
        img_bgr = run_histogram_equalization(img_bgr)

    img_grayscale = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)
    img_bgr = segment_otsu(img_grayscale, img_bgr)

    img_hsv = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2HSV)
    img_ycrcb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2YCrCb)

    # Debugging: Print ranges of HSV and YCrCb values


    # Adjusted mask
    mask = (
        (img_hsv[:, :, 0] <= 180)
        & (img_ycrcb[:, :, 1] >= 120)
        & (img_ycrcb[:, :, 1] <= 140)
        & (img_ycrcb[:, :, 2] >= 110)
        & (img_ycrcb[:, :, 2] <= 135)
    )
    

    if not mask.any():
        print("Mask is empty. Applying fallback criteria...")
        mask = img_grayscale > 50  # Fallback: simple brightness threshold
        cv2.imwrite("fallback_mask.png", mask.astype(np.uint8) * 255)  # Save fallback mask

    img_bgr[~mask] = 0

    blue = np.ma.array(img_bgr[:, :, 0], mask=~mask).mean()
    green = np.ma.array(img_bgr[:, :, 1], mask=~mask).mean()
    red = np.ma.array(img_bgr[:, :, 2], mask=~mask).mean()

    if np.isnan(blue) or np.isnan(green) or np.isnan(red):
        raise ValueError("No valid regions detected in the image.")

    ita = compute_ita(red, green, blue)

    return {"red": red, "green": green, "blue": blue, "ita": ita}

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No image path provided"}))
        sys.exit(1)

    image_path = sys.argv[1]

    try:
        result = predict_img(image_path, equalize=True)
        print(json.dumps(result))
    except Exception as e:
        import traceback
        # Capture and log the full traceback
        error_message = traceback.format_exc()
        print(json.dumps({"error": error_message}))
        sys.exit(1)
