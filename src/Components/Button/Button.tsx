interface IPropsButton {
  type: string
  children: any
  onClick: () => void
}

const Button = (props: IPropsButton) => {
  let color

  switch (props.type) {
    case 'back':
      color = {
        backgroundColor: '#fca7a7',
      }
      break
    case 'save':
      color = {
        backgroundColor: '#70f386b0',
      }
      break
    case 'edit':
      color = {
        backgroundColor: '#70d9f3b0',
      }
      break
  }

  const onClickButton = () => {
    props.onClick()
  }

  return (
    <button className={'button'} onClick={onClickButton} style={color} >
      {props.children}
    </button>
  )
}

export default Button
