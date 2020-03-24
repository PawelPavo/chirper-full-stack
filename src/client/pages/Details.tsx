import * as React from 'react';
import { RouteComponentProps } from 'react-router'
import { IChirp } from '../utils/interfaces'
import { FaUser, FaCommentDots, FaUndoAlt, FaPaperPlane, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'




class Details extends React.Component<DetailsProps, DetailsState> {
    constructor(props: DetailsProps) {
        super(props);
        this.state = {
            chirp: {
                id: 0,
                user: '',
                text: ''
            },
            user: '',
            text: '',
            id: 0
        };
    }

    async componentDidMount() {
        let res = await fetch(`/api/chirps/${this.props.match.params.id}`);
        let chirp = await res.json();
        this.setState({ user: chirp.user_id, text: chirp.text })
    }

    async UpdateChirp(e: React.MouseEvent<HTMLButtonElement>) {
        await fetch(`/api/chirps/${this.props.match.params.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: `${this.state.user}`, text: this.state.text })
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
                    <Link className="btn btn-primary m-3" to="/"><FaUndoAlt /> Back</Link>
                </ul>

                <div className="d-flex justify-content-center my-5">
                    <div className="col-8 shadow">
                        <h4 className="text-primary mt-3"><FaUser /> Edit Name</h4>
                        <input type="text" className="form-control" aria-describedby="basic-addon1"
                            value={this.state.user}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ user: e.target.value })}
                        />
                        <section className="row mt-2 justify-content-center">
                            <div className="col-md-12">
                                <form className="form-group p-3">
                                    <select className="form-control" value={this.state.user} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.setState({ user: e.target.value })}>
                                        <option value="1">Pawel</option>
                                        <option value="2">David</option>
                                        <option value="3">Alex</option>
                                        <option value="4">Lukasz</option>
                                        <option value="5">Richard</option>
                                        <option value="6">Karolina</option>
                                        <option value="7">Kat</option>
                                        <option value="8">Greg</option>
                                        <option value="9">Konstanty</option>
                                        <option value="10">Freya</option>
                                    </select>
                                </form>
                            </div>
                        </section>

                        <h4 className="mt-5 text-primary"><FaCommentDots /> Edit Text</h4>
                        <input type="text" className="form-control" aria-describedby="basic-addon1"
                            value={this.state.text}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ text: e.target.value })}
                        />
                        <div className="col card-footer d-flex justify-content-between mt-5 mb-5 shadow">
                            <button className="btn btn-outline-warning text-black-50" onClick={(e) => this.DeleteChirp(e)}><FaTrashAlt /> Delete Your Chirp</button>
                            <button className="btn btn-outline-primary text-black-50" onClick={(e) => this.UpdateChirp(e)}><FaPaperPlane /> Chirp Your Edit</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

interface DetailsProps extends RouteComponentProps<{ id: string }> { }
interface DetailsState {
    chirp: IChirp;
    user: string;
    text: string;
    id: number;
}

export default Details;