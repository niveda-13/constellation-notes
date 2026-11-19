from flask import Flask, render_template

#creating a flask app
app = Flask(__name__)

#to display the homepage
@app.route("/")
def home():
    return render_template("index.html")

#starting the server
if __name__ == "__main__":
    app.run(debug=True)