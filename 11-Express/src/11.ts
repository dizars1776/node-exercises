import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import 'express-async-errors'
import Joi, { boolean, Schema } from 'joi'
import morgan from 'morgan'

const app = express()
const port = process.env.PORT

app.use(morgan('dev'))
app.use(express.json())

type Planet = {
  id: number
  name: string
}

type Planets = Planet[]

// Dummy database of planets
let planets: Planets = [
  {
    id: 1,
    name: 'Earth',
  },
  {
    id: 2,
    name: 'Mars',
  },
]

app.get('/', (req, res) => res.status(200).send({ message: 'Hello World!' }))

// GET /api/planets: return all planets (JSON) with 200
app.get('/api/planets', (req, res) => res.status(200).json(planets))

// GET /api/planets/:id: return a planet (JSON) by id with 200
app.get('/api/planets/:id', (req, res) => {
  const { id } = req.params
  const planet = planets.find((p) => p.id === Number(id))

  res.status(200).json(planet)
})

const planetSchema = Joi.object({
  id: Joi.number().integer().strict().required(),
  name: Joi.string().required(),
})

/* 
  POST /api/planets: create a planet, return only 201 code and a success JSON with key msg
  Make sure every planet is created with id and name. 
*/
app.post('/api/planets', (req, res) => {
  const { id, name } = req.body
  const newPlanet = { id, name }
  const validateNewPlanet = planetSchema.validate(newPlanet)

  if (validateNewPlanet.error) {
    return res
      .status(400)
      .json({ msg: validateNewPlanet.error.details[0].message })
  } else {
    planets = [...planets, newPlanet]
    res.status(201).json({ msg: 'The planet was created!' })
  }
})

// PUT /api/planets/:id: update a planet by id, return only 200 code and a success JSON with key msg
app.put('/api/planets/:id', (req, res) => {
  const { id } = req.params
  const { name } = req.body
  const updatedPlanetParams = { id, name }
  const validateUpdatedPlanet = planetSchema.validate(updatedPlanetParams)

  if (validateUpdatedPlanet.error) {
    return res
      .status(400)
      .json({ msg: validateUpdatedPlanet.error.details[0].message })
  } else {
    planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p))
    res.status(200).json({ msg: 'The planet was updated!' })
  }
})

// DELETE /api/planets/:id: delete a planet by id, return only 200 code and a success JSON with key msg
app.delete('/api/planets/:id', (req, res) => {
  const { id } = req.params

  if (planets.find((p) => p.id === Number(id))) {
    planets = planets.filter((p) => p.id !== Number(id))
    res.status(200).json({ msg: 'The planet was deleted!' })
  } else {
    res.status(404).json({ msg: 'The planet does not exist!' })
  }
})

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
)
