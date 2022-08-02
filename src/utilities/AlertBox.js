import "./AlertBox.css"

function AlertBox({setOnAlert, alert}) {

  function noticedAlert(e){
    e.target.style.pointerEvents = "none"
    setOnAlert(false)
  }

  return (
    <div id="alert-box" onClick={noticedAlert}>
      {
        alert.type == "alert" ? (
          <div id="alert-message">
            <h1>{alert.message}</h1>
          </div>
        ) : (
          null
        )
      }
      {
        alert.type == "winner" ? (
          <div id="alert-message" style={{backgroundColor: "green"}}>
            <h1>{alert.message}</h1>
          </div>
        ) : (
          null
        )
      }
    </div>
  )
}

export default AlertBox