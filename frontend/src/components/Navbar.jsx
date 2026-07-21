import { Link, useLocation } from 'react-router-dom'

function Navbar() {
    const { pathname } = useLocation()
    const isActive = (path) => pathname === path

    return (
        <nav className="bg-slate-950 text-white px-8 py-4 flex items-center justify-between border-b border-slate-800 sticky top-0 z-10">
            <Link to="/" className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
                <span className="w-8 h-8 bg-emerald-400 rounded-xl flex items-center justify-center text-slate-900">
                    <i className="ti ti-shield-check text-lg"></i>
                </span>
                SecureBank
            </Link>
            <div className="flex items-center gap-1 text-sm font-medium">
                <Link
                    to="/"
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition ${isActive('/') ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    <i className="ti ti-layout-dashboard"></i> Dashboard
                </Link>
                <Link
                    to="/transfer"
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition ${isActive('/transfer') ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    <i className="ti ti-arrows-exchange"></i> Transfer
                </Link>
                <Link
                    to="/accounts/new"
                    className="flex items-center gap-1.5 ml-3 bg-emerald-400 text-slate-900 px-3.5 py-2 rounded-lg hover:bg-emerald-300 transition font-semibold"
                >
                    <i className="ti ti-plus"></i> Open account
                </Link>
            </div>
        </nav>
    )
}

export default Navbar