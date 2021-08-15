import React from 'react'
import styles from './layout.module.scss'

export default function layout({ children }) {
	return <div className={styles.app__container}>{children}</div>
}
