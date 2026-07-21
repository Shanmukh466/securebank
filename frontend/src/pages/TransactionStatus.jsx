import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getTransaction } from '../api/accounts'

const statusStyles = {
    PENDING: 'bg-amber-100 text-amber-700',
    APPROVED: 'bg-emerald-100 text-emerald-700',
    FLAGGED: 'bg-red-100 text-red-700',
    COMPLETED: 'bg-emerald-100 text-emerald-700',
    FAILED: 'bg-red-100 text-red-700',
}

function TransactionStatus() {
    const { transactionId } = useParams()
    const [txn, setTxn] = useState(null)
    const [error, setError] = useState(null)

    const poll = () => {
        getTransaction(transactionId)
            .then(setTxn)
            .catch(() => setError('Transaction not found'))
    }

    useEffect(() => {
        poll()
        const interval = setInterval(poll, 2000)
        return () => clearInterval(interval)
    }, [transactionId])

    if (error) return <p className="text-red-600 p-8">{error}</p>
    if (!txn) return <p className="text-slate-500 p-8">Loading...</p>

    return (
        <div className="max-w-md mx-auto p-8">
            <Link to="/" className="text-sm text-slate-500 hover:text-indigo-600 transition">&larr; Back to accounts</Link>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-4 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-slate-500">Transfer</p>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[txn.status] || 'bg-slate-100 text-slate-600'}`}>
                        {txn.status}
                    </span>
                </div>

                <p className="text-3xl font-bold text-slate-800">
                    {txn.amount} <span className="text-lg text-slate-400">{txn.currency}</span>
                </p>

                <div className="mt-6 space-y-2 text-sm">
                    <p><span className="text-slate-500">From:</span> <span className="font-mono text-xs">{txn.fromAccountId}</span></p>
                    <p><span className="text-slate-500">To:</span> <span className="font-mono text-xs">{txn.toAccountId}</span></p>
                    <p><span className="text-slate-500">Created:</span> {new Date(txn.createdAt).toLocaleString()}</p>
                </div>

                {txn.status === 'PENDING' && (
                    <p className="text-xs text-slate-400 mt-4">Checking status automatically...</p>
                )}
            </div>
        </div>
    )
}

export default TransactionStatus