import {Query} from '../';


interface ChirpsT {
    id: number,
    uesr_id: number,
    text: string,
    location: string,
    created_at: Date,
    name: string
}


const all = () => Query<ChirpsT[]>('SELECT chirps.*, users.name FROM chirps JOIN users ON users.id = chirps.user_id');

const one =(id:string) => Query<ChirpsT[]>('SELECT * FROM chirps WHERE id = ?', [id]);

const insert = (text: string, user_id: number) => Query<{ insertId: number }>('INSERT INTO chirps (text, user_id) VALUE (?)', [[text, user_id]]);

const update = (text: string, id:number) => Query('UPDATE chirps SET text = ? WHERE id = ?', [text, id]);

const destory = (id:number) => Query('DELETE FROM chirps WHERE id = ?',[id])

export default {
    all,
    one,
    insert,
    update,
    destory
}
