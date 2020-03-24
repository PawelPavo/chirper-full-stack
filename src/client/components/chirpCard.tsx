import * as React from 'react';
import { IChirp } from '../utils/interfaces'
import { Link } from 'react-router-dom'
import { FaUser, FaEdit } from 'react-icons/fa'

const ChirpCard: React.FC<ChirpCardProps> = props => {

    return (
        <div className="card my-2 shadow border-primary">
            <div className="card-header">
                <div className="row">
                    <div className="col-1 align-self-center mb-2 text-primary">
                        <FaUser />
                    </div>
                    <h5 className="col-11 align-self-end text-primary">{props.chirp.name}</h5>
                </div>
                <div className="card-footer shadow">
                    <div className="col-10 align-self-center">
                        {props.chirp.text}
                    </div>
                </div>
                <div className="mt-3 text-right">
                    <Link className="btn btn-outline-primary btn-sm" to={`${props.chirp.id}/details`}><FaEdit/> Edit Chirp</Link>
                </div>
            </div>
        </div>
    )
}

interface ChirpCardProps {
    chirp: IChirp
}

export default ChirpCard;

