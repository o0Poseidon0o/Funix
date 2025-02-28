import React, { useEffect, useState } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Line } from "recharts";

const RegressionChart = () => {
  const [data, setData] = useState([]);
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    // Gọi API lấy dữ liệu
    fetch("http://localhost:8000/api/get_regression_data/")
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          console.error(result.error);
        } else {
          const { data, predictions } = result;

          // Chuẩn bị dữ liệu cho ScatterChart (Điểm thực)
          const scatterData = data.area.map((area, index) => ({
            area,
            price: data.price[index], // Giá thực tế
          }));

          // Chuẩn bị dữ liệu cho LineChart (Đường hồi quy)
          const linePoints = data.area.map((area, index) => ({
            area,
            price: predictions[index], // Giá dự đoán
          }));

          setData(scatterData);
          setLineData(linePoints);
        }
      })
      .catch((err) => console.error(err));
  }, []);
  console.log(lineData);
  return (
    <div>
      <h2>Biểu đồ hồi quy tuyến tính (Diện tích vs Giá nhà)</h2>
      <ScatterChart
        width={600}
        height={400}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid />
        <XAxis dataKey="area" name="Diện tích" unit="m²" />
        <YAxis dataKey="price" name="Giá nhà" unit="tỷ VNĐ" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="Điểm thực" data={data} fill="#8884d8" />
        <Line
          type="monotone"
          data={lineData}
          dataKey="price"
          stroke="#82ca9d"
          dot={false}
        />
      </ScatterChart>
    </div>
  );
};

export default RegressionChart;
