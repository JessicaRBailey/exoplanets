from flask import Flask, render_template, jsonify, send_file
from pymongo import MongoClient


app = Flask(__name__)

# Connect to MongoDB
client = MongoClient(port=27017)
db = client['ExoplanetDB']
collection = db['exoplanet_counts']

@app.route('/')
def index():
    metrics_data = list(collection.find({}, {'_id': False}))
    return render_template('index.html', metrics_data=metrics_data)

# @app.route('/getMetrics')
# def get_metrics():
#     metrics_data = collection.find_one({}, {'_id': False})
#     return jsonify(metrics_data)

@app.route('/getjson')
def get_json():
    return send_file('static/json/exoplanet_data.json', mimetype = 'application/json')

@app.route('/getMetrics')
def get_metrics():
    metrics_data = list(collection.find({}, {'_id': False}))
    return jsonify(metrics_data)

if __name__ == '__main__':
    app.run(debug=True)
