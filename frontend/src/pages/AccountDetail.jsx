import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getAccount } from '../api/accounts'

function AccountDetail() {
    const { accountId } = useParams()
    const [account, setAccount] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        getAccount(accountId)
            .then(setAccount)
            .catch(() => setError('Account not found'))
    }, [accountId])

    if (error) return <p className="text-red-600 p-8">{error}</p>
    if (!account) return <p className="text-slate-500 p-8">Loading...</p>

    return (
        <div className="max-w-md mx-auto p-8">
            <Link to="/" className="text-sm text-slate-500 hover:text-indigo-600 transition">&larr; Back to accounts</Link>

            <div className="bg-gradient-to-br from-indigo-950 to-indigo-800 rounded-2xl p-6 mt-4 text-white shadow-xl">
                <p className="text-indigo-200 text-sm">{account.accountType}</p>
                <p className="text-4xl font-bold mt-1">
                    {account.balance} <span className="text-lg text-indigo-300">{account.currency}</span>
                </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-4 space-y-3 text-sm shadow-sm">
                <div className="flex justify-between">
                    <span className="text-slate-500">Owner</span>
                    <span className="font-medium text-slate-800">{account.ownerName}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-500">Account ID</span>
                    <span className="font-mono text-xs text-slate-600">{account.accountId}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-500">Opened</span>
                    <span className="font-medium text-slate-800">{new Date(account.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    )
}

export default AccountDetail