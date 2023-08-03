from flask import Flask, request, jsonify, g
from flask_cors import CORS, cross_origin
from planVisit import PlanVisit

app = Flask(__name__)

CORS(app)

visitPlan = None


@app.route('/')
@cross_origin()
def main():
    return "default home page"


@app.route('/citysearch', methods=['POST'])
@cross_origin()
def citysearch():
    data = request.get_json()
    if 'location' not in data:
        return jsonify({'error': 'No location provided'}), 400

    location = data['location']
    global visitPlan
    visitPlan = PlanVisit(location)
    cities = []
    summaries = []
    visitPlan.get_city_summary()

    visitPlan.retrieve_hotels()
    # visitPlan.retrieve_pictures_of_landmarks()
    # visitPlan.retrieve_restaurants()

    for loc in visitPlan.locations:
        cities.append(loc)
        summaries.append(visitPlan.city_map_to_information[loc][3])
    g.visitPlan = visitPlan

    return jsonify({'cities': cities, 'summaries': summaries})


@app.route('/cityres', methods=['POST'])
@cross_origin()
def get_city_info():
    data = request.get_json()
    loc = data['location']

    global visitPlan

    city_info = visitPlan.city_map_to_information[loc]
    # hotel,restaurant,image,summary
    if not city_info:
        return jsonify({'error': 'City not found'}), 404

    # Do something with city_info (e.g., jsonify and return the information)
    return jsonify({'city': loc, 'summary': city_info[3], 'hotels': city_info[0][0], 'restaurants': city_info[1], 'image_links': city_info[2]})


if __name__ == "__main__":
    app.run()
