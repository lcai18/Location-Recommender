from recommendLocation import findLocation

class planVisit:

    def __init__(self):
        self.city_map_to_information = {} #lists of hotels, restaurants, and images of sight seeing
        locator = findLocation()
        locator.readFile()
        self.locations = locator.getCities()
        for loc in self.locations:
            self.city_map_to_information[loc] = [[],[],[]]



    def lookup(self):
