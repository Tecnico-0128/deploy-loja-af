const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
app.use(express.json()); 
app.use(cors()); 

let clientesServidor = []; 
app.post('/api/cliente', (req, res) => {
    const { nome, cpf } = req.body;
    if (!nome || !cpf) {
        return res.status(400).json({ erro: 'Nome e CPF são obrigatórios.' });
    }   
    const clienteExistente = clientesServidor.find(c => c.cpf === cpf);
    if (clienteExistente) {
        return res.status(400).json({ erro: 'Já existe um cliente cadastrado com este CPF.' });
    }
    const novoCliente = { nome, cpf };
    clientesServidor.push(novoCliente);
    return res.status(201).json({
        mensagem: 'Cliente cadastrado com sucesso!',
        cliente: novoCliente
    });
});

app.get('/api/cliente', (req, res) => {
    return res.json(clientesServidor);
});

app.put('/api/cliente/:cpf', (req, res) => {
    const { cpf } = req.params;
    const { nome } = req.body;
    if (!nome) {
        return res.status(400).json({ erro: 'O novo nome é obrigatório para a atualização.' });
    }

    const index = clientesServidor.findIndex(c => c.cpf === cpf);

    if (index === -1) {
        return res.status(404).json({ erro: 'Cliente não encontrado.' });
    }

    clientesServidor[index].nome = nome;

    console.log('Cliente atualizado no backend:', clientesServidor[index]);
    return res.json({
        mensagem: 'Cliente atualizado com sucesso!',
        cliente: clientesServidor[index]
    });
});
app.delete('/api/cliente/:cpf', (req, res) => {
    const { cpf } = req.params;

    const index = clientesServidor.findIndex(c => c.cpf === cpf);

    if (index === -1) {
        return res.status(404).json({ erro: 'Cliente não encontrado.' });
    }
    const clienteRemovido = clientesServidor.splice(index, 1);

    console.log('Cliente removido do backend:', clienteRemovido[0]);
    return res.json({
        mensagem: 'Cliente deletado com sucesso!',
        cliente: clienteRemovido[0]
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} (http://localhost:${PORT})`);
});