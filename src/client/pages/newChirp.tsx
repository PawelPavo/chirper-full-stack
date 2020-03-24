import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom'
import { FaUser, FaCommentDots, FaUndoAlt, FaPaperPlane } from 'react-icons/fa'
import { IChirp } from '../utils/interfaces';



class NewChirp extends React.Component<NewChirpProps, NewChirpState> {
    constructor(props: NewChirpProps) {
        super(props);
        this.state = {
            id: '',
            text: '',
            users:[],
            selectedUserId:'0'
        };
    }

    async handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        await fetch('api/chirps', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: this.state.selectedUserId, text: this.state.text })
        });
        this.setState({ id: '', text: '' });
        this.props.history.replace('/');
    }

    async componentDidMount() {
        let res = await fetch('/api/users');
        let users = await res.json();
        this.setState({ users })
    }

    render() {
        return (
            <div >
                <ul className="d-flex justify-content-between shadow-lg sticky-top bg-white">
                    <h4 className="text-monospace m-3">Create New Chirp</h4>
                    <Link className="btn btn-primary m-3" to="/"><FaUndoAlt /> Back</Link>
                </ul>
                <div className="d-flex justify-content-center my-5">
                    <div className="col-8 shadow">
                        <h4 className="text-primary mt-3"><FaUser /> Enter Your Name</h4>
                        <section className="row mt-2 justify-content-center">
                            <div className="col-md-12">
                                <form className="form-group p-3">
                                    <select className="form-control" value={this.state.selectedUserId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.setState({ selectedUserId: e.target.value })}>
                                        <option value="0" disabled>Choose a User</option>
                                        {this.state.users.map(user=>(
                                            <option key={user.id} value={user.id}>{user.name}</option>
                                        ))}
                                    </select>
                                </form>
                            </div>
                        </section>
                        <h4 className="mt-2 text-primary"><FaCommentDots /> Enter Your Chirp</h4>
                        <input type="text" className="form-control" aria-describedby="basic-addon1"
                            value={this.state.text}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ text: e.target.value })}
                        />
                        <div className="col card-footer d-flex justify-content-end mt-5 mb-5 shadow">
                            <button className="btn btn-outline-primary btn-lg" onClick={(e) => this.handleClick(e)}> <FaPaperPlane /> Post Chirp</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

interface NewChirpProps extends RouteComponentProps<{ id: string }> { }
interface NewChirpState {
    id: string;
    text: string;
    users:IChirp[];
    selectedUserId: string;
}

export default NewChirp;