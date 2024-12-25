import base64
import os

# Create images directory if it doesn't exist
if not os.path.exists('images'):
    os.makedirs('images')

# Save the family photo
family_photo = """[Your base64 string for the family photo]"""
with open('images/family_together.jpg', 'wb') as f:
    f.write(base64.b64decode(family_photo))

# Save the grandpa photo
grandpa_photo = """[Your base64 string for the grandpa photo]"""
with open('images/grandpa_portrait.jpg', 'wb') as f:
    f.write(base64.b64decode(grandpa_photo)) 