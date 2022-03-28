import React, {useEffect, useState, Fragment} from "react";
import Amplify, {Auth, Hub} from "aws-amplify";
import {Container} from "react-bootstrap";

import Navigation from "./components/Navigation.js";
import FederatedSignIn from "./components/FederatedSignIn.js";
import MainRequest from "./components/MainRequest.js";
import "./App.css";

Amplify.configure({
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_vetfoopAH",
    userPoolWebClientId: "7hd9hk7q7e0dkgg6q6sfrvb4nt",
    oauth: {
      domain: "crewbite-temp.auth.us-east-1.amazoncognito.com",
      scope: ["email", "openid", "aws.cognito.signin.user.admin", "openid"],
      redirectSignIn: "https://dev.demr822tbuwhv.amplifyapp.com",
      redirectSignOut: "https://dev.demr822tbuwhv.amplifyapp.com",
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

const federatedIdName = "Google";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    Hub.listen("auth", ({payload: {event, data}}) => {
      switch (event) {
        case "signIn":
        case "cognitoHostedUI":
          setToken("grating...");
          getToken().then(userToken => setToken(userToken.idToken.jwtToken));
          break;
        case "signOut":
          setToken(null);
          break;
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          console.log("Sign in failure", data);
          break;
        default:
          break;
      }
    });
  }, []);

  function getToken() {
    return Auth.currentSession()
      .then(session => session)
      .catch(err => console.log(err));
  }

  return (
    <Fragment>
      <Navigation token={token} />
      <Container fluid>
        <br />
        {token ? (
          <MainRequest token={token} />
        ) : (
          <FederatedSignIn federatedIdName={federatedIdName} />
        )}
      </Container>
    </Fragment>
  );
}

export default App;
