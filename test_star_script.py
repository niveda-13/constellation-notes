
from star_script import (
    create_empty_constellation,
    create_star,
    add_star_to_constellation,
    connect_stars,
    remove_star
)


#Create a constellation
my_sky = create_empty_constellation("Test constellation")


# Create and add four stars
star1 = create_star(20, 30)
star2 = create_star(45, 60)
star3 = create_star(70, 25)
star4 = create_star(85, 75)

add_star_to_constellation(my_sky, star1)
add_star_to_constellation(my_sky, star2)
add_star_to_constellation(my_sky, star3)
add_star_to_constellation(my_sky, star4)


# Connect the stars
connect_stars(my_sky, 0, 1)
connect_stars(my_sky, 1, 2)
connect_stars(my_sky, 2, 3)
connect_stars(my_sky, 0, 2)


# Print the constellation
print("BEFORE REMOVAL")
print(my_sky)


# Remove the second star (index 1)
remove_star(my_sky, 1)


# Print the updated constellation
print("\nAFTER REMOVAL")
print(my_sky)
