import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-slate-900 text-white px-8 py-4 flex items-center justify-between shadow-lg sticky top-0 z-10">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
                <span className="w-8 h-8 bg-emerald-400 rounded-lg flex items-center justify-center text-slate-900 text-sm">
                    SB
                </span>
                SecureBank
            </Link>
            <div className="flex gap-8 text-sm font-medium">
                <Link to="/" className="text-indigo-200 hover:text-white transition">Dashboard</Link>
                <Link
                    to="/accounts/new"
                    className="bg-emerald-400 text-slate-900 px-4 py-2 rounded-lg hover:bg-emerald-300 transition font-semibold"
                >
                    + Open account
                </Link>
            </div>
        </nav>
    )
}

export default Navbar