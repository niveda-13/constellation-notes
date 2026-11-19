// java script -> to let the user interact with the website

console.log("My script.js file is loading!"); //test to check working

// first -> find the sky, cause this is the main user interacting area
// finds this element from html -> <div class="sky" id="sky">
// const -> creates a variable
const sky = document.getElementById("sky")

// detecting/ listening for clicks
//function(event) -> describes what should happen in case of a click
sky.addEventListener("click",function(event) {

    //getting position and dimensions of the sky
    const bounds = sky.getBoundingClientRect();

    //getting position of click 
    // bounds.left/top -> relative to the left/top of the sky
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    //creating a html tag span for a star so CSS can influence it
    const star = document.createElement("span");

    //assign css class and symbol for star
    star.className = "star";
    star.textContent = "✦";

    //positioning star based on click coordinates
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    //adding star to the sky
    // appendChild -> allows modification without reloading the entire page??
    sky.appendChild(star);

    //hiding the sky-instruction after click
    const instruction = sky.querySelector(".sky-instruction");

    //querySelector() finds an element matching a CSS selector,which is "sky-instruction"
    if (instruction) {
        instruction.style.display = "none";
    }

});


//