import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/layout/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { getToken, getVideogames, getConsoleCatalog } from '../utils/services'
import { RadialChart } from 'react-vis'
import LoaderComponent from '../components/loader/loader'

const myData = [
	{
		label: 'Other',
		angle: 21,
	},
	{
		label: 'Playstation VITA',
		angle: 2,
	},
	{
		label: 'New Nintendo 3DSXL',
		angle: 6,
	},
	{
		label: 'Nintendo Switch',
		angle: 9,
	},
	{
		label: 'Playstation VITA',
		angle: 0,
	},
	{
		label: 'Xbox One',
		angle: 6,
	},
]

export default function Dashboard(props) {
	const router = useRouter()
	const [loading, setLoafing] = useState(true)
	const [grapData, setGrapData] = useState([])

	let DATA = [
		{ label: 'Playstation 4', angle: 0, color: 'RoyalBlue' },
		{ label: 'New Nintendo 3DSXL', angle: 0, color: 'WhiteSmoke' },
		{ label: 'Nintendo Switch', angle: 0, color: 'Crimson' },
		{ label: 'Playstation VITA', angle: 0, color: 'DarkSlateBlue' },
		{ label: 'Xbox One', angle: 0, color: 'GreenYellow' },
	]

	useEffect(() => {
		getToken('anthony')
			.then((res) => {
				getConsoleCatalog(res.token)
					.then((res) => {
						console.log('consoles', res)
					})
					.catch((err) => console.error(err))

				getVideogames(res.token)
					.then((res) => {
						let data = res.videogames.filter((game) => game.name)

						data.forEach((game) => {
							let i = DATA.findIndex(
								(group) => group.label === game.console[0].name
							)
							DATA[i].angle = DATA[i].angle + 1
							setGrapData([...DATA])
						})

						console.log('after', DATA)
						setLoafing(false)
					})
					.catch((err) => {
						console.error(err)
					})
			})
			.catch((err) => console.error(err))
	}, [1])

	return (
		<Layout>
			<div className="container">
				<div className="section__header">
					<FontAwesomeIcon
						icon={faChevronLeft}
						onClick={() => router.push('/')}
					/>
					<h1>Dashboard</h1>
				</div>
				{loading ? (
					<LoaderComponent />
				) : (
					<>
						<div className="grah__container">
							<div className="legends__container">
								{grapData.map((item) => {
									return (
										<div className="legend__container">
											<div
												className="legend"
												style={{ background: `${item.color}` }}
											/>
											<div className="description">
												<h3>{item.label}</h3>
												<span>{item.angle}</span>
											</div>
										</div>
									)
								})}
							</div>
							<div>
								<RadialChart
									data={grapData}
									width={300}
									height={300}
									labelsRadiusMultiplier={1}
									labelsStyle={{
										fontSize: 20,
									}}
									radius={110}
									innerRadius={150}
									// labelsAboveChildren
									colorType="literal"
									// showLabels
								/>
							</div>
						</div>
					</>
				)}
			</div>
		</Layout>
	)
}
