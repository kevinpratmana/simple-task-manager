// server.js
const express = require('express');
const { exec } = require('child_process');

const app = express();

// Middleware untuk bisa membaca JSON
app.use(express.json());

app.post('/run', (req, res) => {
    const { command } = req.body;

    if (!command) {
        return res.status(400).json({
            error: true,
            message: 'Field "command" wajib diisi'
        });
    }

    console.log(`[EXEC] ${command}`);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({
                error: true,
                message: 'Command gagal dijalankan',
                details: error.message,
                stderr
            });
        }

        res.json({
            success: true,
            command,
            stdout,
            stderr: stderr || undefined
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
    console.log('Endpoint: POST /run');
    console.log('Body example: { "command": "ls -la" }');
});
