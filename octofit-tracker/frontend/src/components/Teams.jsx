import { useEffect, useState } from 'react'
import { formatError, toCollection } from './apiUtils'

const codespaceEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
const localEndpoint = 'http://localhost:8000/api/teams/'
const endpoint = import.meta.env.VITE_CODESPACE_NAME ? codespaceEndpoint : localEndpoint

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(endpoint)

        if (!response.ok) {
          throw new Error(`HTTP ${response.status} while loading teams`)
        }

        const payload = await response.json()
        setTeams(toCollection(payload))
      } catch (requestError) {
        setError(formatError(requestError))
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
  }, [])

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      <p className="small text-secondary mb-3">Source: {endpoint}</p>
      {loading ? <p>Loading teams...</p> : null}
      {error ? <div className="alert alert-danger">{error}</div> : null}
      {!loading && !error && teams.length === 0 ? <p>No teams found.</p> : null}
      {!loading && !error && teams.length > 0 ? (
        <div className="row g-3">
          {teams.map((team) => (
            <div className="col-12 col-md-6" key={team._id || team.name}>
              <article className="card h-100">
                <div className="card-body">
                  <h3 className="h5 card-title">{team.name || 'Untitled Team'}</h3>
                  <p className="card-text text-secondary">{team.description || 'No description provided.'}</p>
                  <p className="mb-0">
                    <strong>Members:</strong> {Array.isArray(team.members) ? team.members.length : 0}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  )
}

export default Teams
