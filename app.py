from flask import Flask, render_template

app = Flask(__name__)

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

if __name__ == '__main__':
    app.run(debug=True)