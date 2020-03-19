import {RequestHandler} from 'express';

export const chirpBody: RequestHandler = (req, res, next) =>{
    // if req.body.user_id or req.body.text don't exist
    const chirpKeys = Object.keys(req.body);
    console.log(chirpKeys);
    if (chirpKeys.includes('user_id') && chirpKeys.includes('text')) {
        next()
    } else {
        res.status(400).json({error: 'Bad Request'});
    }
}
