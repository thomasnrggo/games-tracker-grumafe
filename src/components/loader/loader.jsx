import React from 'react'
import Loader from 'react-loader-spinner'

export default function LoaderComponent(props) {
	return (
		<div className="loader__container">
			<Loader type="Rings" color="#ee5178" height={100} width={100} />
		</div>
	)
}
