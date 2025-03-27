import express from 'express';
import connection from './database/Db.js';
import dotenv from "dotenv";
import cors from 'cors';
import router from './routes/route.js';

dotenv.config();

const app = express();
const PORT = 8000;

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  credentials: true // If using cookies or authentication
}));

// Parse JSON data
app.use(express.json());

// API Routes
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

// Database Connection
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
connection(USERNAME, PASSWORD);
