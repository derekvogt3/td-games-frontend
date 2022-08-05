import { useEffect, useState } from "react";
import "./WinLossMessage.css"
import "animate.css"

function WinLossMessage({setonWinLose, winLose}) {
  const [classes, setclasses] = useState("");

  useEffect(() => {
    const intervalIds = []
    if (winLose.type === "win") {
      setclasses("animate__animated animate__lightSpeedInRight")
      intervalIds.push(setInterval(() => {
        setclasses("")
        intervalIds.push(setTimeout(() => {
          setclasses("animate__animated animate__bounce")
        }, 100))
      }, 2000))
    } else if (winLose.type === "lose") {
      setclasses("animate__animated animate__fadeInDownBig")
      intervalIds.push(setTimeout(() => {
        setclasses("animate__animated animate__hinge")
      }, 1500))
      intervalIds.push(setInterval(() => {
        setclasses("animate__animated animate__fadeInDownBig")
        intervalIds.push(setTimeout(() => {
          setclasses("animate__animated animate__hinge")
        }, 1500))
      }, 4000))
    } else if (winLose.type === "draw") {
      setclasses("animate__animated animate__wobble")
      intervalIds.push(setInterval(() => {
        setclasses("")
        intervalIds.push(setTimeout(() => {
          setclasses("animate__animated animate__wobble")
        }, 100))
      }, 2000))
    }

    return(() => intervalIds.forEach(id => clearInterval(id)))
  }, []);
  

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
              <h1 className={classes}>{winLose.message.slice(4)}</h1>
            </div>
          </div>
        ) : (
          null
        )
      }
      {
        winLose.type === "lose" ? (
          <div id="win-lose-box" onClick={noticedWinLose} style={{backgroundColor: "rgba(185, 72, 91, 0.5)"}}>
            <div id="lose-message">
              <h1 className="animate__animated animate__fadeInDownBig">{winLose.message.slice(0, 4)}</h1>
              <h1 className={classes}>{winLose.message.slice(4)}</h1>
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
              <h1 className={classes}>{winLose.message}</h1>
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