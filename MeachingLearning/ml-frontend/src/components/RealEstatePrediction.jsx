import React, { useState } from "react";

const RealEstatePrediction = () => {
    const [area, setArea] = useState("");
    const [rooms, setRooms] = useState("");
    const [price, setPrice] = useState(null);

    const handlePredict = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/predict_price/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ area: Number(area), rooms: Number(rooms) }),
            });

            const data = await response.json();
            if (response.ok) {
                setPrice(data.predicted_price);
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container">
            <h1>Dự đoán giá bất động sản</h1>
            <div>
                <label>Diện tích (m²):</label>
                <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                />
            </div>
            <div>
                <label>Số lượng phòng:</label>
                <input
                    type="number"
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                />
            </div>
            <button onClick={handlePredict}>Dự đoán</button>
            {price !== null && (
                <p>Giá dự đoán: {price} tỷ VNĐ</p>
            )}
        </div>
    );
};

export default RealEstatePrediction;
