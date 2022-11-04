const express = require('express');
const app = express();
const port = 3200;

app.use(express.json());


const login = {
    id: 1,
    nome: 'Admin',
    username: 'admin123',
    password: 'admin123',
    logado: 1
}

function verificaLoginMidleware(req, resp, next) {
    const { usuario } = req.params;

    if (usuario == 1 && logado == 1) {
        next();
    } else {
        resp.status(401).send({ error: 'Não autorizado' })
    }
}

app.get('/tarefas', verificaLoginMidleware,  (req, resp) => {
    const tarefas = [{
        id: 1, titulo: 'Estudar js'
    },
    {
        id: 2, titulo: 'Malhar'
    }]

    resp.send({ tarefas })
})


app.post('/login', async (req, resp) => {
    const { email, password } = req.body;

        //TODO verificar se email e senha corretos e retornar para o cliente com o ID
        const { conectar } = require('./config/db');
        const sequelizeConexao = await conectar();

        const { Usuario } = require('./models/usuario');
        const usuario = await Usuario(sequelizeConexao).findOne({
            attributes: ["id", "nome"],
            where: {
                email,
                senha: password
            }
        });
    
    if (usuario) { 

        resp.status(200).send({ usuario });
    } else {

        resp.status(401).send({ message: 'Dados inválidos' });
    }
})

/*
app.post('/logout', (req, resp) => {
    resp.send('deslogado');
})

app.post('/verificaLogin', (req, resp) => {
    resp.send({ logado: true })
})*/

app.listen(port, () => {
    console.log('Servidor executando na porta ' + port);
})