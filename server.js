const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: '',
        database: 'employees'
    },
    console.log('Connected to the employees database.')
);

// db.query(`SELECT * FROM departments`, (err, rows) => {
//     console.log(rows);
// });


// GET a single department
db.query(`SELECT * FROM departments WHERE id = 1`, (err, row) => {
    if (err) {
        console.log(err);
    }
    console.log(row);
});

// Delete a department
// db.query(`DELETE FROM departments WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//   });

// Default response for any other request (Not Found)

// Create a department
// const sql = `INSERT INTO departments (id, name) 
//               VALUES (?,?)`;
// const params = [1, 'Media'];

// db.query(sql, params, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });
// app.use((req, res) => {
//     res.status(404).end();
// });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});