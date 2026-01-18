const express = require('express');
const { exec } = require('child_process');

const app = express();

// Middleware JSON
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

    exec(command, { timeout: 10000 }, (error, stdout, stderr) => {
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

// ⛔ JANGAN localhost
// ✅ HARUS 0.0.0.0 agar public di Codespaces
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
    console.log(`🚀 Server berjalan di http://${HOST}:${PORT}`);
    console.log('📌 Endpoint: POST /run');
    console.log('📦 Body example: { "command": "ls -la" }');
});
