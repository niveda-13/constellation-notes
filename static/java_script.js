
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

// gives javascript access to the download button
const downloadButton = document.getElementById("download-constellation");


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

// listening for clicks on the download button
downloadButton.addEventListener("click", function() {

    // collecting all the information entered by the user
    const constellationData = {
        name: nameInput.value.trim(),
        message: messageInput.value.trim(),
        stars: stars,
        connections: connections,
        width: sky.clientWidth,
        height: sky.clientHeight
    };

    // checking what data we have collected
    console.log(JSON.stringify(constellationData, null, 2));

    // generating the keepsake html
    const keepsakeHTML = generateKeepsakeHTML(constellationData);

    // checking the generated html
    console.log(keepsakeHTML);

    // converting the html string into a downloadable file
    const file = new Blob([keepsakeHTML], {
        type: "text/html"
    });

    // creating a temporary url for the file
    const fileURL = URL.createObjectURL(file);

    // creating a temporary download link
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = `${constellationData.name || "my-constellation"}.html`;

    // triggering the download
    link.click();

    // releasing the temporary url
    URL.revokeObjectURL(fileURL);

});

// converting special html characters into safe text
function escapeHTML(text) {
    return String(text).replace(/[&<>"']/g, function(character) {
        const replacements = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return replacements[character];
    });
}

// function to generate the standalone constellation webpage
function generateKeepsakeHTML(data) {

    // making the user's text safe to display in html
    const safeName = escapeHTML(data.name);
    const safeMessage = escapeHTML(data.message);

    // creating the basic html document
    const html = `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>${data.name}</title>

        <style>
            body {
                background: #080d20;
                color: #FAF8F5;
                font-family: Georgia, serif;
                text-align: center;
                padding: 30px;
            }

            .keepsake {
                max-width: 1000px;
                margin: 0 auto;
            }

            .sky {
                position: relative;
                width: 100%;
                aspect-ratio: ${data.width} / ${data.height};                   
                margin-top: 40px;
                border: 1px solid #5c5039;
                border-radius: 12px;
                background: radial-gradient(circle, #17213b, #080d20);
            }

            #connections {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
            }

            .star {
                position: absolute;
                transform: translate(-50%, -50%);
                color: #D6B56D;
                font-size: 24px;
                text-shadow: 0 0 10px #D6B56D;
            }

            .connection-line {
                stroke: #D6B56D;
                stroke-width: 1.5;
                opacity: 0.8;
            }

            .message {
                margin-top: 35px;
                line-height: 1.8;
                white-space: pre-wrap;
            }
        </style>

    </head>

    <body>

        <main class="keepsake">
            <h1>${data.name}</h1>

            <div class="sky">
                <svg id="connections"></svg>
            </div>

            <script>
                // retrieving the svg layer for drawing connections
                const connectionsLayer = document.getElementById("connections");

                // storing the star coordinates from the original constellation
                const stars = ${JSON.stringify(data.stars).replace(/</g, "\\u003c")};

                // storing the connections between stars
                const connections = ${JSON.stringify(data.connections).replace(/</g, "\\u003c")};

                // setting the original sky dimensions as the svg coordinate system
                connectionsLayer.setAttribute(
                    "viewBox",
                    "0 0 ${data.width} ${data.height}"
                );

                // creating a visual star for every set of coordinates
                stars.forEach(function(starData) {

                    const star = document.createElement("span");

                    // assigning the star's appearance
                    star.className = "star";
                    star.textContent = "✦";

                    // converting original coordinates into percentages
                    const xPercent = (starData.x / ${data.width}) * 100;
                    const yPercent = (starData.y / ${data.height}) * 100;

                    // positioning the star proportionally
                    star.style.left = xPercent + "%";
                    star.style.top = yPercent + "%";

                    // adding the star to the sky
                    document.querySelector(".sky").appendChild(star);

                });

                // drawing a line between every connected pair of stars
                connections.forEach(function(connection) {

                    // retrieving the coordinates of the two connected stars
                    const firstStar = stars[connection[0]];
                    const secondStar = stars[connection[1]];

                    // creating an svg line
                    const line = document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "line"
                    );

                    // setting the line's starting and ending coordinates
                    line.setAttribute("x1", firstStar.x);
                    line.setAttribute("y1", firstStar.y);
                    line.setAttribute("x2", secondStar.x);
                    line.setAttribute("y2", secondStar.y);

                    // applying the css styling
                    line.classList.add("connection-line");

                    // adding the line to the svg layer
                    connectionsLayer.appendChild(line);

                });

            </script>

            <p class="message">${data.message}</p>
        </main>

    </body>

    </html>
    `;

    // returning the completed html document
    return html;
}

