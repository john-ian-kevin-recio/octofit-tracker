import { useEffect, useState } from 'react'
import { formatError, toCollection } from './apiUtils'

const codespaceEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
const localEndpoint = 'http://localhost:8000/api/leaderboard/'
const endpoint = import.meta.env.VITE_CODESPACE_NAME ? codespaceEndpoint : localEndpoint

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(endpoint)

        if (!response.ok) {
          throw new Error(`HTTP ${response.status} while loading leaderboard`)
        }

        const payload = await response.json()
        setEntries(toCollection(payload))
      } catch (requestError) {
        setError(formatError(requestError))
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [])

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      <p className="small text-secondary mb-3">Source: {endpoint}</p>
      {loading ? <p>Loading leaderboard...</p> : null}
      {error ? <div className="alert alert-danger">{error}</div> : null}
      {!loading && !error && entries.length === 0 ? <p>No leaderboard entries found.</p> : null}
      {!loading && !error && entries.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id || `${entry.user}-${entry.rank}`}>
                  <td>{entry.rank ?? '-'}</td>
                  <td>{entry.user || '-'}</td>
                  <td>{entry.points ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  )
}

export default Leaderboard
