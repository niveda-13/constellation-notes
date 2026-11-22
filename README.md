# my sirius

✧ a little constellation creator ✧

## website:[my sirius](https://my-sirius.onrender.com/)

*Note: The website "https://my-sirius.onrender.com/" is hosted on Render's free tier, so it may take a few seconds (sometimes up to a minute) to load if it has been inactive.*

**source code:** [github repo](https://github.com/niveda-13/my-sirius)

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

- **HTML and CSS** – used to build and style the website.
- **JavaScript** – handles the star creation, selection, connections, deletion and downloading of the finished constellation.
- **SVG** – used to draw the lines connecting the stars.
- **Python and Flask** – used to run and serve the website.
- **Git and GitHub** – used for version control and tracking project development.
- **Render** – used to deploy and host the website.

## project structure

```text
my-sirius/
│
├── app.py
├── requirements.txt
├── README.md
├── .gitignore
│
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
- Using JavaScript event listeners and DOM manipulation to handle user interactions.
- Working with arrays and objects to store and manage dynamic data, including keeping track of connections when stars are deleted.
- Using SVG to create and manipulate graphical elements.
- Generating downloadable, standalone HTML files and deploying a Flask application using Render.


