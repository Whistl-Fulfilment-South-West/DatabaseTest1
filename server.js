// ==========================================================================================================
// -- Boilerplate --
// ==========================================================================================================

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import sql from 'mssql';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ==========================================================================================================
// -- SQL Config --
// ==========================================================================================================

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    server: process.env.DB_SERVER,
    port: Number(process.env.DB_PORT),
    options: {
        encrypt: false, // set true for Azure
        trustServerCertificate: true
    }
};

// ==========================================================================================================
// -- Endpoints --
// ==========================================================================================================

app.get('/api/part/:part', async (req, res) => {
    const { part } = req.params;

    try {
        const pool = await sql.connect(sqlConfig);

        const result = await pool.request()
            .input('Part', sql.VarChar, part)
            .query(`
                SELECT descr
                FROM part
                WHERE part = @Part
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ descr: null });
        }

        res.json(result.recordset[0]);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// ==========================================================================================================
// -- Server Start --
// ==========================================================================================================

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
