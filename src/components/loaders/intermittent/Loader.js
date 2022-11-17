const Loader = ({ classes }) => (
	<div className={`${classes || ''} d-flex justify-content-center intermittent spinner-border text-primary mx-auto`} style={{ width: '5em', height: '5em' }} role="status">
		<span className="sr-only" />
	</div>
)

export default Loader
