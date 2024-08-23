import {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'

const App = () => {
  const [mentors, setMentors] = useState([])
  const [areaOfInterest, setAreaOfInterest] = useState('')
  const [selectedMentor, setSelectedMentor] = useState(null)
  const [sessionDate, setSessionDate] = useState('')
  const [sessionTime, setSessionTime] = useState('')
  const [duration, setDuration] = useState(30)

  const getMentors = async () => {
    try {
      const response = await axios.get('/api/mentors', {
        params: {area_of_interest: areaOfInterest},
      })
      setMentors(response.data)
    } catch (error) {
      console.error('Error fetching mentors:', error)
    }
  }

  const scheduleSession = async () => {
    try {
      const response = await axios.post('/api/sessions', {
        studentId: 1, // Replace with actual logged-in student ID
        mentorId: selectedMentor,
        date: sessionDate,
        startTime: sessionTime,
        duration,
        areaOfInterest,
      })
      alert('Session scheduled successfully!')
    } catch (error) {
      console.error('Error scheduling session:', error)
    }
  }

  useEffect(() => {
    if (areaOfInterest) {
      getMentors()
    }
  }, [areaOfInterest])

  return (
    <form className="container">
      <h1 className="header">Book a 1x1 Mock Interview</h1>
      <div>
        <label htmlFor="area">Select Area of Interest:</label>
        <select
          id="area"
          value={areaOfInterest}
          onChange={e => setAreaOfInterest(e.target.value)}
        >
          <option value="">Select...</option>
          <option value="1">FMCG Sales</option>
          <option value="2">Equity Research</option>
          <option value="3">Digital Marketing</option>
        </select>
      </div>
      <div>
        <h2>Available Mentors:</h2>
        <ul>
          {mentors.map(mentor => (
            <li key={mentor.id}>
              {mentor.name} - Available: {mentor.available_start_time} to{' '}
              {mentor.available_end_time}
              <button
                type="button"
                onClick={() => setSelectedMentor(mentor.id)}
              >
                Select
              </button>
            </li>
          ))}
        </ul>
        <label htmlFor="date">Session Date:</label>
        <input
          id="date"
          type="date"
          value={sessionDate}
          onChange={e => setSessionDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="time">Session Start Time:</label>
        <input
          id="time"
          type="time"
          value={sessionTime}
          onChange={e => setSessionTime(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="duration">Duration:</label>
        <select
          id="duration"
          value={duration}
          onChange={e => setDuration(e.target.value)}
        >
          <option value={30}>30 minutes</option>
          <option value={45}>45 minutes</option>
          <option value={60}>60 minutes</option>
        </select>
      </div>
      <button type="button" onClick={scheduleSession}>
        Book Session
      </button>
    </form>
  )
}

export default App
