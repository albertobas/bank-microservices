import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from joblib import load
import os


APP_PORT = os.environ['LOANS_MODEL_PORT']
CLIENT_PORT = os.environ['CLIENT_PORT']

model = load('pipeline.joblib')
app = Flask(__name__)
cors = CORS(app, resources={
            r"/predict": {"origins": f"http://localhost:{CLIENT_PORT}"}})


@app.route('/predict', methods=['POST'])
def predict():
    new_obsevation = request.get_json(force=True)
    new_observation_frame = pd.DataFrame([new_obsevation.values()], columns=['credit.policy', 'purpose', 'int.rate', 'installment', 'log.annual.inc',
                                                                             'dti', 'fico', 'days.with.cr.line', 'revol.bal', 'revol.util', 'inq.last.6mths', 'delinq.2yrs', 'pub.rec'])
    prediction = model.predict(new_observation_frame)
    output = prediction[0]
    response = jsonify(str(output))
    return response


if __name__ == '__main__':
    app.run(port=APP_PORT, debug=True)
