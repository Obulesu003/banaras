from rembg import remove
from PIL import Image
import numpy as np
import io

def process_image(input_path, output_path, is_favicon=False):
    try:
        print(f"Processing {input_path}...")
        with open(input_path, 'rb') as i:
            input_data = i.read()
            
    # Remove background using rembg (AI model)
        output_data = remove(input_data)
        
        img = Image.open(io.BytesIO(output_data))
        
        if not is_favicon:
            # Convert to numpy array to manipulate pixels
            data = np.array(img)
            
            # Get dimensions
            height, width = data.shape[:2]
            
            # Define ROI: Bottom 30% (where the text is)
            roi_start_y = int(height * 0.7)
            roi = data[roi_start_y:, :, :]
            
            # Check if image has alpha channel
            if data.shape[2] == 4:
                r, g, b, a = roi[:, :, 0], roi[:, :, 1], roi[:, :, 2], roi[:, :, 3]
                # Find dark pixels (R, G, B < 60) that are not transparent
                mask = (r < 60) & (g < 60) & (b < 60) & (a > 50)
                
                # Set to White (255, 255, 255)
                roi[mask, 0] = 255 # R
                roi[mask, 1] = 255 # G
                roi[mask, 2] = 255 # B
                
                # Update data
                data[roi_start_y:, :, :] = roi
                img = Image.fromarray(data)
        
        if is_favicon:
            # Crop to character head for favicon
            bbox = img.getbbox()
            if bbox:
                # Crop to top 65% of content
                content_height = bbox[3] - bbox[1]
                crop_bottom = bbox[1] + int(content_height * 0.65)
                img = img.crop((bbox[0], bbox[1], bbox[2], crop_bottom))
                
                # Tighten crop again
                bbox2 = img.getbbox()
                if bbox2:
                    img = img.crop(bbox2)
            
            # Resize
            img.thumbnail((64, 64), Image.Resampling.LANCZOS)
            
        img.save(output_path)
        print(f"Saved to {output_path}")
        
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

if __name__ == "__main__":
    # Use the new user-provided image
    input_image = r"C:\Users\boss\.gemini\antigravity\brain\4d92b549-9a52-4705-8caa-8ae2fe82b9e0\uploaded_image_1764761470811.jpg"
    
    # Generate Logo
    process_image(input_image, "public/logo.png", is_favicon=False)
    
    # Generate Favicon
    process_image(input_image, "public/favicon.png", is_favicon=True)
