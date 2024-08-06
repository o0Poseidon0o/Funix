***Cài đặt Node JS**
mkdir myapp
cd myapp
npm init -y
**Cài đặt express**
npm install express pg cors
**Tạo server NodeJS**
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Configure PostgreSQL connection
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

// API endpoint to get data
app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM your_table');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
**Tạo ReacJS project**
npx create-react-app my-react-app
cd my-react-app
**Cài đặt axios**
npm install axios
**Lấy API**
import React, { useState, useEffect } from 'react'; useState là một hook của React cho phép bạn thêm state vào các functional component.
                                                    useEffect là một hook của React cho phép bạn thực hiện các side-effect trong các functional 
import axios from 'axios'; axios là một thư viện dùng để thực hiện các yêu cầu HTTP (GET, POST, etc.).

const App = () => {
  const [data, setData] = useState([]); useState([]) khởi tạo state data với giá trị ban đầu là một mảng rỗng. data chứa dữ liệu nhận được từ API và setData là                                                 hàm dùng để cập nhật state này.

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data from PostgreSQL</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
**Chạy ứng dụng**
node server.js
npm start
