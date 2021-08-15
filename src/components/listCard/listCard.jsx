import { faChevronRight, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import styles from './listCard.module.scss'
import { useRouter } from 'next/router'

let fakeImage =
	'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'

export default function ListCard({ game }) {
	const { console, description, name, year, image, developer, _id } = game
	const [isOpen, setIsOpen] = useState(false)
	const router = useRouter()

	const handleCollapsable = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className={styles.listCard__container}>
			<div className={styles.listCard__header}>
				<div className={styles.head}>
					<div className={styles.thumbnail}>
						<img
							className={styles.thumbnail}
							src={image || fakeImage}
							alt={name}
						/>
					</div>
					<div className={styles.header__title}>
						<h2 className={styles.name} onClick={() => handleCollapsable()}>
							{name || 'no title'}
						</h2>
						<h3 className={styles.year}>{year || ''}</h3>
					</div>
				</div>
				<div
					className={`${styles.trigger} ${isOpen && styles.open}`}
					onClick={() => handleCollapsable()}
				>
					<FontAwesomeIcon icon={faChevronRight} size="2x" />
				</div>
			</div>
			<div className={`${styles.listCard__content} ${isOpen && styles.open}`}>
				<div className={styles.group}>
					<div className={styles.detail__group}>
						<h5 className={styles.label}>Developer:</h5>
						<h4 className={styles.detail}>{developer.name || '-'}</h4>
					</div>
					<div className={styles.detail__group}>
						<h5 className={styles.label}>Console:</h5>
						<h4 className={styles.detail}>{console[0].name || '-'}</h4>
					</div>
				</div>
				<div className={styles.detail__group}>
					<h5 className={styles.label}>Description:</h5>
					<h4 className={styles.detail}>{description || '-'}</h4>
				</div>
				<div>
					<button
						className="buttom secundary"
						onClick={() => router.push(`/edit/${_id}`)}
					>
						<FontAwesomeIcon icon={faEdit} /> Edit
					</button>
				</div>
			</div>
		</div>
	)
}
