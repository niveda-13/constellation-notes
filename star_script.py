
#first we create an empty "constellation" - basically, just assign a new "constellation" a name
def create_empty_constellation(name):
    empty_constellation = {"name":name, "stars":[],"connections":[]}
    
    return empty_constellation


#this is to create an individual star -> a dictionary of x, y coordinates
def create_star(x,y): 
    star = {"x":x, "y":y}

    #checking if coordinates are numbers and within 0-100
    if not isinstance(x, (int, float)) or not isinstance(y, (int, float)):
        raise TypeError("Star coordinates must be numbers.")

    if not (0 <= x <= 100) or not (0 <= y <= 100):
        raise ValueError("Star coordinates must be between 0 and 100.")

    return star

#adding a star (dict) to the constellation (list)
def add_star_to_constellation(constellation,star):
    constellation["stars"].append(star)
    
    return constellation

#connecting two stars in a constellation
def connect_stars(constellation, star1_index, star2_index):
    #get the list of star dicts from the constellation info
    stars = constellation["stars"]

    #Checking that both indices are integers
    if not isinstance(star1_index, int) or not isinstance(star2_index, int):
        raise TypeError("Star indices must be integers.")

    #Checking that both indices exist
    if not (0 <= star1_index < len(stars)):
        raise IndexError("First star does not exist.")

    #checking if star index is within len(stars)
    if star1_index >= len(stars) or star2_index >= len(stars):
        raise IndexError("Star does not exist.")
    
    #checking if they are the same star
    if star1_index == star2_index:
        raise ValueError("A star cannot connect to itself.")
    
    
    # Sort the indices so [0, 1] and [1, 0] are treated equally
    connection = sorted([star1_index, star2_index])

    #checking whether this connection already exists in the connections list
    if connection not in constellation["connections"]:

        #adding it to the connections list
        constellation["connections"].append(connection)

    return constellation


#removing a star, and the connections containing that star
def remove_star(constellation, star_index):
    stars = constellation["stars"]

    #validating the index
    if not isinstance(star_index, int):
        raise TypeError("Star index must be an integer.")

    if not (0 <= star_index < len(stars)):
        raise IndexError("Star does not exist.")

    #Removing the star at the specified index
    stars.pop(star_index)

    #Creating a new, empty LIST for the remaining connections
    updated_connections = []

    #Go through every connection LIST
    for connection in constellation["connections"]:

        #Ignore connections involving the removed star
        if star_index in connection:
            continue

        # Create a new LIST for the updated connection
        updated_connection = []

        # Update the indices of the remaining stars
        for index in connection:

            if index > star_index:
                updated_connection.append(index - 1)

            else:
                updated_connection.append(index)

        # Add the updated connection to the new LIST
        updated_connections.append(updated_connection)

    # Replace the old connections LIST
    constellation["connections"] = updated_connections

    return constellation

     



