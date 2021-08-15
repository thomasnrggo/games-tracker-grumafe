import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/layout/layout'
import VideogameForm from '../components/videogameForm/videogameForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default function NewVideogame() {
	const router = useRouter()
	return (
		<Layout>
			<div className="container">
				<div className="section__header">
					<FontAwesomeIcon
						icon={faChevronLeft}
						onClick={() => router.push('/')}
					/>
					<h1>Create Videogame</h1>
				</div>
				<VideogameForm />
			</div>
		</Layout>
	)
}
