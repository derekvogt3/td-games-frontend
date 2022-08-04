import "./WinLossMessage.css"
import "animate.css"

function WinLossMessage({setonWinLose, winLose}) {

  function noticedWinLose(e){
    e.target.style.pointerEvents = "none"
    setonWinLose(false)
  }

  return (
    <>
      {
        winLose.type === "win" ? (
          <div id="win-lose-box" onClick={noticedWinLose} style={{backgroundColor: "rgb(102, 161, 102, 0.5)"}}>
            <div id="win-message">
              <h1 className="animate__animated animate__lightSpeedInLeft">{winLose.message.slice(0, 4)}</h1>
              <h1 className="animate__animated animate__lightSpeedInRight">{winLose.message.slice(4)}</h1>
            </div>
          </div>
        ) : (
          null
        )
      }
      {
        winLose.type === "lose" ? (
          <div id="win-lose-box" onClick={noticedWinLose} style={{backgroundColor: "rgba(185, 72, 91, 0.5)"}}>
            <div id="lose-message" className="animate__animated animate__fadeInDownBig">
              <h1>{winLose.message.slice(0, 4)}</h1>
              <h1 className="animate__animated animate__hinge">{winLose.message.slice(4)}</h1>
            </div>
          </div>
        ) : (
          null
        )
      }
      {
        winLose.type === "draw" ? (
          <div id="win-lose-box" onClick={noticedWinLose} style={{backgroundColor: "rgba(76, 111, 207, 0.5)"}}>
            <div id="draw-message" className="animate__animated animate__flip">
              <h1>{winLose.message}</h1>
            </div>
          </div>
        ) : (
          null
        )
      }
    </>
  )
}

export default WinLossMessage