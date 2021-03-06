import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout/layout'
import VideogameForm from '../../components/videogameForm/videogameForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { getVideogameById, getToken } from '../../utils/services'

export default function EditGame(props) {
	const router = useRouter()

	return (
		<Layout>
			<div className="container">
				<div className="section__header">
					<FontAwesomeIcon
						icon={faChevronLeft}
						onClick={() => router.push('/')}
					/>
					<h1>Edit Videogame</h1>
				</div>
				<VideogameForm type="edit" />
			</div>
		</Layout>
	)
}
