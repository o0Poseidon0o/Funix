
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

function DiceChart2({ data }) {
    const chartData = [
        { name: "Công bằng", value: data.fairDiceProbability },
        { name: "Không công bằng", value: data.biasedDiceProbability },
    ];

    return (
        <BarChart width={600} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
    );
}

export default DiceChart2;
