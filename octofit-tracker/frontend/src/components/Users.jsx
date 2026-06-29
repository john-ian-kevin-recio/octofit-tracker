import { useEffect, useState } from 'react'
import { formatError, toCollection } from './apiUtils'

const codespaceEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
const localEndpoint = 'http://localhost:8000/api/users/'
const endpoint = import.meta.env.VITE_CODESPACE_NAME ? codespaceEndpoint : localEndpoint

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(endpoint)

        if (!response.ok) {
          throw new Error(`HTTP ${response.status} while loading users`)
        }

        const payload = await response.json()
        setUsers(toCollection(payload))
      } catch (requestError) {
        setError(formatError(requestError))
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      <p className="small text-secondary mb-3">Source: {endpoint}</p>
      {loading ? <p>Loading users...</p> : null}
      {error ? <div className="alert alert-danger">{error}</div> : null}
      {!loading && !error && users.length === 0 ? <p>No users found.</p> : null}
      {!loading && !error && users.length > 0 ? (
        <div className="row g-3">
          {users.map((user) => (
            <div className="col-12 col-md-6" key={user._id || user.email}>
              <article className="card h-100">
                <div className="card-body">
                  <h3 className="h5 card-title mb-1">{user.displayName || user.email}</h3>
                  <p className="card-text text-secondary mb-0">{user.email || 'No email'}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  )
}

export default Users
