import { useEffect, useState } from 'react'
import { formatError, toCollection } from './apiUtils'

const codespaceEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
const localEndpoint = 'http://localhost:8000/api/workouts/'
const endpoint = import.meta.env.VITE_CODESPACE_NAME ? codespaceEndpoint : localEndpoint

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(endpoint)

        if (!response.ok) {
          throw new Error(`HTTP ${response.status} while loading workouts`)
        }

        const payload = await response.json()
        setWorkouts(toCollection(payload))
      } catch (requestError) {
        setError(formatError(requestError))
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
  }, [])

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      <p className="small text-secondary mb-3">Source: {endpoint}</p>
      {loading ? <p>Loading workouts...</p> : null}
      {error ? <div className="alert alert-danger">{error}</div> : null}
      {!loading && !error && workouts.length === 0 ? <p>No workouts found.</p> : null}
      {!loading && !error && workouts.length > 0 ? (
        <div className="row g-3">
          {workouts.map((workout) => (
            <div className="col-12 col-lg-6" key={workout._id || workout.title}>
              <article className="card h-100">
                <div className="card-body">
                  <h3 className="h5 card-title">{workout.title || 'Untitled Workout'}</h3>
                  <p className="card-text mb-2">{workout.notes || 'No workout notes provided.'}</p>
                  <p className="mb-1"><strong>Focus:</strong> {workout.focusArea || '-'}</p>
                  <p className="mb-1"><strong>Difficulty:</strong> {workout.difficulty || '-'}</p>
                  <p className="mb-0"><strong>Duration:</strong> {workout.durationMinutes ?? '-'} minutes</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  )
}

export default Workouts
