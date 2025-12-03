from PIL import Image
import numpy as np
from collections import Counter

img_path = r"C:\Users\boss\.gemini\antigravity\brain\4d92b549-9a52-4705-8caa-8ae2fe82b9e0\uploaded_image_1764760583857.jpg"
img = Image.open(img_path)
img = img.convert("RGBA")
data = np.array(img)

# Flatten and count colors
colors = data.reshape(-1, 4)
# Convert to tuple to be hashable
colors_tuples = [tuple(c) for c in colors]
counts = Counter(colors_tuples)

print("Top 20 most common colors:")
for color, count in counts.most_common(20):
    # Convert numpy ints to python ints for clean output
    clean_color = tuple(int(c) for c in color)
    print(f"Color: {clean_color}, Count: {count}")
