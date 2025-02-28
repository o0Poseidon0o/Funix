
import React, { useState } from "react";
import axios from "axios";

function DiceSimulation() {
    const [trials, setTrials] = useState(1000);
    const [biasWeight, setBiasWeight] = useState(1);
    const [result, setResult] = useState(null);

    const handleSimulateFairDice = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/simulate-dice/", {
                trials,
            });
            setResult(response.data);
        } catch (error) {
            console.error("Error simulating fair dice:", error);
        }
    };

    const handleSimulateBiasedDice = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/simulate-biased-dice/", {
                trials,
                bias_weight: biasWeight,
            });
            setResult(response.data);
        } catch (error) {
            console.error("Error simulating biased dice:", error);
        }
    };

    return (
        <div>
            <h1>Mô phỏng tung xúc xắc</h1>
            <label>
                Số lần mô phỏng:
                <input
                    type="number"
                    value={trials}
                    onChange={(e) => setTrials(e.target.value)}
                />
            </label>
            <label>
                Trọng số mặt 6 (cho xúc xắc không công bằng):
                <input
                    type="number"
                    value={biasWeight}
                    onChange={(e) => setBiasWeight(e.target.value)}
                />
            </label>
            <button onClick={handleSimulateFairDice}>Mô phỏng xúc xắc công bằng</button>
            <button onClick={handleSimulateBiasedDice}>Mô phỏng xúc xắc không công bằng</button>

            {result && (
                <div>
                    <h2>Kết quả:</h2>
                    <p>Số lần mô phỏng: {result.trials}</p>
                    <p>Số lần xuất hiện [6, 6]: {result.count_66}</p>
                    <p>Xác suất: {result.probability.toFixed(4)}</p>
                </div>
            )}
        </div>
    );
}

export default DiceSimulation;
