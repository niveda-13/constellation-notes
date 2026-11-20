
// java script -> to let the user interact with the website

console.log("My script.js file is loading!"); // test to check working

// first -> find the sky, cause this is the main user interacting area
// finds this element from html -> <div class="sky" id="sky">
// const -> creates a variable
const sky = document.getElementById("sky");

// gives javascript access to the svg element "connections" to draw lines
const connectionsLayer = document.getElementById("connections");


// gives javascript access to the delete button
const deleteButton = document.getElementById("delete-star");

// gives javascript access to the constellation name and personal message fields
const nameInput = document.getElementById("constellation-name");
const messageInput = document.getElementById("personal-message");


// following 3 variables added to help in connecting stars
// stars -> stores the coordinates of all stars
// connections -> stores which stars are connected
// selectedStar -> stores the index of the currently selected star

let stars = [];
let connections = [];
let selectedStar = null;


// detecting / listening for clicks on the sky
// function(event) -> describes what should happen in case of a click
sky.addEventListener("click", function(event) {

    // getting position and dimensions of the sky
    const bounds = sky.getBoundingClientRect();

    // getting position of click
    // bounds.left/top -> relative to the left/top of the sky
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    // creating a star object containing its coordinates
    const starData = {
        x: x,
        y: y
    };

    // giving each star a unique index based on its position in the array
    const starIndex = stars.length;

    // adding the star's information to our stars array
    stars.push(starData);

    // creating a html tag span for a star so CSS can influence it
    const star = document.createElement("span");

    // assign css class and symbol for star
    star.className = "star";
    star.textContent = "✦";

    // storing the star's index on its html element
    star.dataset.index = starIndex;

    // positioning star based on click coordinates
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;


    // listen for clicks on this individual star
    // clicking again on a star will select it for connection
    star.addEventListener("click", function(event) {

        // stop this click from creating another star
        event.stopPropagation();

        // if no star is selected, this should be selected
        if (selectedStar === null) {
            selectedStar = starIndex;
            star.classList.add("selected");
        }

        // if this star is already selected, it should be deselected
        else if (selectedStar === starIndex) {
            selectedStar = null;
            star.classList.remove("selected");
        }

        // otherwise, connect the previously selected star to this one
        else {
            const firstStar = stars[selectedStar];
            const secondStar = stars[starIndex];

            // create an svg line
            const line = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "line"
            );

            // line's starting and ending coordinates
            line.setAttribute("x1", firstStar.x);
            line.setAttribute("y1", firstStar.y);
            line.setAttribute("x2", secondStar.x);
            line.setAttribute("y2", secondStar.y);

            line.classList.add("connection-line");

            // line added to the svg layer
            connectionsLayer.appendChild(line);

            // connection is stored as a pair of star indices
            connections.push([selectedStar, starIndex]);

            // highlight removed from first star
            const previousStar = sky.querySelector(
                `.star[data-index="${selectedStar}"]`
            );
            previousStar.classList.remove("selected");

            // selection cleared
            selectedStar = null;
        }

    });


    // adding star to the sky
    // appendChild -> adds the star to the page without reloading it
    sky.appendChild(star);

    // hiding the sky-instruction after click
    const instruction = sky.querySelector(".sky-instruction");

    // querySelector() finds an element matching a css selector
    if (instruction) {
        instruction.style.display = "none";}

});

// listening for clicks on the delete button
deleteButton.addEventListener("click", function() {

    // checking if a star is currently selected
    if (selectedStar === null) {
        return;}

    // removing the selected star from the stars array
    stars.splice(selectedStar, 1);

    // removing connections involving the selected star
    connections = connections
        .filter(connection =>
            connection[0] !== selectedStar &&
            connection[1] !== selectedStar
        );

    // removing the selected star visually
    const starToRemove = sky.querySelector(
        `.star[data-index="${selectedStar}"]`
    );
    starToRemove.remove();

    // updating the indices of the remaining stars
    const remainingStars = sky.querySelectorAll(".star");

    remainingStars.forEach(function(star, index) {
        star.dataset.index = index;
    });

    // updating the indices of the remaining connections
    connections = connections.map(connection => [
        connection[0] > selectedStar ? connection[0] - 1 : connection[0],
        connection[1] > selectedStar ? connection[1] - 1 : connection[1]
    ]);

    // clearing the existing lines
    connectionsLayer.innerHTML = "";

    // redrawing the remaining connections
    connections.forEach(function(connection) {
        const firstStar = stars[connection[0]];
        const secondStar = stars[connection[1]];

        const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );

        line.setAttribute("x1", firstStar.x);
        line.setAttribute("y1", firstStar.y);
        line.setAttribute("x2", secondStar.x);
        line.setAttribute("y2", secondStar.y);

        line.classList.add("connection-line");
        connectionsLayer.appendChild(line);
    });

    // clearing the selection
    selectedStar = null;

});


