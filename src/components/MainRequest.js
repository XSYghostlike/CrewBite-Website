// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, {useState} from "react";
import {Card, Row, Col, Button, Modal, Spinner} from "react-bootstrap";
import {API} from "aws-amplify";

function MainRequest(props) {
  const [json, setJson] = useState(null);
  const [show, setShow] = useState(false);

  async function handleSubmitPublic() {
    setShow(true);
    const response = await getPublicData();
    setJson(response);
  }

  async function handleSubmitAuthorized() {
    setShow(true);
    const response = await getAuthorizedData();
    setJson(response);
  }

  function handleClose() {
    setJson(null);
    setShow(!show);
  }

  function getPublicData() {
    const apiName = "CrewbiteAPI";
    const path = "/this-is-a-public-api";
    const myInit = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    };
    return API.get(apiName, path, myInit);
  }

  function getAuthorizedData() {
    const apiName = "CrewbiteAPI";
    const path = "/this-is-an-authorized-api";
    const myInit = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: props.token
      }
    };
    return API.get(apiName, path, myInit);
  }

  return (
    <>
      <Row>
        <Col sm={3}></Col>
        <Col sm={6}>
          <Card style={{width: "100%"}}>
            <Card.Body>
              <Card.Title>
                <h3 style={{textAlign: "center"}}>Hello </h3>
              </Card.Title>
              <Row>
                <Col sm={2}></Col>
                <Col sm={8}>
                  {" "}
                  <Button
                    variant="outline-success"
                    onClick={handleSubmitPublic}
                    block
                  >
                    Call my Public API
                  </Button>
                </Col>
                <Col sm={2}> </Col>
              </Row>
              <Row>
                <Col sm={2}></Col>
                <Col sm={8}>
                  {" "}
                  <Button
                      variant="outline-success"
                      onClick={handleSubmitAuthorized}
                      block
                  >
                    Call my Authorized API
                  </Button>
                </Col>
                <Col sm={2}> </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={3}></Col>
      </Row>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <h3 style={{textAlign: "center"}}>Response</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {json ? (
            <p>Here is the response: {json.message}</p>
          ) : (
            <h3 style={{textAlign: "center"}}>
              <Spinner animation="border" variant="primary" />
            </h3>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MainRequest;
