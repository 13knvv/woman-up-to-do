interface IPropsDeadline {
  completionDate: string
}

const Deadline = (props: IPropsDeadline) => {
  const checkDeadline = (completionDate: string) => {
    const date = new Date()
    const yy = date.getFullYear()
    const mm = date.getMonth()
    const dd = date.getDate()

    const dateNow = new Date(yy, mm, dd).getTime()
    const dateCompletion = new Date(completionDate).getTime()

    return dateCompletion <= dateNow
  }

  if (!props.completionDate) {
    return <></>
  }

  return (
    <div
      className={
        checkDeadline(props.completionDate)
          ? 'deadline deadline--red'
          : 'deadline'
      }
    >
      {new Date(props.completionDate).toLocaleDateString()}
    </div>
  )
}

export default Deadline
