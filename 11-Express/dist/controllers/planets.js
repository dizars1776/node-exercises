var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Joi from 'joi';
import pgPromise from 'pg-promise';
import { readFileSync } from 'fs';
const db = pgPromise()('postgres://postgres:postgres@localhost:5432/planets');
// inits the database - planets - and adds 2 planets
const setupDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const initSql = readFileSync('./src/assets/14.sql').toString();
    yield db.query(initSql);
});
setupDb();
// GET /api/planets: return all planets (JSON) with 200
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const planets = yield db.many(`SELECT * FROM planets;`);
    res.status(200).json(planets);
});
// GET /api/planets/:id: return a planet (JSON) by id with 200
const getOneById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const planet = yield db.oneOrNone(`SELECT * FROM planets WHERE id=$1;`, id);
    res.status(200).json(planet);
});
const planetSchema = Joi.object({
    name: Joi.string().required(),
});
/*
  POST /api/planets: create a planet, return only 201 code and a success JSON with key msg
  Make sure every planet is created with id and name.
*/
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const newPlanet = { name };
    const validateNewPlanet = planetSchema.validate(newPlanet);
    if (validateNewPlanet.error) {
        return res
            .status(400)
            .json({ msg: validateNewPlanet.error.details[0].message });
    }
    else {
        yield db.none(`INSERT INTO planets (name) VALUES ($1);`, name);
        res.status(201).json({ msg: 'The planet was created!' });
    }
});
// PUT /api/planets/:id: update a planet by id, return only 200 code and a success JSON with key msg
const updateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { name } = req.body;
    // validate 
    const updatedPlanetParams = { name };
    const validateUpdatedPlanet = planetSchema.validate(updatedPlanetParams);
    // update
    if (validateUpdatedPlanet.error) {
        return res
            .status(400)
            .json({ msg: validateUpdatedPlanet.error.details[0].message });
    }
    else {
        yield db.none(`UPDATE planets SET name=$2 WHERE id=$1;`, [id, name]);
        res.status(200).json({ msg: 'The planet was updated!' });
    }
});
// DELETE /api/planets/:id: delete a planet by id, return only 200 code and a success JSON with key msg
const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const planetToDelete = yield db.oneOrNone(`SELECT id FROM planets WHERE id=$1;`, id);
    // check if the given planet's id exists in the database and act accordingly
    try {
        if (planetToDelete !== null) {
            yield db.none(`DELETE FROM planets WHERE id=$1;`, planetToDelete.id);
            res.status(200).json({ msg: 'The planet was deleted!' });
        }
        else {
            throw ('Id doesn\'t exist!');
        }
    }
    catch (error) {
        res.status(404).json({ msg: error });
    }
});
export { getAll, getOneById, create, updateById, deleteById };
