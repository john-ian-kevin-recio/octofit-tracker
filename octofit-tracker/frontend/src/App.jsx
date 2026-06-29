import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header border-bottom">
        <div className="container py-4">
          <h1 className="display-6 mb-2">Octofit Tracker</h1>
          <p className="text-secondary mb-0">
            React presentation tier for users, activities, teams, leaderboard, and workouts.
          </p>
        </div>
      </header>

      <nav className="app-nav border-bottom">
        <div className="container d-flex flex-wrap gap-2 py-3">
          <NavLink to="/" end className={({ isActive }) => `btn ${isActive ? 'btn-primary' : 'btn-outline-primary'}`}>
            Users
          </NavLink>
          <NavLink to="/activities" className={({ isActive }) => `btn ${isActive ? 'btn-primary' : 'btn-outline-primary'}`}>
            Activities
          </NavLink>
          <NavLink to="/teams" className={({ isActive }) => `btn ${isActive ? 'btn-primary' : 'btn-outline-primary'}`}>
            Teams
          </NavLink>
          <NavLink to="/leaderboard" className={({ isActive }) => `btn ${isActive ? 'btn-primary' : 'btn-outline-primary'}`}>
            Leaderboard
          </NavLink>
          <NavLink to="/workouts" className={({ isActive }) => `btn ${isActive ? 'btn-primary' : 'btn-outline-primary'}`}>
            Workouts
          </NavLink>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
