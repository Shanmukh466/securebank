import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllAccounts } from '../api/accounts'

const typeColors = {
    SAVINGS: 'bg-emerald-100 text-emerald-700',
    CHECKING: 'bg-indigo-100 text-indigo-700',
}

function Dashboard() {
    const [accounts, setAccounts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getAllAccounts()
            .then(setAccounts)
            .catch(() => setError('Failed to load accounts'))
            .finally(() => setLoading(false))
    }, [])

    const totalBalance = accounts.reduce((sum, a) => sum + Number(a.balance), 0)

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="bg-gradient-to-br from-indigo-950 to-indigo-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
                <p className="text-indigo-200 text-sm mb-1">Total balance</p>
                <p className="text-4xl font-bold">${totalBalance.toFixed(2)}</p>
                <p className="text-indigo-300 text-sm mt-2">{accounts.length} account{accounts.length !== 1 ? 's' : ''}</p>
            </div>

            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-800">Your accounts</h2>
                <Link to="/accounts/new" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                    + Open new account
                </Link>
            </div>

            {loading && <p className="text-slate-500">Loading...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {!loading && accounts.length === 0 && (
                <div className="bg-white border border-dashed border-slate-300 rounded-xl p-10 text-center text-slate-500">
                    No accounts yet. Open one to get started.
                </div>
            )}

            <div className="grid gap-4">
                {accounts.map((acc) => (
                    <Link
                        key={acc.accountId}
                        to={`/accounts/${acc.accountId}`}
                        className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition"
                    >
                        <div className="w-11 h-11 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold">
                            {acc.ownerName.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-slate-800">{acc.ownerName}</p>
                            <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 font-medium ${typeColors[acc.accountType]}`}>
                                {acc.accountType}
                            </span>
                        </div>
                        <p className="text-lg font-semibold text-slate-800">
                            {acc.balance} <span className="text-sm text-slate-400">{acc.currency}</span>
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Dashboard