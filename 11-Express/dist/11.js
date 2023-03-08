import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
const app = express();
const port = process.env.PORT;
app.use(morgan('dev'));
app.use(express.json());
let planets = [
    {
        id: 1,
        name: 'Earth',
    },
    {
        id: 2,
        name: 'Mars',
    },
];
app.get('/', (req, res) => res.status(200).send({ message: 'Hello World!' }));
app.get('/api/planets', (req, res) => res.status(200).json(planets));
app.get('/api/planets/:id', (req, res) => {
    const { id } = req.params;
    const planet = planets.find((p) => p.id === Number(id));
    res.status(200).json(planet);
});
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
app.post('/api/planets', (req, res) => {
    const { id, name } = req.body;
    const newPlanet = { id, name };
    planets = [...planets, newPlanet];
    console.log(req.body);
    res.status(201).json({ message: 'The planet was created!' });
});
