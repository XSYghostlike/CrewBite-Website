import React, {useEffect, Fragment, useState} from "react";
import Amplify, {Auth, Hub} from "aws-amplify";

import Navigation from "./components/Navigation.js";
import MainRequest from "./components/MainRequest.js";
import "./App.css";

Amplify.configure({
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_vetfoopAH",
    userPoolWebClientId: "7hd9hk7q7e0dkgg6q6sfrvb4nt",
    oauth: {
      domain: "crewbite.auth.us-east-1.amazoncognito.com",
      scope: ["email", "phone", "aws.cognito.signin.user.admin", "openid"],
      redirectSignIn: "https://www.crewbite.io",
      redirectSignOut: "https://www.crewbite.io",
      responseType: "code"
    }
  },
  API: {
    endpoints: [
      {
        name: "CrewbiteAPI",
        endpoint: "https://api.crewbite.io/"
      }
    ]
  }
});

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen("auth", ({payload: {event, data}}) => {
      switch (event) {
        case "signIn":
        case "cognitoHostedUI":
          getUser().then(userData => setUser(userData));
          break;
        case "signOut":
          setUser(null);
          break;
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          console.log("Sign in failure", data);
          break;
        default:
          break;
      }
    });

    getUser().then(userData => setUser(userData));
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
        .then(userData => userData)
        .catch(() => console.log('Not signed in'));
  }

  return (
      <Fragment>
        <Navigation user={user} />
        <p>Username: {user ? JSON.stringify(user.username) : 'None'}</p>
        {user ? (
            <MainRequest/>
        ) : (
            <div style={{textAlign: "center"}}>
              <button onClick={() => Auth.federatedSignIn()}>Sign In</button>
            </div>
        )}
      </Fragment>
  );
}

export default App;
