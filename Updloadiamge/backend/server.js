const express = require("express");
const multer = require("multer");
const path = require("path");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 5000;

// Kết nối PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Cấu hình multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// API upload hình ảnh
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { filename } = req.file;
    const filepath = `/uploads/${filename}`;
    console.log(req.file)
    console.log(filepath)

    await pool.query("INSERT INTO tb_person (id_person, avatar) VALUES ($1, $2)", [
      1,
      filepath,
    ]);

    res.status(200).json({ message: "Upload successful", filepath });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API lấy danh sách hình ảnh
app.get("/images", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM images ORDER BY upload_date DESC");
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/images/:id", async (req, res) => {
    try {
      const { id } = req.params

      const result = await pool.query("SELECT * FROM tb_person WHERE id_person = $1", [id]);
      const [row] = result.rows
      const avatarPath = path.join(__dirname, row.avatar)
      console.log(avatarPath)
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
