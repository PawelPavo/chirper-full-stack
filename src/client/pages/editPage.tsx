import * as React from 'react';
import { RouteComponentProps } from 'react-router'
import { IChirp } from '../pages/Home'
import { FaUser, FaCommentDots, FaUndoAlt, FaPaperPlane, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'




class editCard extends React.Component<editCardProps, editCardState> {
    constructor(props: editCardProps) {
        super(props);
        this.state = {
            chirp: {
                id: 0,
                name: '',
                text: ''
            },
            name: '',
            text: ''
        };
    }

    async componentDidMount() {
        let res = await fetch(`/api/chirps/${this.props.match.params.id}`);
        let chirp = await res.json();
        this.setState({ name: chirp.user_id, text: chirp.text })
    }

    async UpdateChirp(e: React.MouseEvent<HTMLButtonElement>) {
        await fetch(`/api/chirps/${this.props.match.params.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user:this.state.name, text: this.state.text })
        })
        this.props.history.push('/');
    }

    async DeleteChirp(e: React.MouseEvent<HTMLButtonElement>) {
        await fetch(`/api/chirps/${this.props.match.params.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        this.props.history.replace('/');
    }

    render() {
        return (
            <>
                <ul className="d-flex justify-content-between shadow-lg sticky-top bg-white">
                    <h4 className="text-monospace m-3">Edit Your Chirp</h4>
                    <Link className="btn btn-primary m-3" to="/"><FaUndoAlt/> Back</Link>
                </ul>

                <div className="d-flex justify-content-center my-5">
                    <div className="col-8 shadow">
                        <h4 className="text-textSpecial mt-3"><FaUser /> Edit Name</h4>
                        <input type="text" className="form-control" aria-describedby="basic-addon1"
                            value={this.state.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ name: e.target.value })}
                        />
                        <h4 className="mt-5 text-textSpecial"><FaCommentDots /> Edit Text</h4>
                        <input type="text" className="form-control" aria-describedby="basic-addon1"
                            value={this.state.text}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ text: e.target.value })}
                        />
                        <div className="col card-footer d-flex justify-content-between mt-5 mb-5 shadow">
                            <button className="btn btn-outline-warning text-black-50" onClick={(e) => this.DeleteChirp(e)}><FaTrashAlt/> Delete Your Chirp</button>
                            <button className="btn btn-outline-primary text-black-50" onClick={(e) => this.UpdateChirp(e)}><FaPaperPlane/> Chirp Your Edit</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

interface editCardProps extends RouteComponentProps<{ id: string }> { }
interface editCardState {
    chirp: IChirp;
    name: string;
    text: string;
}

export default editCard;