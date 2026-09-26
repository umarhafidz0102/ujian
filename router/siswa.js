const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/", (req, res) => {
    const sql = "SELECT * FROM siswa ORDER BY id DESC";

    db.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil data siswa",
                error: error.message
            });
        }

        res.json({
            success: true,
            message: "Data siswa berhasil diambil",
            data: results
        });
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM siswa WHERE id = ?";

    db.query(sql, [id], (error, results) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil data siswa",
                error: error.message
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Siswa tidak ditemukan"
            });
        }

        res.json({
            success: true,
            message: "Data siswa berhasil ditemukan",
            data: results[0]
        });
    });
});

router.post("/", (req, res) => {
    const {
        nis,
        nama,
        kelas,
        jurusan,
        alamat
    } = req.body;

    if (!nis || !nama || !kelas || !jurusan || !alamat) {
        return res.status(400).json({
            success: false,
            message: "Semua data siswa wajib diisi"
        });
    }

    const sql = `
        INSERT INTO siswa
        (nis, nama, kelas, jurusan, alamat)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [nis, nama, kelas, jurusan, alamat],
        (error, result) => {

            if (error) {
                return res.status(500).json({
                    success: false,
                    message: "Gagal menambahkan siswa",
                    error: error.message
                });
            }

            res.status(201).json({
                success: true,
                message: "Siswa berhasil ditambahkan",
                data: {
                    id: result.insertId,
                    nis,
                    nama,
                    kelas,
                    jurusan,
                    alamat
                }
            });
        }
    );
});

router.put("/:id", (req, res) => {
    const id = req.params.id;

    const {
        nis,
        nama,
        kelas,
        jurusan,
        alamat
    } = req.body;

    if (!nis || !nama || !kelas || !jurusan || !alamat) {
        return res.status(400).json({
            success: false,
            message: "Semua data siswa wajib diisi"
        });
    }

    const sql = `
        UPDATE siswa
        SET nis = ?,
            nama = ?,
            kelas = ?,
            jurusan = ?,
            alamat = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [nis, nama, kelas, jurusan, alamat, id],
        (error, result) => {

            if (error) {
                return res.status(500).json({
                    success: false,
                    message: "Gagal mengubah data siswa",
                    error: error.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Siswa tidak ditemukan"
                });
            }

            res.json({
                success: true,
                message: "Data siswa berhasil diubah"
            });
        }
    );
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM siswa WHERE id = ?";

    db.query(sql, [id], (error, result) => {

        if (error) {
            return res.status(500).json({
                success: false,
                message: "Gagal menghapus siswa",
                error: error.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Siswa tidak ditemukan"
            });
        }

        res.json({
            success: true,
            message: "Data siswa berhasil dihapus"
        });
    });
});

module.exports = router;