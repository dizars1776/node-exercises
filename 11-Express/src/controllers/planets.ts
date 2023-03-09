import { Request, Response } from 'express'
import Joi from 'joi'

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

// GET /api/planets: return all planets (JSON) with 200
const getAll = (req: Request, res: Response) => res.status(200).json(planets)

// GET /api/planets/:id: return a planet (JSON) by id with 200
const getOneById = (req: Request, res: Response) => {
  const { id } = req.params
  const planet = planets.find((p) => p.id === Number(id))

  res.status(200).json(planet)
}

const planetSchema = Joi.object({
  id: Joi.number().integer().strict().required(),
  name: Joi.string().required(),
})

/* 
  POST /api/planets: create a planet, return only 201 code and a success JSON with key msg
  Make sure every planet is created with id and name. 
*/
const create = (req: Request, res: Response) => {
  const { id, name } = req.body
  const newPlanet:Planet = { id, name }
  const validateNewPlanet = planetSchema.validate(newPlanet)

  if (validateNewPlanet.error) {
    return res
      .status(400)
      .json({ msg: validateNewPlanet.error.details[0].message })
  } else {
    planets = [...planets, newPlanet]
    res.status(201).json({ msg: 'The planet was created!' })
  }
}

// PUT /api/planets/:id: update a planet by id, return only 200 code and a success JSON with key msg
const updateById = (req: Request, res: Response) => {
  const id  = Number(req.params.id)
  const { name } = req.body

  const updatedPlanetParams:Planet = { id, name }
  const validateUpdatedPlanet = planetSchema.validate(updatedPlanetParams)

  if (validateUpdatedPlanet.error) {
    return res
      .status(400)
      .json({ msg: validateUpdatedPlanet.error.details[0].message })
  } else {
    planets = planets.map((p) => (p.id === id ? { ...p, name } : p))
    res.status(200).json({ msg: 'The planet was updated!' })
  }
}

// DELETE /api/planets/:id: delete a planet by id, return only 200 code and a success JSON with key msg
const deleteById = (req: Request, res: Response) => {
  const id = Number(req.params.id)

  if (planets.find((p) => p.id === id)) {
    planets = planets.filter((p) => p.id !== id)
    res.status(200).json({ msg: 'The planet was deleted!' })
  } else {
    res.status(404).json({ msg: 'The planet does not exist!' })
  }
}

export { getAll, getOneById, create, updateById, deleteById }
