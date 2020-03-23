import { Router } from 'express';
import db from '../db';

const router = Router();

//GET /api/users
router.get('/', async (req, res) => {
    try {
        const chirps = await db.users.all();
        res.json(chirps)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Sorry we found an error with GET ALL USERS!' })
    }
});

//GET /api/chirps/:id
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const [chirp] = await db.users.one(id);
        res.json(chirp)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Sorry we found an error with GET ONE USER!'})
    }
});

export default router;