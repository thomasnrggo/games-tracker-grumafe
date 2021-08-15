import React, { useEffect, useState, useMemo } from 'react'
import Head from 'next/head'
import Layout from '../components/layout/layout'
import ListCard from '../components/listCard/listCard'
import { getToken, getVideogames } from '../utils/services'
import { useRouter } from 'next/router'
import ReactPaginate from 'react-paginate'
import Select from 'react-select'
import Loader from '../components/loader/loader'

const options = [
	{ value: '4', label: '4' },
	{ value: '8', label: '8' },
	{ value: '16', label: '16' },
]

export default function Home() {
	const router = useRouter()
	const [query, setQuery] = useState('')
	const [loading, setLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(0)
	const [PageSize, setPageSize] = useState(options[2].value)
	const [pageCount, setPageCount] = useState(0)
	const [selectedPageSize, setSelectedPageSize] = useState(options[2])
	const [data, setData] = useState([])

	useEffect(() => {}, [data, query, selectedPageSize])

	const handleQueryChange = (e) => {
		setQuery(e.target.value)
	}

	const handleSelectOnChange = (e) => {
		setPageSize(parseInt(e.value))
		setSelectedPageSize({ value: e.value, label: e.label })
	}

	const handleData = useMemo(() => {
		getToken('anthony')
			.then((res) => {
				getVideogames(res.token)
					.then((res) => {
						let removeEmpty = res.videogames.filter((game) => game.name)
						setPageCount(removeEmpty.length / PageSize)

						const firstPageIndex = currentPage * PageSize
						const lastPageIndex = firstPageIndex + PageSize
						let filterData = removeEmpty.filter((game) => {
							if (query === null) {
								return game
							} else if (
								(game.name &&
									game.name.toLowerCase().includes(query.toLowerCase())) ||
								(game.year &&
									game.year.toLowerCase().includes(query.toLowerCase())) ||
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
						let data = filterData.slice(firstPageIndex, lastPageIndex)
						setData(data)
					})
					.catch((err) => {
						console.error(err)
					})
					.finally(() => {
						setTimeout(() => {
							setLoading(false)
						}, 1000)
					})
			})
			.catch((err) => {
				console.error(err)
			})
	}, [currentPage, PageSize, query, selectedPageSize])

	return (
		<div>
			<Head>
				<title>Your game list</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Layout>
				<div className="container">
					<div className="section__header between">
						<h1>Your games</h1>
						<div className=" xs__fixed">
							<button onClick={() => router.push('/new')} className="buttom">
								Add game
							</button>
						</div>
					</div>
					<div className="input__group">
						<input
							className="input"
							placeholder="Search by name, year, developer, o console"
							value={query}
							onChange={(e) => handleQueryChange(e)}
						/>
						<div className="divider" />
					</div>

					{/* //TODO: add loading */}

					{loading ? (
						<Loader />
					) : (
						<>
							<section className="list__container">
								{data.length >= 1 &&
									data.map((game) => <ListCard key={game._id} game={game} />)}
							</section>
							<footer className="footer fixed">
								<ReactPaginate
									previousLabel={'previous'}
									nextLabel={'next'}
									breakLabel={'...'}
									breakClassName={'page__container'}
									pageCount={pageCount}
									marginPagesDisplayed={1}
									pageRangeDisplayed={2}
									onPageChange={({ selected }) => setCurrentPage(selected)}
									containerClassName={'pagination__container'}
									activeClassName={'active'}
									pageClassName={'page__container'}
									previousClassName={'change__page'}
									nextClassName={'change__page'}
								/>
								<Select
									options={options}
									classNamePrefix="select"
									onChange={(e) => handleSelectOnChange(e)}
									value={selectedPageSize}
								/>
							</footer>
						</>
					)}
				</div>
			</Layout>
		</div>
	)
}
