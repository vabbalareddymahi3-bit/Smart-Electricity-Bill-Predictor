from flask import Flask, render_template, request
import json

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")


@app.route('/save', methods=['POST'])
def save_bill():
    bill_data = request.form.get("bill")

    with open("history.json", "a") as file:
        file.write(bill_data + "\n")

    return "Bill Saved Successfully!"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)