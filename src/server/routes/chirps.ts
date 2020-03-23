import { Router, json } from 'express';
import { chirpBody } from '../middleware/chirps'
import db from '../db';


const router = Router();

//GET /api/chirps
router.get('/', async (req, res) => {
    try {
        const chirps = await db.chirps.all();
        res.json(chirps)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Sorry we found an error with GET ALL!'})
    }
});

//GET /api/chirps/:id
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const [chirp] = await db.chirps.one(id);
        res.json(chirp)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Sorry we found an error with GET ONE!'})
    }
});

//POST /api/chirps
router.post('/',chirpBody, async (req, res) => {
    const chirp = req.body;
    try {
        const {insertId} = await db.chirps.insert(chirp.text, chirp.user_id);
        res.status(201).json({insertId, msg:'Chirp Added'})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Sorry we found an error with your POST request!'})
    }
});

//PUT /api/chirps/:id
router.put('/:id', async (req, res) =>{
    const id = Number(req.params.id)
    const chirpText = req.body.text

    try {
        const result = await db.chirps.update(chirpText, id);
        res.status(200).json({msg: 'Chirp Updated', result})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Sorry we found an error with edit PUT request!'})
    }
})

//DELETE /api/chirps/:id
router.delete('/:id', async (req, res) =>{
    const id = Number(req.params.id);
    try {
        const result = await db.chirps.destory(id);
        res.status(200).json({msg: 'Chirp Deleted', result})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Sorry we found an error with your DELETE request!'})
    }
})

export default router;