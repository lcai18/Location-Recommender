from recommendLocation import FindLocation
import requests
import pandas as pd
#places api key : AIzaSyCqmD2GRqA09VQKkomO7ddUF0OhJxWi5sMx
class PlanVisit:

    def __init__(self):
        self.city_map_to_information = {} #lists of hotels, restaurants, and images of sight seeing
        self.locator = FindLocation()
        self.locator.readFile()
        self.locations = self.locator.getCities()
        self.df = pd.read_csv('clustering_data.csv')

        for loc in self.locations:
            self.city_map_to_information[loc] = [[],[],[]]

    def find_nearby_hotels(self, API_KEY, location, radius=1000):
        url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
        params = {
            'key': API_KEY,
            'location': location,
            'radius': radius,
            'type': 'lodging'
        }
        response = requests.get(url, params=params)
        data = response.json()
        if 'results' in data:
            hotels = data['results']
            return hotels[:3]
        else:
            print(f"Error: Unable to fetch hotels. {data.get('error_message', '')}")
            return []

    def retrieve_hotels(self):
        API_KEY = 'AIzaSyCqmD2GRqA09VQKkomO7ddUF0OhJxWi5sM'
        for loc in self.locations:
            lat, long = self.locator.findCoord(loc)
            coord = f"{lat}, {long}"
            print(coord, loc)
            hotels = self.find_nearby_hotels(API_KEY, coord)
            print(hotels)
            self.city_map_to_information[loc][0].append(hotels)
visitPlanner = PlanVisit()

visitPlanner.retrieve_hotels()
