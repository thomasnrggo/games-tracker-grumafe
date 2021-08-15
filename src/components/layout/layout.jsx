import React from 'react'
import styles from './layout.module.scss'
import Header from '../header/header'

export default function layout({ children }) {
	return (
		<div className={styles.app__container}>
			<Header />
			{children}
		</div>
	)
}
