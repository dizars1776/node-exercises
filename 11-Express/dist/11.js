import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import { getAll, getOneById, create, updateById, deleteById, } from './controllers/planets.js';
const app = express();
const port = process.env.PORT;
app.use(morgan('dev'));
app.use(express.json());
// Get the planets
app.get('/api/planets', getAll);
// Display planet based on ID
app.get('/api/planets/:id', getOneById);
// Create a new planet
app.post('/api/planets', create);
// Update planet based on ID
app.put('/api/planets/:id', updateById);
// Delet planet based on ID
app.delete('/api/planets/:id', deleteById);
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
