// controllers/UnitController.js
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Exemplo de um controlador para criar um usuário
export const login = async (req, res) => {
    try {
      console.log("entrei aqui")
        const { name, password } = req.body;
  
        // Procure o usuário no banco de dados pelo nome de usuário
        const user = await User.findOne({
          where: { name },
        });
  
        // Se o usuário não existe, retorne um erro de autenticação
        if (!user) {
          return res.status(401).json({ message: 'Unidade não existe!' });
        }
  
        // Compare a senha fornecida com a senha armazenada no banco de dados
        const passwordMatch = await bcrypt.compareSync(password, user.password);
  
        // Se as senhas não coincidirem, retorne um erro de autenticação
        if (!passwordMatch) {
          return res.status(401).json({ message: 'Credenciais inválidas' });
        }
  
        // Se as credenciais forem válidas, você pode gerar um token de autenticação
        // e retorná-lo como resposta
        // Exemplo: JWT (JSON Web Token)
  
        // Aqui, você pode usar uma biblioteca como 'jsonwebtoken' para gerar um token JWT
        // e enviá-lo como resposta
  
        // Exemplo de criação de token JWT:
        const token = jwt.sign({ userId: user.id, userType: user.type, userName:user.name }, 'suaChaveSecreta', { expiresIn: '1h' });
  
        // Retorne o token como resposta
        res.status(200).json({ token });
  
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
};
