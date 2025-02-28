import React,{ useState } from "react";
import MLPredict from "./components/MLPredict";
import RealEstatePrediction from "./components/RealEstatePrediction";
import RegressionChart from "./components/RegressionChart";

import DiceChart from "./components/DiceChart";
import DiceSimulation from "./components/DiceSimulation";
import DiceChart2 from "./components/DiceChart2";



function App() {
    const [chartData, setChartData] = useState(null);
  const handleResult = (fairResult, biasedResult) => {
    setChartData({
      fairDiceProbability: fairResult.probability,
      biasedDiceProbability: biasedResult.probability,
    });
  };
  return (
    <div className="App">
      <MLPredict />
      <RealEstatePrediction />
      <RegressionChart />
    
      <DiceChart />
      <div>
        <DiceSimulation onSimulate={handleResult} />
        {chartData && <DiceChart2 data={chartData} />}
      </div>
    </div>
  );
}

export default App;
