import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './header.module.scss'

export default function Header(props) {
	const router = useRouter()
	const { pathname } = router
	console.log(pathname)
	return (
		<header className={styles.header__container}>
			<ul className={styles.menu__container}>
				<li
					className={`${styles.menu__item} ${
						pathname === '/' && styles.active
					}`}
				>
					<Link href={'/'}>
						<a>Your games</a>
					</Link>
				</li>
				<li
					className={`${styles.menu__item} ${
						pathname === '/dashboard' && styles.active
					}`}
				>
					<Link href={'/dashboard'}>
						<a>Dashboard</a>
					</Link>
				</li>
			</ul>
		</header>
	)
}
