import * as React from 'react';
import { Link } from 'react-router-dom'
import { FaUser, FaEdit, FaPaperPlane, FaCommentDots, FaUndoAlt } from 'react-icons/fa'


const NewChirp: React.FC<NewChirpProps> = () => {

    const [selectedId, setSelectedId] = React.useState<string>('0');
    const [users, setUsers] = React.useState<{ id: number; name: string; }[]>([]);
    const handleSelectedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedId(e.target.value)
    }

    const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (selectedId === '0') {

        } else {
            console.log(selectedId)
        }
    }

    React.useEffect(() => {
        (async function () {
            const res = await fetch('/api/users');
            const users = await res.json();
            setUsers(users)
        })()
    }, [])

    return (
        <div>
            <ul className="d-flex justify-content-between shadow-lg sticky-top bg-white">
                <h4 className="text-monospace m-3">Create New Chirp</h4>
                <Link className="btn btn-primary m-3" to="/"><FaUndoAlt /> Go Back</Link>
            </ul>
            <main className="container mt-5">
                <section className="row mt-2 justify-content-center">
                    <div className="card-header col-md-6 border">
                        <h4 className="mt-3"><FaUser /> Select a Name</h4>
                        <form className="form-group p-3">
                            <select className="form-control" value={selectedId} onChange={handleSelectedChange}>
                                <option value="0" disabled >Select User</option>
                                {users.map(user => <option key={`${user.id}-${user.name}`} value={user.id}>{user.name}</option>)}
                            </select>
                        </form>
                        <h4 className="my-3"><FaCommentDots /> Enter Your Chirp</h4>
                        <input type="text" className="form-control" aria-describedby="basic-addon1"
                            value={null}
                            onChange={null}
                        />
                        <button onClick={submit} className="btn-primary mt-3 mx-auto btn-block w-75">Chirp It</button>
                    </div>

                </section>

            </main >
        </div>
    );
}

export interface IChirp {
    id: number,
    user_id?: number,
    text: string,
    location?: string,
    created_at?: Date,
    name?: string,
}

interface NewChirpProps {

}

export default NewChirp;