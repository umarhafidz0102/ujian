const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_sekolah"
});

db.connect((error) => {
    if (error) {
        console.error("Database gagal terhubung:", error.message);
        return;
    }

    console.log("Database db_sekolah berhasil terhubung");
});

module.exports = db;