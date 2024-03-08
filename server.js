const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());

// Define a custom CORS middleware to disable CORS for a specific origin
const customCorsOptions = {
    origin: function (origin, callback) {
        // Check if the origin matches the one you want to disable CORS for
        if (origin === 'http://35.154.221.174:3000') {
            callback(null, false); // Disable CORS for this origin
        } else {
            callback(null, true); // Allow CORS for other origins
        }
    }
};

// Apply the custom CORS middleware
app.use(cors(customCorsOptions));

const db = mysql.createConnection({
    host: "database-1.cjagagyuydl1.ap-south-1.rds.amazonaws.com",
    user: "root",
    port: 3306,
    password: "6393775478",
    database: "crud"
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to database:", err);
        return;
    }
    console.log("Connected to database");
    db.query("SELECT * FROM student", (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            return;
        }
        // Output the results
        console.log("All records from student table:", results);
    });
});

app.get("/", (req, res) => {
    const sql = "SELECT ID, name, email, fatherName, motherName, age, homeAddress, registrationDate FROM student";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error querying database:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

app.post('/create', (req, res) => {
    const { name, email, fatherName, motherName, age, homeAddress, registrationDate } = req.body;
    const sql = "INSERT INTO student (name, email, fatherName, motherName, age, homeAddress, registrationDate) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [name, email, fatherName, motherName, age, homeAddress, registrationDate];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error inserting into database:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

app.put('/update/:id', (req, res) => {
    const { name, email, fatherName, motherName, age, homeAddress, registrationDate } = req.body;
    const { id } = req.params;
    const sql = "UPDATE student SET name = ?, email = ?, fatherName = ?, motherName = ?, age = ?, homeAddress = ?, registrationDate = ? WHERE ID = ?";
    const values = [name, email, fatherName, motherName, age, homeAddress, registrationDate, id];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error updating database:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM student WHERE ID = ?";
    db.query(sql, id, (err, data) => {
        if (err) {
            console.error("Error deleting from database:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});