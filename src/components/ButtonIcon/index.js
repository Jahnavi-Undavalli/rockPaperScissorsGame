import './index.css'

const ButtonIcon = props => {
  const {details, onSelectedButton} = props
  const {id, imageUrl} = details
  const testids = id.toLowerCase()
  const buttonClicked = () => {
    onSelectedButton(id)
  }
  return (
    <div className="each-icon">
      <button
        data-testid={`${testids}Button`}
        onClick={buttonClicked}
        type="button"
      >
        <img alt={id} src={imageUrl} />
      </button>
    </div>
  )
}

export default ButtonIcon
