from PIL import Image, ImageDraw

def remove_background_floodfill(input_path, output_path, tolerance=30):
    try:
        img = Image.open(input_path)
        img = img.convert("RGBA")
        
        # Get background color from top-left corner
        bg_color = img.getpixel((0, 0))
        
        # Use ImageDraw.floodfill to create a mask
        # We need to do this manually or use a library, but PIL's floodfill fills with color.
        # Instead, let's use a seed-based approach with a queue for better control or simply iterate if simple.
        # Actually, PIL has a floodfill in ImageDraw but it paints.
        # Let's use a more robust method: simple color distance check for the whole image might be better if the background is uniform enough,
        # but floodfill is safer for isolated internal parts.
        # Given the image is likely a logo on a solid background, let's try a color distance replacement first, 
        # but seeded from corners to avoid removing internal similar colors if possible.
        
        # Let's stick to the plan: Floodfill from corners.
        # Since PIL doesn't have a "floodfill to transparent" easily, we can use a BFS/DFS approach.
        
        width, height = img.size
        pixels = img.load()
        
        # Queue for BFS
        queue = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]
        visited = set(queue)
        
        # Helper to check color difference
        def is_similar(c1, c2, tol):
            return abs(c1[0] - c2[0]) <= tol and \
                   abs(c1[1] - c2[1]) <= tol and \
                   abs(c1[2] - c2[2]) <= tol

        target_color = pixels[0, 0] # Assume top-left is background
        
        # Process queue
        while queue:
            x, y = queue.pop(0)
            current_color = pixels[x, y]
            
            if is_similar(current_color, target_color, tolerance):
                pixels[x, y] = (0, 0, 0, 0) # Make transparent
                
                # Add neighbors
                for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                        visited.add((nx, ny))
                        queue.append((nx, ny))

        img.save(output_path, "PNG")
        print(f"Saved transparent image to {output_path}")

        # Create favicon (crop to top half roughly)
        # Find bounding box of non-transparent pixels
        bbox = img.getbbox()
        if bbox:
            # Crop to the character head (roughly top 60% of the visible content)
            content_height = bbox[3] - bbox[1]
            crop_bottom = bbox[1] + int(content_height * 0.65)
            favicon = img.crop((bbox[0], bbox[1], bbox[2], crop_bottom))
            
            # Resize for favicon standard
            favicon.thumbnail((64, 64), Image.Resampling.LANCZOS)
            favicon.save("public/favicon.png", "PNG")
            print("Saved favicon to public/favicon.png")

    except Exception as e:
        print(f"Error processing {input_path}: {e}")

if __name__ == "__main__":
    input_image = r"C:\Users\boss\.gemini\antigravity\brain\4d92b549-9a52-4705-8caa-8ae2fe82b9e0\uploaded_image_1764756115926.png"
    output_image = "public/logo.png"
    remove_background_floodfill(input_image, output_image, tolerance=50)
