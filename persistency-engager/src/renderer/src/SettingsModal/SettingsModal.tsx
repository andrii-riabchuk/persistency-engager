import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

import './ModalShit.css'

export function SettingsModal({ activityName, setActivityName }) {
  const [show, setShow] = useState(false)
  let [draftActivityName, setDraftActivityName] = useState(activityName)

  const handleShow = () => {
    setShow(true)
    setDraftActivityName(activityName)
  }

  const handleClose = () => {
    setShow(false)
  }

  function handleEnterPress(target) {
    if (target.charCode == 13) {
      target.preventDefault()
      handleSave()
    }
  }

  const handleSave = () => {
    window.api.setActivityName(draftActivityName)
    setActivityName(draftActivityName)
    setShow(false)
  }

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        <i className="fa" style={{ fontSize: 'font-size:24px' }}>
          &#xf013;
        </i>
      </Button>

      <Modal
        className="settings-dialog"
        show={show}
        animation={false}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <b>Settings</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ paddingRight: '10px' }}>Activity Name</Form.Label>
              <Form.Control
                type="name"
                value={draftActivityName}
                onChange={(e) => setDraftActivityName(e.target.value)}
                onKeyPress={handleEnterPress}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="button" variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
