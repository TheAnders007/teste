const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const config = require('./config');

// Configuração do servidor
const app = express();
const port = 5000;

// Middleware
app.use(cors()); 
app.use(bodyParser.json());

// Conexão com o MongoDB
mongoose.connect(config.mongoURI).then(() => {
  console.log('Conectado ao MongoDB');
}).catch((err) => {
  console.error('Erro ao conectar ao MongoDB:', err);
});

// Definir o esquema do usuário
const formSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  estado: {type: String, required: true},
  festival: {type: String, required: true},
  comentario: {type: String, required: true}
});

// Criar o modelo
const User = mongoose.model('comentarios', formSchema);

// Rota POST para cadastrar o usuário
app.post('/api/users', async (req, res) => {
  try {
    const { nome, estado, festival, comentario } = req.body;

    // Criar novo usuário
    const newUser = new User({
      nome,
      estado,
      festival,
      comentario
    });

    // Salvar no banco de dados
    await newUser.save();
    res.status(200).send('Formulário enviado com sucesso!');
  } catch (err) {
    res.status(500).send('Erro ao enviar formulário');
    console.error(err);
  }
});



app.get('/comments',  async (req, res) => {
    try {
      // Buscar todos os usuários (comentários) no banco de dados
      const comments = await User.find();
      res.status(200).json(comments); // Retorna os comentários em formato JSON
    } catch (err) {
      res.status(500).send('Erro ao obter comentários');
      console.error(err);
    }
  });

  app.delete('/api/comments/:id', async (req, res) => {
    try {
      const { id } = req.params; // Obtém o id do comentário a partir da URL
  
      // Verifica se o ID foi fornecido
      if (!id) {
        return res.status(400).send('ID do comentário não fornecido');
      }
  
      // Tenta encontrar e excluir o comentário
      const deletedComment = await User.findByIdAndDelete(id);
  
      // Se não encontrar o comentário, retorna erro
      if (!deletedComment) {
        return res.status(404).send('Comentário não encontrado');
      }
  
      // Se o comentário for deletado com sucesso
      res.status(200).send('Comentário excluído com sucesso!');
    } catch (err) {
      // Se houver um erro durante a operação
      res.status(500).send('Erro ao excluir comentário');
      console.error(err);
    }
  });
  

  


  
// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


