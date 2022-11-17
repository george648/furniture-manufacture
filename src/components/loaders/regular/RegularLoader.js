const RegularLoader = ({ classes }) => (
	<div className={`${classes || ''} d-flex justify-content-center spinner-border text-primary mx-auto`} role="status">
		<span className="sr-only" />
	</div>
)

export default RegularLoader
