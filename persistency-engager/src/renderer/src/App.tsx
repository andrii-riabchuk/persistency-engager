import ContributionCalendarComponent from './ContributionCalendarComponent/ContributionCalendarComponent'
import LogToday from './LogToday/LogToday'
import { useEffect, useState } from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

// import 'bootstrap/dist/css/bootstrap.min.css'
import './ModalShit.css'

import timeUtils from '../../utils/time-utils'

function App() {
  let [activityName, setActivityName] = useState('')
  let [draftActivityName, setDraftActivityName] = useState('')

  let [YEAR_AGO, TODAY] = timeUtils.lastYearRangeFormatted()
  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
  }
  const handleSave = () => {
    window.api.setActivityName(draftActivityName)
    setActivityName(draftActivityName)
    setShow(false)
  }
  const handleShow = () => {
    setShow(true)
    setDraftActivityName(activityName)
  }

  let [selectedDate, setSelectedDate] = useState(TODAY)
  let [contributionData, setContributionData] = useState({})

  let [calendarRender, setCalendarRender] = useState(0)
  let rerenderCalendar = () => setCalendarRender(calendarRender + 1)

  useEffect(() => {
    window.api.getData().then((logEntries: any[]) => {
      let hashMap = {}
      logEntries.forEach((row) => {
        hashMap[row.DateTime] = row
      })
      setContributionData(hashMap)
    })
  }, [calendarRender])

  useEffect(() => {
    window.api.getActivityName().then(setActivityName)
  }, [])

  function handleEnterPress(target) {
    if (target.charCode == 13) {
      target.preventDefault()
      handleSave()
    }
  }

  return (
    <div className="contributionCalendar">
      <h1>
        {activityName + '      '}
        <Button variant="secondary" onClick={handleShow}>
          <i className="fa" style={{ fontSize: 'font-size:24px' }}>
            &#xf013;
          </i>
        </Button>
      </h1>
      <ContributionCalendarComponent key={calendarRender} onGraphCellClick={setSelectedDate} />

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

      <LogToday
        // key={selectedDate}
        selectedDate={selectedDate}
        readOnly={selectedDate !== TODAY}
        content={contributionData[selectedDate]?.Content ?? ''}
        onLogContentUpdate={rerenderCalendar}
        selectTodayDate={() => setSelectedDate(TODAY)}
      />
    </div>
  )
}

export default App
