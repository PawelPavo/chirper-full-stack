import * as React from 'react';
import { IChirp } from '../pages/Home'
import { Link } from 'react-router-dom'
import { FaUser, FaEdit } from 'react-icons/fa'

const ChirpCard: React.FC<ChirpCardProps> = props => {

    return (
        <div className="card my-2 shadow">
            <div className="card-header">
                <div className="row">
                    <div className="col-1 align-self-center text-textSpecial">
                        <FaUser />
                    </div>
                    <div className="col-11 align-self-end text-textSpecial">{props.chirp.name}</div>
                </div>
                <div className="card-footer shadow">
                    <div className="col-10 align-self-center">
                        {props.chirp.text}
                    </div>
                </div>
                <div className="mt-3 text-right">
                    <Link className="btn btn-outline-primary btn-sm" to={`${props.chirp.id}/editChirp`}><FaEdit/> Edit Chirp</Link>
                </div>
            </div>
        </div>
    )
}

interface ChirpCardProps {
    chirp: IChirp
}

export default ChirpCard;