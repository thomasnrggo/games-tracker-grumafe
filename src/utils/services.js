import axios from 'axios'

const API = 'https://api-videogames.herokuapp.com'

export const getToken = async (user) => {
	let res = await axios.post(`${API}/access/get-token`, {
		name: user,
	})
	return res.data
}

export const getConsoleCatalog = async (token) => {
	let res = await axios.get(`${API}/api/consoles/catalog`, {
		headers: { Authorization: `${token}` },
	})
	return res.data
}

export const getDevelopersCatalog = async (token) => {
	let res = await axios.get(`${API}/api/developer/catalog`, {
		headers: { Authorization: `${token}` },
	})
	return res.data
}

export const getVideogames = async (token) => {
	let res = await axios.post(
		`${API}/api/videogames/search`,
		{
			filters: {},
			pagination: {
				page: 0,
				limit: 0,
			},
		},
		{
			headers: { Authorization: `${token}` },
		}
	)
	return res.data
}

export const saveNewGame = async (token, game) => {
	let res = await axios.post(`${API}/api/videogames`, game, {
		headers: { Authorization: `${token}` },
	})
	return res.data
}
