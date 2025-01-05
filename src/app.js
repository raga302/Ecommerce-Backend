import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json({ limit: "50mb" }));
app.use(express.static("public"));


export default app;
