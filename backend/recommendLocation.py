import pandas as pd
from sklearn.cluster import KMeans
from geopy.geocoders import Nominatim


class FindLocation:

    def __init__(self, user_city):
        self.citiesList = []
        self.user_city = user_city

    def readFile(self):
        df = pd.read_csv('../../clustering_data.csv')
        user_city = self.readInput()
        if not self.checkCity(user_city, df):
            added_cluster = self.addCity(user_city)
            cities = df.loc[df['location_clusters']
                            == added_cluster, 'Locations']
            self.setCities(cities, user_city)
        else:
            cluster = df.loc[df['Locations'] == user_city, 'location_clusters']
            cluster = cluster.iloc[0]
            cities = df.loc[df['location_clusters'] == cluster, 'Locations']
            self.setCities(cities, user_city)

    def addCity(self, user_city):
        df_coord = pd.read_csv('../../lat_long_for_train.csv')
        l2 = df_coord.iloc[:, -1: -3: -1]
        lat, long = self.findCoord(user_city)
        kmeans = KMeans(n_clusters=400, random_state=20)
        kmeans.fit(l2)
        new_data = pd.DataFrame({'Longitude': [long], 'Latitude': [lat]})
        print(new_data)
        new_cluster = kmeans.predict(new_data)
        return new_cluster[0]

    def findCoord(self, user_city):
        latitude = 0
        longitude = 0
        locatePlace = Nominatim(user_agent="location-finder")
        addedLocation = locatePlace.geocode(user_city)
        if addedLocation is not None:
            latitude = addedLocation.latitude
            longitude = addedLocation.longitude
        else:
            latitude = None
            longitude = None
        return latitude, longitude

    def find_long_lat(self, loc):
        # Load the CSV data into a DataFrame

        city, country = loc.split(', ')
        loc = f"{country},{city}"
        df = pd.read_csv("clustering_data.csv")
        # Search for the row that matches the given "city, country" string
        row = df[df["Locations"] == loc]

        if len(row) == 0:
            # Return None if the city is not found in the CSV
            return None
        else:
            # Retrieve the latitude and longitude from the matched row
            latitude = row["Latitude"].values[0]
            longitude = row["Longitude"].values[0]
            return latitude, longitude


    def setCities(self, cities, user_city):

        for c in range(len(cities)):
            if c == 6:
                break
            if cities.iloc[c] == user_city:
                continue
            else:
                country, city = cities.iloc[c].split(',')
                rec_city = f"{city}, {country}"
                self.citiesList.append(rec_city)

    def checkCity(self, user_city, df):
        return user_city in df['Locations'].values

    def getCities(self):
        return self.citiesList

    def readInput(self):
        city, country = self.user_city.split(', ')
        user_city = f"{country},{city}"

        return user_city
