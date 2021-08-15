import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout/layout'
import ListCard from '../components/listCard/listCard'
import { getToken, getVideogames } from '../utils/services'
import { useRouter } from 'next/router'

export default function Home() {
	const router = useRouter()
	const [token, setToken] = useState('')
	const [videogames, setVideogames] = useState([])
	const [query, setQuery] = useState('')
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		getToken('anthony')
			.then((res) => {
				localStorage.setItem('token', res.token)
				setToken(res.token)
				getVideogames(res.token)
					.then((res) => {
						setVideogames(res.videogames)
						setLoading(false)
					})
					.catch((err) => {
						console.error(err)
					})
			})
			.catch((err) => {
				console.error(err)
			})
	}, [])

	const handleQueryChange = (e) => {
		setQuery(e.target.value)
	}

	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Layout>
				<div className="container">
					<div className="section__header between">
						<h1>Your games</h1>
						<button onClick={() => router.push('/new')} className="buttom">
							Add game
						</button>
					</div>
					<div className="input__group">
						<input
							className="input"
							placeholder="Search by name, year, developer, o console"
							value={query}
							onChange={(e) => handleQueryChange(e)}
						/>
					</div>

					{/* //TODO: add loading */}

					{loading ? (
						<h2>Loading</h2>
					) : (
						<>
							{videogames.length >= 1 &&
								videogames
									.filter((game) => {
										if (query === null) {
											return game
										} else if (
											(game.name &&
												game.name
													.toLowerCase()
													.includes(query.toLowerCase())) ||
											(game.year &&
												game.year
													.toLowerCase()
													.includes(query.toLowerCase())) ||
											(game.developer &&
												game.developer.name
													.toLowerCase()
													.includes(query.toLowerCase())) ||
											(game.console.length >= 1 &&
												game.console[0].name
													.toLowerCase()
													.includes(query.toLowerCase()))
										) {
											return game
										}
									})
									.map((game) => <ListCard key={game._id} game={game} />)}
						</>
					)}
				</div>
			</Layout>
		</div>
	)
}