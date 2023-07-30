from flask import Flask, request, jsonify, g
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

    if 'location' not in data:
        return jsonify({'error': 'No location provided'}), 400

    location = data['location']
    visitPlan = PlanVisit(location)
    cities = []
    visitPlan.get_city_summary()
    visitPlan.retrieve_hotels()
    visitPlan.retrieve_pictures_of_landmarks()
    visitPlan.retrieve_restaurants()
    for loc in visitPlan.locations:
        cities.append((loc, visitPlan.city_map_to_information[loc][3]))
    g.visitPlan = visitPlan

    return jsonify({'response': cities})


@app.route('/citysearch/<string:loc>', methods=['GET'])
@cross_origin()
def get_city_info(loc):
    if not hasattr(g, 'visitPlan'):
        return jsonify({'error': 'No visitPlan object available'}), 400

    visitPlan = g.visitPlan
    visitPlan.get
    city_info = visitPlan.city_map_to_information[loc]
    # hotel,restaurant,image,summary
    if not city_info:
        return jsonify({'error': 'City not found'}), 404

    # Do something with city_info (e.g., jsonify and return the information)
    return jsonify({'hotel': city_info[0], 'restaurant': city_info[1], 'images': city_info[2], 'summary': city_info[3]})


if __name__ == "__main__":
    app.run()
