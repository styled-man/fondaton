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


def segment_skin(img_bgr):
    """Segment the image to extract skin-tone regions."""
    img_hsv = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2HSV)
    img_ycrcb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2YCrCb)

    # Define skin-tone range in HSV and YCrCb color spaces
    mask = (
        (img_hsv[:, :, 0] <= 170) &
        (img_ycrcb[:, :, 1] >= 140) & (img_ycrcb[:, :, 1] <= 170) &
        (img_ycrcb[:, :, 2] >= 90) & (img_ycrcb[:, :, 2] <= 120)
    )

    img_skin = img_bgr.copy()
    img_skin[~mask] = 0  # Set non-skin regions to black
    return img_skin


def compute_ita(r, g, b):
    """Compute ITA angle based on RGB values."""
    lab = skimage.color.rgb2lab([[[r, g, b]]], illuminant="D65", observer="10").flatten()
    l, _, b = lab
    ita = np.rad2deg(np.arctan((l - 50) / b)) if b != 0 else None
    return ita


def predict_img(img_path, equalize=False):
    """Process and predict RGB values and ITA angle for the given image."""
    img_bgr = cv2.imread(img_path)
    if img_bgr is None:
        raise ValueError("Invalid image file or path")

    if equalize:
        img_bgr = run_histogram_equalization(img_bgr)

    img_bgr = segment_skin(img_bgr)

    # Calculate average RGB values for the skin regions
    mask = (img_bgr[:, :, 0] > 0) | (img_bgr[:, :, 1] > 0) | (img_bgr[:, :, 2] > 0)
    blue = np.ma.array(img_bgr[:, :, 0], mask=~mask).mean()
    green = np.ma.array(img_bgr[:, :, 1], mask=~mask).mean()
    red = np.ma.array(img_bgr[:, :, 2], mask=~mask).mean()

    if np.isnan(blue) or np.isnan(green) or np.isnan(red):
        raise ValueError("No valid regions detected in the image.")

    ita = compute_ita(red, green, blue)

    return {"red": red, "green": green, "blue": blue, "ita": ita, "segmented_img": img_bgr}


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No image path provided"}))
        sys.exit(1)

    image_path = sys.argv[1]

    try:
        result = predict_img(image_path, equalize=True)
        # Save the segmented image (optional)
        segmented_image_path = "segmented_skin_image.png"
        cv2.imwrite(segmented_image_path, result.pop("segmented_img"))

        # Output only RGB values
        print(json.dumps({"red": result["red"], "green": result["green"], "blue": result["blue"]}))
    except Exception as e:
        import traceback
        error_message = traceback.format_exc()
        print(json.dumps({"error": error_message}))
        sys.exit(1)

