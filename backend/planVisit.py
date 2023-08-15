from recommendLocation import FindLocation
import requests
import pandas as pd


class PlanVisit:

    def __init__(self, user_city):
        # lists of hotels, restaurants, and images of sight seeing
        self.city_map_to_information = {}
        self.locator = FindLocation(user_city)
        self.locator.readFile()
        self.locations = self.locator.getCities()
        self.API_KEY = 'YOUR_API_KEY'

        for loc in self.locations:
            self.city_map_to_information[loc] = [
                [], [], [], []]  # hotel,restaurant,image,summary

    def find_place(self, location, type, radius=10000):
        # find place based on type
        url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
        params = {
            'key': self.API_KEY,
            'location': location,
            'radius': radius,
            'type': type,
            'fields': 'website,name,place_id,photos'
        }
        print(type)
        response = requests.get(url, params=params)
        data = response.json()
        return data  # return json data

    def get_name_and_id(self, choices):
        places = []
        good_websites = 0 #break after 3 good websites
        for attraction in choices:
            place_name = attraction['name']
            place_id = attraction['place_id']
            photos = attraction.get('photos', [])
            photo_reference = None
            if photos:
                photo_reference = photos[0]['photo_reference']
            photo_url = self.find_pictures_of_landmarks(photo_reference)
            website_details = self.get_website_links(place_id)
            website_link = website_details.get('website', None)
            if website_link:
                good_websites += 1
            else:
                continue
            places.append(
                {'name': place_name, 'place_id': place_id, 'url': website_link, 'photos':photo_url})
            if good_websites == 3:
                return places
        return places

    def get_website_links(self, place_id):
        url = 'https://maps.googleapis.com/maps/api/place/details/json'
        params = {
            'key': self.API_KEY,
            'place_id': place_id,
            'fields': 'website'
        }

        response = requests.get(url, params=params)
        data = response.json()
        if 'result' in data:
            return data['result']

    def find_nearby_hotels(self, location):
        data = self.find_place(location, 'lodging')
        if 'results' in data:
            hotels = data['results']
            return hotels
        else:
            print(
                f"Error: Unable to fetch hotels. {data.get('error_message', '')}")
            return []

    def retrieve_hotels(self):
        for loc in self.locations:
            lat, long = self.locator.find_long_lat(loc)
            coord = f"{lat}, {long}"
            hotels = self.find_nearby_hotels(coord)
            hotels_with_links = self.get_name_and_id(hotels)

            valid_hotels = []
            for hotel in hotels_with_links:
                if hotel['url']:
                    valid_hotels.append(hotel)
                    if len(valid_hotels) == 3:  # stop after 3 with link are found
                        break

            # Add the valid hotels with links for this location
            self.city_map_to_information[loc][0].append(valid_hotels)

    def find_landmarks(self, location):
        data = self.find_place(location, 'tourist-attraction')
        landmarks = []
        if 'results' in data:
            for place in data['results']:
                landmark = place['name']
                landmark_id = place['place_id']
                photos = place.get('photos', [])
                photo_reference = None
                if photos:
                    photo_reference = photos[0]['photo_reference']
                landmarks.append(
                    {'name': landmark, 'place_id': landmark_id, 'photo_reference': photo_reference})
        return landmarks[:3]  # top three landmarks and their photos

    def find_pictures_of_landmarks(self, photo_reference):
        url = 'https://maps.googleapis.com/maps/api/place/photo'  # find link for photo
        params = {
            'key': self.API_KEY,
            'photoreference': photo_reference,
            'maxwidth': 500,
        }

        response = requests.get(url, params=params)

        if response.status_code == 200:
            return response.url  # photo link
        else:
            print(
                f"Error: Unable to fetch photo. Status code: {response.status_code}")
            return None

    def retrieve_pictures_of_landmarks(self):
        images = {}
        for loc in self.locations:
            lat, long = self.locator.find_long_lat(loc)  # coordinates of the city
            coord = f"{lat}, {long}"
            landmarks = self.find_landmarks(coord)
            images[loc] = []
            for i, place_data in enumerate(landmarks):
                place_name = place_data['name']
                photo_reference = place_data['photo_reference']
                image_url = self.find_pictures_of_landmarks(photo_reference)
                if image_url:
                    images[loc].append(image_url)
                if i == 2:
                    break
            self.city_map_to_information[loc][2].append(
                images)  # add image links to map structure

    def find_restaurants(self, location):
        data = self.find_place(location, 'restaurant')
        if 'results' in data:
            restaurants = data['results']
            filtered_restaurants = [
                restaurant for restaurant in restaurants if 'lodging' not in restaurant.get('types', [])]

            return filtered_restaurants
        else:
            print(
                f"Error: Unable to fetch restaurants. {data.get('error_message', '')}")
            return []

    def retrieve_restaurants(self):
        for loc in self.locations:
            lat, long = self.locator.find_long_lat(loc)
            coord = f"{lat}, {long}"
            restaurants = self.find_restaurants(coord)
            restaurants_with_links = self.get_name_and_id(restaurants)

            valid_restaurants = []
            for restaurant in restaurants_with_links:
                if restaurant['url']:
                    valid_restaurants.append(restaurant)
                    if len(valid_restaurants) == 3:  # stop after 3 with links are found
                        break

            # Add the valid restaurants with links for this location
            self.city_map_to_information[loc][1].append(valid_restaurants)

    def fetch_city_summary(self, location):
        url = "https://en.wikipedia.org/w/api.php"
        params = {
            'format': 'json',
            'action': 'query',
            'prop': 'extracts',
            'exintro': True,
            'explaintext': True,
            'titles': location
        }
        response = requests.get(url, params=params)
        data = response.json()

        pages = data['query']['pages']
        if pages:
            page_id = next(iter(pages))
            city_summary = pages[page_id]['extract']
            return city_summary
        else:
            return None

    def get_city_summary(self):

        for loc in self.locations:
            city, country = loc.split(',')
            summary = self.fetch_city_summary(city)
            self.city_map_to_information[loc][3] = summary


'''

visitPlanner.retrieve_restaurants()
'''
