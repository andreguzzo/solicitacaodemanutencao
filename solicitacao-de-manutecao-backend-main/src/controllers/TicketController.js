// Importe os módulos necessários
import Ticket from '../models/Ticket.js'; // Importe o modelo Ticket
import User from '../models/User.js'

// Rota para criar um novo ticket
export const createTicket = async (req, res) => {
  try {
    // Recupere os dados do corpo da solicitação
    const { title, description, photo, category, urgency, userID,  status } = req.body;

    // Crie um novo ticket no banco de dados
    const novoTicket = await Ticket.create({
        title,
      description,
      photo,
      category,
      urgency,
      userID,
      status
    });

    // Responda com o novo ticket criado
    res.status(201).json(novoTicket);
  } catch (error) {
    console.error('Erro ao criar o ticket:', error);
    res.status(500).json({ erro: 'Erro interno ao criar o ticket' });
  }
}

export const getTicketsByID = async (req, res) => {
  const id = req.params.id;
  User.hasMany(Ticket, { foreignKey: 'userId' });
    Ticket.belongsTo(User, { foreignKey: 'userID' });
  try {
    const tickets = await Ticket.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: User, // O modelo relacionado que você deseja incluir
          attributes: ['name'], // Atributos do modelo de post que você deseja retornar
        },
      ],
    })
    res.status(200).json(tickets)
  }
  catch(error){
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

export const getTickets = async (req, res) => {
  const id = req.params.id;
  User.hasMany(Ticket, { foreignKey: 'userId' });
    Ticket.belongsTo(User, { foreignKey: 'userID' });
  try {
    const tickets = await Ticket.findAll({
      where: {
        userID: id
      }
    })
    res.status(200).json(tickets)
  }
  catch(error){
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

export const getAllTickets = async (req, res) => {
  try {
    User.hasMany(Ticket, { foreignKey: 'userId' });
    Ticket.belongsTo(User, { foreignKey: 'userID' });
    const tickets = await Ticket.findAll({
      include: [
        {
          model: User, // O modelo relacionado que você deseja incluir
          attributes: ['name'], // Atributos do modelo de usuário que você deseja retornar
        },
      ],
    })
    res.status(200).json(tickets)
  }
  catch(error){
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

export const updateTicket = async (req, res) => {
  const id = req.params.id;
  const {status,urgency,deadLineDate} = req.body;
  console.log(status+"status")
  try {
    const tickets = await Ticket.update(
      { status: status,urgency: urgency, deadlineDate: deadLineDate  }, // Campo a ser atualizado e novo valor
      {
        where: {
          id: id, // Condição: ID igual ao valor fornecido
        },
      }
    )
    res.status(200).json(tickets)
  }
  catch(error){
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}
