import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'

// import 'bootstrap/dist/css/bootstrap.min.css'
import './ModalShit.css'
import { selectActivityName, setActivityName } from '@renderer/features/settings/settingsSlice'
import { useAppDispatch, useAppSelector } from '@renderer/app/hooks'

export function Settings() {
  const [show, setShow] = useState(false)
  const activityName = useAppSelector(selectActivityName)
  const dispatch = useAppDispatch()

  let [draftActivityName, setDraftActivityName] = useState('')

  const handleClose = () => {
    setShow(false)
  }

  const handleSave = () => {
    window.api.setActivityName(draftActivityName)
    dispatch(setActivityName(draftActivityName))
    setShow(false)
  }

  const handleShow = () => {
    setShow(true)
    setDraftActivityName(activityName)
  }

  function handleEnterPress(target) {
    if (target.charCode == 13) {
      target.preventDefault()
      handleSave()
    }
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
