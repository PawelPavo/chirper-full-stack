import {RequestHandler} from 'express';

export const chirpBody: RequestHandler = (req, res, next) =>{
    const chirpKeys = Object.keys(req.body);
    if (chirpKeys.includes('user_id') && chirpKeys.includes('text')) {
        next()
    } else {
        res.status(400).json({error: 'Bad Request for Chirp Insert'});
    }
}
