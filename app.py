from flask import Flask, render_template, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# Connect to MongoDB
client = MongoClient(port=27017)
db = client['ExoplanetDB']
collection = db['exoplanet_counts']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/getMetrics')
def get_metrics():
    metrics_data = collection.find_one({}, {'_id': False})
    return jsonify(metrics_data)

if __name__ == '__main__':
    app.run(debug=True)
