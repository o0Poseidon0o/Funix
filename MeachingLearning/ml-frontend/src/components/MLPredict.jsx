import React, { useState } from "react";
import axios from "axios";

function MLPredict() {
    const [feature1, setFeature1] = useState("");
    const [feature2, setFeature2] = useState("");
    const [result, setResult] = useState(null);

    const handlePredict = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/predict/", {
                feature1: parseFloat(feature1),
                feature2: parseFloat(feature2),
            });
            setResult(response.data.prediction);
        } catch (error) {
            console.error("Error calling prediction API", error);
        }
    };

    return (
        <div>
            <h1>ML Prediction</h1>
            <form onSubmit={handlePredict}>
                <input
                    type="number"
                    placeholder="Feature 1"
                    value={feature1}
                    onChange={(e) => setFeature1(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Feature 2"
                    value={feature2}
                    onChange={(e) => setFeature2(e.target.value)}
                />
                <button type="submit">Predict</button>
            </form>
            {result !== null && <p>Prediction: {result}</p>}
        </div>
    );
}

export default MLPredict;
