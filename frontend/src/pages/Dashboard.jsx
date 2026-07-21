import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllAccounts } from '../api/accounts'

const typeConfig = {
    SAVINGS: { badge: 'bg-emerald-50 text-emerald-700', icon: 'ti-pig-money' },
    CHECKING: { badge: 'bg-indigo-50 text-indigo-700', icon: 'ti-credit-card' },
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
            <div className="bg-slate-950 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <p className="text-slate-400 text-sm mb-2 flex items-center gap-1.5">
                    <i className="ti ti-wallet"></i> Total balance
                </p>
                <p className="text-5xl font-semibold tracking-tight">
                    ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                <p className="text-slate-500 text-sm mt-3">{accounts.length} active account{accounts.length !== 1 ? 's' : ''}</p>
            </div>

            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-slate-800">Your accounts</h2>
                <Link to="/accounts/new" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                    <i className="ti ti-plus text-base"></i> New account
                </Link>
            </div>

            {loading && (
                <div className="space-y-3">
                    {[1, 2].map((i) => (
                        <div key={i} className="h-20 bg-slate-100 rounded-xl animate-pulse"></div>
                    ))}
                </div>
            )}
            {error && <p className="text-red-600 text-sm">{error}</p>}

            {!loading && accounts.length === 0 && (
                <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center">
                    <i className="ti ti-building-bank text-3xl text-slate-300 mb-2 block"></i>
                    <p className="text-slate-500 text-sm">No accounts yet. Open one to get started.</p>
                </div>
            )}

            <div className="grid gap-3">
                {accounts.map((acc) => {
                    const config = typeConfig[acc.accountType] || typeConfig.SAVINGS
                    return (
                        <Link
                            key={acc.accountId}
                            to={`/accounts/${acc.accountId}`}
                            className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 hover:shadow-sm transition"
                        >
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${config.badge}`}>
                                <i className={`ti ${config.icon} text-lg`}></i>
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-slate-800 text-sm">{acc.ownerName}</p>
                                <p className="text-xs text-slate-400 mt-0.5 capitalize">{acc.accountType.toLowerCase()} account</p>
                            </div>
                            <p className="text-base font-semibold text-slate-800">
                                {Number(acc.balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                <span className="text-xs text-slate-400 ml-1">{acc.currency}</span>
                            </p>
                            <i className="ti ti-chevron-right text-slate-300"></i>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Dashboard