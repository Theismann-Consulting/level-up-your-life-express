import React, { useState, useEffect } from 'react';
import { ButtonToolbar, Modal, Button} from 'react-bootstrap';
import NewWindow from 'react-new-window';

const GoogleModal = () => {
  const [googleShow, setGoogleShow] = useState(false);
  const [facebookShow, setFacebookShow] = useState(false);

  const googleLogin = () => {
    if(googleShow){
      return(
        <NewWindow
          url="http://localhost:3001/login/google"
        />
      )
    }
  }

  const faacebookLogin = () => {
    if(googleShow){
      return(
        <NewWindow
          url="http://localhost:3001/login/google"
        />
      )
    }
  }

  return (
    <ButtonToolbar>
      <Button onClick={() => setGoogleShow(true)}>Login with Google</Button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Button onClick={() => setFacebookShow(true)}>Login with Facebook</Button>
      {googleLogin()}
      {/* <Modal
        size="lg"
        show={googleShow}
        onHide={() => setGoogleShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewWindow
            url="http://localhost:3001/login/google"
            />
            <Frame href="http://localhost:3001/login/google" as={Button}>Continue</Frame>
        </Modal.Body>
      </Modal> */}

      <Modal
        size="lg"
        show={facebookShow}
        onHide={() => setFacebookShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Large Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal>
    </ButtonToolbar>
  );
}

export default GoogleModal;
