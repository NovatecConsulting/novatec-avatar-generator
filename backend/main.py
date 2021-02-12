import io
import os
import sys
from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
import time
import logging

import u2net

logging.basicConfig(level=logging.INFO)

# Initialize the Flask application
app = Flask(__name__)
CORS(app)


# Simple probe.
@app.route('/', methods=['GET'])
def hello():
    return 'Hello U^2-Net!'


# Route http posts to this method
@app.route('/', methods=['POST'])
def run():
    start = time.time()
    # Convert string of image data to uint8
    if 'data' not in request.files:
        return jsonify({'error': 'missing file param `data`'}), 400
    data = request.files['data'].read()
    if len(data) == 0:
        return jsonify({'error': 'empty image'}), 400

    # Convert string data to PIL Image
    img = Image.open(io.BytesIO(data))

    # Ensure i,qge size is under 1024
    if img.size[0] > 1024 or img.size[1] > 1024:
        img.thumbnail((1024, 1024))

    # Process Image
    res = u2net.run(np.array(img))
    res = res.resize((img.size), resample=Image.BILINEAR) # remove resample

    # empty_img = Image.new("RGBA", (img.size), 0)
    bg = Image.open('bg.jpg')
    bg = bg.resize((img.size), resample=Image.BILINEAR)
    # new_img = Image.composite(img, empty_img, res.convert("L"))
    new_img = Image.composite(img, bg, res.convert("L"))

    # Save to buffer
    buffer = io.BytesIO()
    new_img.save(buffer, "PNG")
    buffer.seek(0)
    # Print stats
    logging.info(f'Completed in {time.time() - start:.2f}s')
    new_img.save("test.png")
    return send_file(buffer, mimetype='image/png')


if __name__ == '__main__':
    os.environ['FLASK_ENV'] = 'development'
    port = int(os.environ.get('PORT', 8080))
    app.run(debug=True, host='0.0.0.0', port=port)
