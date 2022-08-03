import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUrl } from "../../utilities/GlobalVariables";
import "./LoginForm.css";

function LoginForm({ loginFormPackage }) {
  const {
    currentUser,
    setCurrentUser,
    setShowFriends,
    setShowChats,
    setShowMessages,
    showAlert,
    setShowSettings,
  } = loginFormPackage;

  const [formInput, setFormInput] = useState({
    username: "",
    password: "",
  });

  let navigate = useNavigate();

  function controlFormInput(e) {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  }

  // ------------------------------------------------- logic for login / logout ------------------------------------------------

  function checkUserExist(name) {
    return fetch(`${fetchUrl}/user_check/${name}`).then((res) => res.json());
  }

  function checkPassword(name, pw) {
    return fetch(`${fetchUrl}/password_check?name=${name}&pw=${pw}`).then(
      (res) => res.json()
    );
  }

  // ------ use to test encryption ------
  // var input_str = "itmakesense";
  // console.log("Input String: "+input_str);
  // console.log("Hash Value: " + stringToHashConversion(input_str));

  // conversts to 32bit integer
  function stringToHashConversion(string) {
    var hashVal = 0;
    if (string.length === 0) return hashVal;
    for (let i = 0; i < string.length; i++) {
      let char = string.charCodeAt(i);
      hashVal = (hashVal << 5) - hashVal + char;
      hashVal = hashVal & hashVal;
    }
    return hashVal;
  }

  function onLogin(e) {
    e.preventDefault();
    checkUserExist(formInput.username.toLowerCase()).then((result) => {
      if (result.exist) {
        // console.log(result)
        // if (!result.is_login) {
        checkPassword(
          formInput.username.toLowerCase(),
          stringToHashConversion(formInput.password).toString()
        ).then((match) => {
          if (match.matched) {
            console.log("user logged in");
            fetch(`${fetchUrl}/users/${result.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                is_login: true,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                setCurrentUser(data);
                sessionStorage.setItem("user", JSON.stringify(data));
                setFormInput({ username: "", password: "" });
              })
              .catch(console.error);
          } else {
            showAlert({ type: "alert", message: "Wrong username or password" });
          }
        });
        // } else {
        //   alert("User already logged in!");
        // }
      } else {
        showAlert({ type: "alert", message: "Wrong username or password" });
      }
    });
  }

  function onLogout() {
    fetch(`${fetchUrl}/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        is_login: false,
      }),
    })
      .then(() => {
        setCurrentUser({});
        setShowFriends(false);
        setShowChats(false);
        setShowMessages(false);
        navigate("/");
        console.log("user logged out");
        sessionStorage.clear("user");
      })
      .catch(console.error);
  }

  // ----------------------------------------------------------- logic for sign up ---------------------------------------------------------
  function onSignUp() {
    const name = formInput.username.toLowerCase();

    checkUserExist(name).then((result) => {
      if (result.exist) {
        alert("username already taken");
      } else {
        if (name.match(/^[\w]*$/g)) {
          if (name.match(/^[A-Za-z]/g)) {
            if (name.match(/^.{3,18}$/g)) {
              console.log("username ok");

              //check if password meet all requirement
              if (formInput.password.match(/^[\w\d~!@#$%^&*-=+?]+$/g)) {
                if (formInput.password.match(/^.{6,18}$/g)) {
                  console.log("password ok");
                  const password = stringToHashConversion(
                    formInput.password
                  ).toString();
                  // console.log(password)
                  fetch(`${fetchUrl}/users`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                    },
                    body: JSON.stringify({
                      username: name,
                      password: password,
                    }),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      setCurrentUser(data);
                      sessionStorage.setItem("user", JSON.stringify(data));
                      setFormInput({
                        username: "",
                        password: "",
                      });
                      console.log(data);
                    })
                    .catch(console.error);
                } else {
                  showAlert({
                    type: "alert",
                    message: "password need to be between 6 - 18 charaters",
                  });
                }
              } else {
                showAlert({
                  type: "alert",
                  message:
                    "password can only include alphabet letters, numbers and _~!@#$%^&*-=+?, cannot have space",
                });
              }
            } else {
              showAlert({
                type: "alert",
                message: "username need to be between 3 - 18 charaters",
              });
            }
          } else {
            showAlert({
              type: "alert",
              message: "username must start with letter",
            });
          }
        } else {
          showAlert({
            type: "alert",
            message:
              "username can only include alphabet letters, numbers and '_', cannot have space",
          });
        }
      }
    });
  }

  // ----------------------------------------------------------------------------------------------------------------------------------

  function showFriendList() {
    setShowFriends((show) => !show);
    setShowChats(false);
    setShowMessages(false);
    setShowSettings(false);
  }

  function showChatList() {
    setShowChats((show) => !show);
    setShowFriends(false);
    setShowMessages(false);
    setShowSettings(false);
  }

  function showSettings() {
    setShowSettings((show) => !show);
    setShowFriends(false);
    setShowMessages(false);
    setShowChats(false);
  }

  return (
    <div id="login-status">
      {currentUser.username ? (
        <div id="user-menu">
          <div id="logout">
            <h3>
              Hi {currentUser.username.slice(0, 1).toUpperCase()}
              {currentUser.username.slice(1)}
            </h3>
            <button id="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
          <div id="user-options">
            <div id="show-friends" onClick={showFriendList}>
              <p>Friends</p>
            </div>
            <div id="show-chats" onClick={showChatList}>
              <p>Chats</p>
            </div>
            <div id="show-chats" onClick={showSettings}>
              <p>Settings</p>
            </div>
          </div>
        </div>
      ) : (
        <form id="login-form" onSubmit={onLogin}>
          <div className="input-holder">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={formInput.username}
              onChange={controlFormInput}
              required
            />
          </div>
          <div className="input-holder">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formInput.password}
              onChange={controlFormInput}
              required
            />
          </div>
          <div className="form-buttons-holder">
            <input id="login-btn" type="submit" value="Login" />
            <input
              id="signup-btn"
              type="button"
              value="Sign up"
              onClick={onSignUp}
            />
          </div>
        </form>
      )}
    </div>
  );
}

export default LoginForm;
