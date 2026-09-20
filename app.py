import os
from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

# ---------- Маршруты страниц ----------
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/privacy')
def privacy():
    return render_template('privacy.html')

@app.route('/en')
def home_en():
    return render_template('index_en.html')

@app.route('/privacy_en')
def privacy_en():
    return render_template('privacy_en.html')

# ---------- Иконки для браузера и поисковых систем ----------
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(
        os.path.join(app.root_path, 'static'),
        'favicon.ico',
        mimetype='image/vnd.microsoft.icon'
    )

@app.route('/apple-touch-icon.png')
def apple_touch_icon():
    return send_from_directory(
        os.path.join(app.root_path, 'static'),
        'apple-touch-icon.png',
        mimetype='image/png'
    )

if __name__ == '__main__':
    app.run(debug=True)