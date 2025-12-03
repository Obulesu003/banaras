from PIL import Image
import numpy as np

def process_image():
    input_path = r"C:\Users\boss\.gemini\antigravity\brain\4d92b549-9a52-4705-8caa-8ae2fe82b9e0\uploaded_image_1764760583857.jpg"
    logo_output_path = "public/logo.png"
    favicon_output_path = "public/favicon.png"
    
    print(f"Processing {input_path}...")
    img = Image.open(input_path)
    img = img.convert("RGBA")
    data = np.array(img)
    
    # --- Background Removal ---
    # Identify White pixels (Checkerboard Light)
    # R, G, B > 240
    white_mask = (data[:, :, 0] > 240) & (data[:, :, 1] > 240) & (data[:, :, 2] > 240)
    
    # Identify Gray pixels (Checkerboard Dark)
    # R, G, B around 194 (tolerance +/- 10)
    gray_mask = (data[:, :, 0] > 184) & (data[:, :, 0] < 204) & \
                (data[:, :, 1] > 184) & (data[:, :, 1] < 204) & \
                (data[:, :, 2] > 182) & (data[:, :, 2] < 202)
                
    # Combine masks
    bg_mask = white_mask | gray_mask
    
    # Set background to transparent
    data[bg_mask] = [0, 0, 0, 0]
    
    # --- Text Color Inversion ---
    # Define ROI: Bottom 30% (where the text is)
    height, width = data.shape[:2]
    roi_start_y = int(height * 0.7)
    roi = data[roi_start_y:, :, :]
    
    # Identify Dark pixels (Text)
    # R, G, B < 60 and NOT transparent
    r, g, b, a = roi[:, :, 0], roi[:, :, 1], roi[:, :, 2], roi[:, :, 3]
    text_mask = (r < 60) & (g < 60) & (b < 60) & (a > 50)
    
    # Set to White (255, 255, 255)
    roi[text_mask, 0] = 255 # R
    roi[text_mask, 1] = 255 # G
    roi[text_mask, 2] = 255 # B
    
    # Update data
    data[roi_start_y:, :, :] = roi
    
    # Save Logo
    logo_img = Image.fromarray(data)
    logo_img.save(logo_output_path)
    print(f"Saved logo to {logo_output_path}")
    
    # --- Favicon Generation ---
    # Crop to character head
    # We can use the alpha channel to find the bounding box of non-transparent pixels
    # But we want to exclude the text at the bottom.
    
    # Let's crop the top 65% of the non-transparent area
    bbox = logo_img.getbbox()
    if bbox:
        content_height = bbox[3] - bbox[1]
        crop_bottom = bbox[1] + int(content_height * 0.65)
        favicon_img = logo_img.crop((bbox[0], bbox[1], bbox[2], crop_bottom))
        
        # Tighten crop
        bbox2 = favicon_img.getbbox()
        if bbox2:
            favicon_img = favicon_img.crop(bbox2)
            
        # Resize
        favicon_img.thumbnail((64, 64), Image.Resampling.LANCZOS)
        favicon_img.save(favicon_output_path)
        print(f"Saved favicon to {favicon_output_path}")

if __name__ == "__main__":
    process_image()
