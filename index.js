const express = require('express')

const { MongoClient } = require("mongodb");
const MONGO_URL = "mongoUrl"; // แก้ไข URL ตามการตั้งค่าของคุณ
const DB_NAME = "chat-workshop"; // ชื่อฐานข้อมูล

let db;

// Connect to MongoDB
MongoClient.connect(MONGO_URL, { useUnifiedTopology: true })
    .then((client) => {
        console.log("Connected to MongoDB");
        db = client.db(DB_NAME); // เชื่อมฐานข้อมูลที่ชื่อ 'DB_NAME'
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1); // ปิดโปรแกรมหากเชื่อมต่อไม่สำเร็จ
    });

const app = express()

app.use(express.json());

app.get('/', async (req, res) => {
    const collection = db.collection("messages"); // เลือกคอลเลกชัน 'messages'
    try {
        // const documents = await collection.find({}).skip(0).limit(10).toArray();
        const documents = await collection.find().toArray();
        return res.status(201).json({ message: documents });
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch documents", details: error });
    }
})

app.post('/', async (req, res) => {
    const collection = db.collection("messages"); // เลือกคอลเลกชัน 'user'

    // รับข้อมูลจาก req.body
    const { message } = req.body;
    // ตรวจสอบว่ามีการส่งข้อความเข้ามาหรือไม่
    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }
    let newDoc = { message, created_at: new Date().valueOf() };
    try {
        const result = await collection.insertOne(newDoc);
        return res.status(201).json({ message: "Document inserted", result });
    } catch (error) {
        return res.status(500).json({ error: "Failed to insert document", details: error });
    }
})

app.listen(3000, async () =>{
    console.log("App listening on port 3000")
})