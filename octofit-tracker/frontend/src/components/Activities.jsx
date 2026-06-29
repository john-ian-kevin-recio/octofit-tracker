import { useEffect, useState } from 'react'
import { formatError, toCollection } from './apiUtils'

const codespaceEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
const localEndpoint = 'http://localhost:8000/api/activities/'
const endpoint = import.meta.env.VITE_CODESPACE_NAME ? codespaceEndpoint : localEndpoint

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(endpoint)

        if (!response.ok) {
          throw new Error(`HTTP ${response.status} while loading activities`)
        }

        const payload = await response.json()
        setActivities(toCollection(payload))
      } catch (requestError) {
        setError(formatError(requestError))
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [])

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      <p className="small text-secondary mb-3">Source: {endpoint}</p>
      {loading ? <p>Loading activities...</p> : null}
      {error ? <div className="alert alert-danger">{error}</div> : null}
      {!loading && !error && activities.length === 0 ? <p>No activities found.</p> : null}
      {!loading && !error && activities.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || `${activity.user}-${activity.type}-${activity.loggedAt}`}>
                  <td>{activity.user}</td>
                  <td>{activity.type || '-'}</td>
                  <td>{activity.durationMinutes ?? '-'}</td>
                  <td>{activity.caloriesBurned ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  )
}

export default Activities
