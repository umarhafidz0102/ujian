const express = require("express");
const cors = require("cors");

const siswaRoutes = require("./router/siswa");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Student Management REST API berjalan"
    });
});

app.use("/api/siswa", siswaRoutes);

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});