const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3006;

app.use(cors());
app.use(express.json());

// Configurar conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Use o nome de usuário do seu MySQL
    password: 'password',  // Substitua pela sua senha do MySQL
    database: 'warehouse'  // Substitua pelo nome do seu banco de dados
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados MySQL');
    }
});

// Rota GET para obter itens do catálogo
app.get('/catalogo', (req, res) => {
    const sql = 'SELECT * FROM items';
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(result);
    });
});

// Rota POST para adicionar um novo pedido
app.post('/pedido', (req, res) => {
    const { item_id, quantidade } = req.body;
    const sql = 'INSERT INTO pedidos (item_id, quantidade) VALUES (?, ?)';
    db.query(sql, [item_id, quantidade], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Pedido criado com sucesso', id: result.insertId });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
