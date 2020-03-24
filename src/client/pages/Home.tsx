import * as React from 'react';
import { RouteComponentProps } from 'react-router'
import { IChirp } from '../utils/interfaces'
import ChirpCard from '../components/ChirpCard';
import { Link } from 'react-router-dom'
import { FaPaperPlane } from 'react-icons/fa'



class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = {
            chirps: []
        };
    }

    async componentDidMount() {
        let res = await fetch('/api/chirps');
        let chirps = await res.json();
        chirps.reverse();
        this.setState({ chirps })
    }


    render() {
        return (
            <>
                <div>
                    <ul className="d-flex justify-content-between shadow-lg sticky-top bg-white">
                        <h4 className="text-monospace m-3">Welcome to Chirper</h4>
                        <Link className="btn btn-primary m-3" to="/NewChirp"><FaPaperPlane/> New Chirp</Link>
                    </ul>
                    <main className="container">
                        <section className="row my-2 justify-content-center">
                            <div className="col-md-8">
                                <ul className="list-group">
                                    {this.state.chirps.map(chirp => (
                                        <ChirpCard key={chirp.id} chirp={chirp} />
                                    ))}
                                </ul>
                            </div>
                        </section>
                    </main>
                </div>
            </>
        )
    }
}

interface HomeProps extends RouteComponentProps { }
interface HomeState {
    chirps: IChirp[]
}

export default Home;