# my sirius

★ a little constellation creator ★

## about the project

I wanted to build something cute while also familiarising myself with JavaScript and HTML. And since stars are pretty cute, I decided to make 'my sirius'.

Users can create stars by clicking on a 'night sky' and connect them to form their own constellations. They can name it, and store it as a keepsake or share it with someone special, along with a message. 

## features

- Click anywhere on the sky to create a star.
- Click on a star to highlight it, then click another star to connect the two.
- Select and delete individual stars.
- Select and delete connections.
- Give your constellation a name.
- Add a note.
- Download your finished constellation as a standalone HTML file that can be opened and shared without running the original application.

## built using

## Built with

- **HTML and CSS** – used to build and style the website.
- **JavaScript** – handles the star creation, selection, connections, deletion and downloading of the finished constellation.
- **SVG** – used to draw the lines connecting the stars.
- **Python and Flask** – used to run and serve the website.
- **Git and GitHub** – used for version control and tracking project development.

## project structure

```text
my-sirius/
│
├── app.py
├── requirements.txt
├── templates/
│   └── index.html
│
└── static/
    ├── style.css
    └── java_script.js
```

## to run the project locally

1. Clone the repository:

   ```bash
   git clone https://github.com/niveda-13/my-sirius.git
   ```

2. Navigate into the project folder:

   ```bash
   cd my-sirius
   ```

3. Install the required packages:

   ```bash
   pip install -r requirements.txt
   ```

4. Start the Flask application:

   ```bash
   python app.py
   ```

5. Open `http://127.0.0.1:5000` in your browser.

## what I learned

- Understanding how HTML, CSS and JavaScript work together to build an interactive website, and how changes in one affect the others.
- Using JavaScript event listeners to handle user interactions.
- Working with arrays and objects to store and manage dynamic data.
- Using SVG to create and manipulate graphical elements.
- Generating downloadable, standalone HTML files using JavaScript.
- A lot of troubleshooting ;)

I still have a lot to learn, but this project helped me understand how the different parts of a website come together and gave me the motivation to create more.

