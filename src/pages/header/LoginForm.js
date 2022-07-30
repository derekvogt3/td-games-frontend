import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css"

function LoginForm({loginFormPackage}) {
  const {currentUser, setCurrentUser, showFriends, setShowFriends} = loginFormPackage

  const [formInput, setFormInput] = useState({
    username: "",
    password: ""
  })

  let navigate = useNavigate()

  function controlFormInput(e) {
    const {name, value} = e.target
    setFormInput({
      ...formInput,
      [name]: value
    })
  }

  function checkUserExist(name) {
    return fetch(`http://localhost:9292/user_check/${name}`)
    .then(res => res.json())
  }

  function checkPassword(name, pw) {
    return fetch(`http://localhost:9292/password_check?name=${name}&pw=${pw}`)
    .then(res => res.json())
  }

  // ------ use to test encryption ------
  // var input_str = "itmakesense";
  // console.log("Input String: "+input_str);
  // console.log("Hash Value: " + stringToHashConversion(input_str));

  function onLogin(e) {
    e.preventDefault()
    checkUserExist(formInput.username.toLowerCase())
      .then(result => {
        if (result.exist) {
          console.log(result)
          checkPassword(formInput.username.toLowerCase(), stringToHashConversion(formInput.password).toString())
            .then(match => {
              if (match.matched) {
                console.log("user logged in")
                fetch(`http://localhost:9292/users/${result.id}`)
                .then(res => res.json())
                .then(data => {
                  setCurrentUser(data)
                  setFormInput({username: "", password: ""})
                })
                .catch(console.error)
              } else {
                alert("Wrong username or password")
              }
            })
        } else {
          alert("Wrong username or password")
        }
      })
  }

  function onLogout() {
    setCurrentUser({})
    navigate("/")
    console.log("user logged out")
  }

  function onSignUp() {
    const name = formInput.username.toLowerCase()
    
    checkUserExist(name)
      .then(result => {
        if (result.exist) {
          alert("username already taken")
        } else {
          if(name.match(/^[\w]*$/g)) {
            if (name.match(/^[A-Za-z]/g)) {
              if (name.match(/^.{3,18}$/g)) {
                console.log("username ok")
    
                //check if password meet all requirement
                if (formInput.password.match(/^[\w\d~!@#$%^&*-=+?]+$/g)) {
                  if (formInput.password.match(/^.{6,18}$/g)) {
                    console.log("password ok")
                    const password = stringToHashConversion(formInput.password).toString()
                    // console.log(password)
                    fetch(`http://localhost:9292/users`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                      },
                      body: JSON.stringify({
                        username: name,
                        password: password
                      })
                    })
                    .then(res => res.json())
                    .then(data => {
                      setCurrentUser(data)
                      setFormInput({
                        username: "",
                        password: ""
                      })
                      console.log(data)
                    })
                    .catch(console.error)
                  } else {
                    alert("password need to be between 6 - 18 charaters")
                  }
                } else {
                  alert("password can only include alphabet letters, numbers and _~!@#$%^&*-=+?, cannot have space")
                }
              } else {
                alert("username need to be between 3 - 18 charaters")
              }
            } else {
              alert("username must start with letter")
            }
          } else {
            alert("username can only include alphabet letters, numbers and '_', cannot have space")
          }
        }
      })
  }

  // conversts to 32bit integer
  function stringToHashConversion(string) {
    var hashVal = 0;
    if (string.length == 0) return hashVal;
    for (let i = 0; i < string.length; i++) {
    let char = string.charCodeAt(i);
    hashVal = ((hashVal << 5) - hashVal) + char;
    hashVal = hashVal & hashVal;
      }
    return hashVal;
  }

  return (
    <div id="login-status">
      {currentUser.username ?
        ( 
          <div id="user-menu">
            <div id="logout">
              <h3>Hi {currentUser.username.slice(0, 1).toUpperCase()}{currentUser.username.slice(1)}</h3>
              <button id="logout-btn" onClick={onLogout} >Logout</button>
            </div>
            <div id="user-options">
              <div onClick={() => setShowFriends(!showFriends)}>
                <p>Friends</p>
              </div>
              <div>
                <p>Chats</p>
              </div>
            </div>
          </div>
        ) : (
          <form id="login-form" onSubmit={onLogin} >
            <div className="input-holder">
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" placeholder="Username" value={formInput.username} onChange={controlFormInput} required />
            </div>
            <div className="input-holder">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password"
              placeholder='Password' value={formInput.password} onChange={controlFormInput} required />
            </div>
            <div className="form-buttons-holder">
              <input id="login-btn" type="submit" value="Login" />
              <input id="signup-btn" type="button" value="Sign up" onClick={onSignUp} />
            </div>
          </form>
        ) 
      }
    </div>
  )
}

export default LoginForm