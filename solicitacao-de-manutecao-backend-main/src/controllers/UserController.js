// controllers/UserController.js
import Ticket from '../models/Ticket.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt'

// Exemplo de um controlador para criar um usuário
export const createUser = async (req, res) => {
  try {
    const { name, password, type } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 12); // 12 é o número de salt rounds

    const user = await User.create({ name, password:hashedPassword, type });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const users = await User.findOne({
      where: {
        id: id,
      },
    });

    users.password=''
    res.status(200).json(users)
  }
  catch(error){
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const {name,password} = req.body
  
  try {
    if(password){
    const hashedPassword = bcrypt.hashSync(password, 12); 
    const user = await User.update(
      { name:name, password:hashedPassword }, // Campo a ser atualizado e novo valor triste
      {
        where: {
          id: id, // Condição: ID igual ao valor fornecido
        },
      }
    )} else{
    const user = await User.update(
      { name:name }, // Campo a ser atualizado e novo valor triste
      {
        where: {
          id: id, // Condição: ID igual ao valor fornecido
        },
      }
    )
    }
    res.status(200).json({message:"Atualizacao bem sucedida!"})
  }
  catch(error){
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users)
  }
  catch(error){
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

  export const deleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      const users = await User.destroy({
        where: {
          id: id,
        },
      });
      const tickets = await Ticket.destroy({
        where: {
          userID: id,
        },
      });
      res.status(200).json(users)
    }
    catch(error){
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
}
