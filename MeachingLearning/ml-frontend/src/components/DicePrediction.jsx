// src/components/DicePrediction.js
import React, { useState } from "react";
import axios from "axios";

const DicePrediction = () => {
  const [targetSum, setTargetSum] = useState(7);
  const [predictedRoll, setPredictedRoll] = useState(null);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/predict_dice_roll/", {
        target_sum: targetSum,
      });
      setPredictedRoll(response.data.predicted_roll);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Có lỗi xảy ra!");
      setPredictedRoll(null);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Dự đoán lần xuất hiện của tổng xúc xắc</h2>
      <label className="block mb-2">
        Tổng mục tiêu:
        <input
          type="number"
          value={targetSum}
          onChange={(e) => setTargetSum(Number(e.target.value))}
          className="border rounded px-2 py-1 w-full"
        />
      </label>
      <button
        onClick={handlePredict}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Dự đoán
      </button>

      {predictedRoll && (
        <p className="mt-4 text-green-500">
          Kết quả dự đoán: Lần thứ <strong>{predictedRoll}</strong>.
        </p>
      )}

      {error && (
        <p className="mt-4 text-red-500">
          Lỗi: <strong>{error}</strong>
        </p>
      )}
    </div>
  );
};

export default DicePrediction;
