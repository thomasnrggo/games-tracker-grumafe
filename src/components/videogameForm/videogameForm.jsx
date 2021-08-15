import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import {
	getConsoleCatalog,
	getDevelopersCatalog,
	getToken,
	saveNewGame,
} from '../../utils/services'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import router from 'next/router'
import Loader from '../loader/loader'

export default function VideogameForm({ type }) {
	const [developers, setDeveloper] = useState([])
	const [consoles, setConsoles] = useState([])
	const [selectedConsole, setSelectedConsole] = useState(consoles[0])
	const [selectedDeveloper, setSelectedDeveloper] = useState(developers[0])
	const [showErrors, setShowErrors] = useState(false)
	const [token, setToken] = useState('')
	const [loading, setLoading] = useState(true)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	useEffect(() => {
		getToken('user').then((token) => {
			setToken(token.token)
			getConsoleCatalog(token.token)
				.then((res) => {
					let options = []
					res.consoles.map((i) => {
						options.push({
							id: i._id,
							value: i.name,
							label: i.name,
							type: 'console',
						})
					})
					setConsoles(options)
				})
				.catch((err) => console.error(err))

			getDevelopersCatalog(token.token)
				.then((res) => {
					let options = []
					res.developers.map((dev) => {
						options.push({
							id: dev._id,
							value: dev.name,
							label: dev.name,
							type: 'dev',
						})
					})
					setDeveloper(options)
				})
				.catch((err) => console.error(err))
				.finally(() => {
					setLoading(false)
				})
		})
	}, [])

	const handleSelected = (e) => {
		e.type === 'dev'
			? setSelectedDeveloper({ ...e })
			: setSelectedConsole({ ...e })
	}

	const validateSelect = () => {
		if (!selectedConsole || !selectedDeveloper) {
			setShowErrors(true)
		} else {
			setShowErrors(false)
		}
	}

	const onSubmit = (data) => {
		validateSelect()
		let game = {
			_id: 'nrggo',
			developer: {
				_id: selectedDeveloper.id,
				name: selectedDeveloper.value,
			},
			name: data.name,
			description: data.description,
			year: data.year,
			console: {
				_id: selectedConsole.id,
				name: selectedConsole.value,
			},
		}

		if (selectedConsole && selectedDeveloper) {
			console.log('!')
			saveNewGame(token, game)
				.then((res) => {
					console.log('saveNewGame', res)
					router.push('/')
				})
				.catch((err) => {
					console.error(err)
				})
		}
	}

	if (!loading) {
		return (
			<form className="form" onSubmit={handleSubmit(onSubmit)}>
				<div className="input__group">
					<label className="label">Name:</label>
					<input
						className="input"
						name="name"
						type="text"
						placeholder="type a name"
						{...register('name', {
							minLength: {
								value: 3,
								message: 'Name has to be at least 3 letters',
							},
							required: 'This fild is required',
						})}
					/>
					<ErrorMessage
						errors={errors}
						name="name"
						render={({ message }) => <span className="error">{message}</span>}
					/>
				</div>
				<div className="input__group">
					<label className="label">year:</label>
					<input
						className="input"
						type="text"
						name="year"
						placeholder="Relase year"
						pattern="^-?[0-9]\d*\.?\d*$"
						{...register('year', {
							minLength: {
								value: 4,
								message: 'Year has to be at least 4 digits',
							},
							required: 'This fild is required',
						})}
					/>
					<ErrorMessage
						errors={errors}
						name="year"
						render={({ message }) => <span className="error">{message}</span>}
					/>
				</div>

				<div className="input__group">
					<label className="label">Platform</label>
					<Select
						options={consoles}
						classNamePrefix="select"
						onChange={(e) => handleSelected(e)}
						value={selectedConsole}
					/>
					{showErrors && !selectedConsole && (
						<span className="error">This fild is required</span>
					)}
				</div>

				<div className="input__group">
					<label className="label">Developer</label>
					<Select
						options={developers}
						classNamePrefix="select"
						onChange={(e) => handleSelected(e)}
						value={selectedDeveloper}
					/>
					{showErrors && !selectedDeveloper && (
						<span className="error">This fild is required</span>
					)}
				</div>

				<div className="input__group">
					<label className="label">description</label>
					<textarea
						className="input"
						type="text"
						placeholder="Write a message"
						rows="8"
						name="description"
						{...register('description', {
							maxLength: {
								value: 300,
								message:
									'Description to long, Use no more than 300 characters.',
							},
							required: 'This fild is required',
						})}
					/>
					<ErrorMessage
						errors={errors}
						name="description"
						render={({ message }) => <span className="error">{message}</span>}
					/>
				</div>
				<input type="submit" className="buttom" value="Save" />
			</form>
		)
	} else {
		return <Loader />
	}
}
