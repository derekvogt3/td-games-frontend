import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/LoginForm.css"

function LoginForm({users, usersList, currentUser, setCurrentUser}) {
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
  console.log(usersList)

  function onLogin(e) {
    e.preventDefault()
    if (usersList[formInput.username.toLowerCase()]) {
      console.log(usersList[formInput.username.toLowerCase()])
      // if (usersList[formInput.username.toLowerCase()] === stringToHashConversion(formInput.password).toString()) {
      if (usersList[formInput.username.toLowerCase()] === formInput.password) {
        console.log("user logged in")
        const id = users.find(user => user.username === formInput.username.toLowerCase()).id
        fetch(`http://localhost:9292/users/${id}`)
        .then(res => res.json())
        .then(data => {
          setCurrentUser(data)
          setFormInput({username: "", password: ""})
        })
        .catch(console.error)
      } else {
        alert("Wrong username or password")
      }
    } else {
      alert("Wrong username or password")
    }
  }

  function onLogout() {
    setCurrentUser({})
    navigate("/")
  }

  function onSignUp() {
    const name = formInput.username.toLowerCase()

    //check if username meet all requirement
    if (usersList[name]) {
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
                fetch(`http://localhost:3000/users`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                  },
                  body: JSON.stringify({
                    username: name,
                    password: password,
                    favorited: []
                  })
                })
                .then(res => res.json())
                .then(data => {
                  setCurrentUser(data)
                  navigate("/favorited")
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
          <div id="logout">
            <h3>Hi {currentUser.username.slice(0, 1).toUpperCase()}{currentUser.username.slice(1)}</h3>
            <button className="btn" onClick={onLogout} >Logout</button>
          </div>
        ) : (
          <form id="login-form" onSubmit={onLogin} >
            <div>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" placeholder="Username" value={formInput.username} onChange={controlFormInput} required />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password"
              placeholder='Password' value={formInput.password} onChange={controlFormInput} required />
            </div>
            <div>
              <input className="btn" type="submit" value="Login" />
              <input className="btn" type="button" value="Sign up" onClick={onSignUp} />
            </div>
          </form>
        ) 
      }
    </div>
  )
}

export default LoginForm