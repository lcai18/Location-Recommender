from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from planVisit import PlanVisit

app = Flask(__name__)

CORS(app)


@app.route('/')
@cross_origin()
def main():
    return "default home page"


@app.route('/citysearch')
@cross_origin()
def citysearch():
    data = request.get_json()

    if 'query' not in data:
        return jsonify({'error': 'No query provided'}), 400

    query = data['query']
    visitPlan = PlanVisit(query)
    cities = []
    for loc in visitPlan.locations:
        cities.append(loc)
    return jsonify({'response': cities})
