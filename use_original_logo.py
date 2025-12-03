from PIL import Image

def process_image():
    input_path = r"C:\Users\boss\.gemini\antigravity\brain\4d92b549-9a52-4705-8caa-8ae2fe82b9e0\uploaded_image_1764761675338.jpg"
    logo_output_path = "public/logo.png"
    favicon_output_path = "public/favicon.png"
    
    print(f"Processing {input_path}...")
    img = Image.open(input_path)
    
    # Save Logo "as is" (just convert to PNG)
    img.save(logo_output_path)
    print(f"Saved logo to {logo_output_path}")
    
    # Generate Favicon (Crop to head, keep background)
    # Get dimensions
    width, height = img.size
    
    # Estimate head position (Center-ish, top-ish)
    # Based on the image, the head is roughly in the top 60%
    # Let's take a square crop from the top center
    
    crop_size = int(min(width, height) * 0.6)
    left = (width - crop_size) // 2
    top = int(height * 0.05) # Start slightly from top
    right = left + crop_size
    bottom = top + crop_size
    
    favicon_img = img.crop((left, top, right, bottom))
    
    # Resize to standard favicon size
    favicon_img.thumbnail((64, 64), Image.Resampling.LANCZOS)
    favicon_img.save(favicon_output_path)
    print(f"Saved favicon to {favicon_output_path}")

if __name__ == "__main__":
    process_image()
