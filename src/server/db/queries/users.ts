import {Query} from '../'

interface UsersT {
    id: number,
    name: string,
    email: string,
    password: string,
    created_at: Date
}

const all = () => Query<UsersT[]>('SELECT name, email, id  FROM users');

const one =(id:string) => Query<UsersT[]>('SELECT * FROM users WHERE id = ?', [id]);


const find = (column: string, value: string |  number) => Query ('SELECT * FROM users WHERE ?? = ?', [column, value]);

const insert = (values: any) => Query<{insertId: number}>('INSERT INTO users (name, email, password VALUES ?', [values]);


export default {
    insert,
    find,
    all,
    one
}
