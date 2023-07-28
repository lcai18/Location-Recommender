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
        self.API_KEY = 'AIzaSyCqmD2GRqA09VQKkomO7ddUF0OhJxWi5sM'

        for loc in self.locations:
            self.city_map_to_information[loc] = [[],[],[]]

    def find_nearby_hotels(self,location, radius=1000):
        url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
        params = {
            'key': self.API_KEY,
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
        for loc in self.locations:
            lat, long = self.locator.findCoord(loc)
            coord = f"{lat}, {long}"
            print(coord, loc)
            hotels = self.find_nearby_hotels(coord)
            self.city_map_to_information[loc][0].append(hotels)
        print(self.city_map_to_information)

    def find_landmarks(self, location, radius=10000):
        url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
        params = {
            'key' : self.API_KEY,
            'location': location,
            'radius' : radius,
            'type': 'tourist-attraction'
        }
        response = requests.get(url, params=params)
        data = response.json()
        landmarks = []
        print(data)
        if 'results' in data:
            for place in data['results']:
                landmark = place['name']
                landmark_id = place['place_id']
                photos = place.get('photos', [])
                photo_reference = None
                if photos:
                    photo_reference = photos[0]['photo_reference']
                landmarks.append({'name': landmark, 'place_id': landmark_id, 'photo_reference': photo_reference})
        return landmarks[:3]

    def find_pictures_of_landmarks(self, photo_reference):
        url = 'https://maps.googleapis.com/maps/api/place/photo'
        params = {
            'key': self.API_KEY,
            'photoreference': photo_reference,
            'maxwidth': 200,
        }

        response = requests.get(url, params=params)

        if response.status_code == 200:
            return response.url
        else:
            print(f"Error: Unable to fetch photo. Status code: {response.status_code}")
            return None
    def retrieve_pictures_of_landmarks(self):
        images = []
        for loc in self.locations:
            lat, long = self.locator.findCoord(loc)
            coord = f"{lat}, {long}"
            landmarks = self.find_landmarks(coord)
            for place_data in landmarks:
                place_name = place_data['name']
                photo_reference = place_data['photo_reference']
                print(photo_reference)
                image_url = self.find_pictures_of_landmarks(photo_reference)
                if image_url:
                    images.append({'name': place_name, 'image_url': image_url})
                break
            self.city_map_to_information[loc][2].append(images)


visitPlanner = PlanVisit()

#visitPlanner.retrieve_hotels()
#visitPlanner.retrieve_pictures_of_landmarks()


