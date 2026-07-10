import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import CreateAccount from './pages/CreateAccount'
import AccountDetail from './pages/AccountDetail'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/accounts/new" element={<CreateAccount />} />
          <Route path="/accounts/:accountId" element={<AccountDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App