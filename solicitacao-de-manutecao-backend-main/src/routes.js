// routes.js
import express from 'express';
import { createUser, deleteUser, getUsers, getUser, updateUser } from './controllers/UserController.js';
import { login } from './controllers/LoginController.js';
import { createTicket, getAllTickets, getTickets, getTicketsByID, updateTicket } from './controllers/TicketController.js';

const router = express.Router();

router.get('/user/:id', getUser);
router.put('/user/:id', updateUser)

router.post('/users', createUser);
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);

router.post('/ticket', createTicket)
router.get('/ticket/:id', getTicketsByID)
router.put('/ticket/:id', updateTicket)

router.get('/tickets/:id', getTickets)
router.get('/tickets', getAllTickets)


router.post('/login', login);


export default router;
