import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const DiceChart = () => {
  const [chartData, setChartData] = useState([]);

  // Gọi API để tải dữ liệu biểu đồ
  const fetchChartData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/dice-roll-distribution/");
      setChartData(response.data.distribution);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Phân phối số lần tung để đạt [6, 6]</h1>
      <BarChart
        width={600}
        height={400}
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="rolls" label={{ value: "Số lần tung", position: "insideBottom", offset: -5 }} />
        <YAxis label={{ value: "Tần suất", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Bar dataKey="frequency" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default DiceChart;
