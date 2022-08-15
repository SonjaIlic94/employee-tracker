//const express = require('express');
const mysql = require('mysql2');
//const inputCheck = require('./utils/inputCheck');
//const PORT = process.env.PORT || 3001;
//const app = express();

// Express middleware
//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());

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

// Get all candidates
// app.get('/api/departments', (req, res) => {
//     const sql = `SELECT * FROM departments`;

//     db.query(sql, (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: rows
//         });
//     });
// });


// // Get a single candidate
// app.get('/api/departments/:id', (req, res) => {
//     const sql = `SELECT * FROM departments WHERE id = ?`;
//     const params = [req.params.id];

//     db.query(sql, params, (err, row) => {
//         if (err) {
//             res.status(400).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: row
//         });
//     });
// });

// // Delete a candidate
// app.delete('/api/departments/:id', (req, res) => {
//     const sql = `DELETE FROM departments WHERE id = ?`;
//     const params = [req.params.id];

//     db.query(sql, params, (err, result) => {
//         if (err) {
//             res.statusMessage(400).json({ error: res.message });
//         } else if (!result.affectedRows) {
//             res.json({
//                 message: 'Department not found'
//             });
//         } else {
//             res.json({
//                 message: 'deleted',
//                 changes: result.affectedRows,
//                 id: req.params.id
//             });
//         }
//     });
// });

// // Create a department
// app.post('/api/departments', ({ body }, res) => {
//     const errors = inputCheck(body, 'name',);
//     if (errors) {
//         res.status(400).json({ error: errors });
//         return;
//     }
// });
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

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

module.exports = db;