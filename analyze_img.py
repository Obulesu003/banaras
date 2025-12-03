from PIL import Image
import os

def analyze_image(path):
    try:
        img = Image.open(path)
        print(f"File: {os.path.basename(path)}")
        print(f"Format: {img.format}")
        print(f"Size: {img.size}")
        print(f"Mode: {img.mode}")
        
        # Sample corners to guess background color
        corners = [
            img.getpixel((0, 0)),
            img.getpixel((img.width-1, 0)),
            img.getpixel((0, img.height-1)),
            img.getpixel((img.width-1, img.height-1))
        ]
        print(f"Corner pixels: {corners}")
        
    except Exception as e:
        print(f"Error analyzing {path}: {e}")

analyze_image(r"C:\Users\boss\.gemini\antigravity\brain\4d92b549-9a52-4705-8caa-8ae2fe82b9e0\uploaded_image_1764756115926.png")
