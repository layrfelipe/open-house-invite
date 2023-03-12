import dotenv from "dotenv"
import express, { json } from 'express';
import mongoose from 'mongoose';
import routes from "./routes.js"
import cors from "cors"

dotenv.config()

// Setting up DB
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection;

// Starting application
const app = express();
app.use(json());
app.use(cors())
app.use('/', routes);

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});