import * as React from 'react';
import { Link } from 'react-router-dom'
import { FaUser, FaEdit, FaPaperPlane, FaCommentDots } from 'react-icons/fa'
import ChirpCard from '../components/chirpCard'

const Home: React.FC<HomeProps> = () => {

	const [selectedId, setSelectedId] = React.useState<string>('0');
	const [users, setUsers] = React.useState<{ id: number; name: string; }[]>([]);
	const [chirps, setChirps] = React.useState<IChirp[]>([]);


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

	React.useEffect(() => {
		(async function () {
			const res = await fetch('/api/chirps');
			const chirps = await res.json();
			setChirps(chirps)
		})()
	}, [])

	return (
		<div>
			<ul className="d-flex justify-content-between shadow-lg sticky-top bg-white">
				<h4 className="text-monospace m-3">Welcome to Chirper</h4>
				<Link className="btn btn-primary m-3" to="/NewChirp"><FaPaperPlane /> New Chirp</Link>
			</ul>
			<main className="container">
				<section className="row mt-2">
					<div className="col-md-4">
						<form className="form-group p-3 border shadow">
							<select className="form-control" value={selectedId} onChange={handleSelectedChange}>
								<option value="0" disabled >Select User</option>
								{users.map(user => <option key={`${user.id}-${user.name}`} value={user.id}>{user.name}</option>)}
							</select>
							<button onClick={submit} className="btn-primary mt-3 mx-auto btn-block w-75">Select It</button>
						</form>
					</div>
					<div className="col-md-8">
						<li className="list-group">
							{chirps.map(chirp => (
								<ChirpCard key={chirp.id} chirp={chirp} />))}
						</li>
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

interface HomeProps {

}

export default Home;