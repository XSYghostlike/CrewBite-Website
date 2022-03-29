import React, {useEffect, Fragment} from "react";
import Amplify, {Hub} from "aws-amplify";
import {Authenticator} from "@aws-amplify/ui-react";
import {Container} from "react-bootstrap";

import Navigation from "./components/Navigation.js";
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

function App() {
  useEffect(() => {
    Hub.listen("auth", ({payload: {event, data}}) => {
      switch (event) {
        case "signIn":
        case "cognitoHostedUI":
        case "signOut":
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          console.log("Sign in failure", data);
          break;
        default:
          break;
      }
    });
  }, []);

  return (
    <Fragment>
      <Navigation/>
      <Container fluid>
        <br />
            <Authenticator>
                {({ signOut, user }) => (
                    <>
                        <h1 style={{textAlign: "center"}}>Hello {user.username}</h1>
                        <MainRequest/>
                        <div style={{textAlign: "center"}}>
                            <button onClick={signOut}>Sign out</button>
                        </div>
                    </>
                )}
            </Authenticator>
      </Container>
    </Fragment>
  );
}

export default App;
