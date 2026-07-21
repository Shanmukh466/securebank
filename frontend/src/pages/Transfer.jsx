import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllAccounts, transferMoney } from '../api/accounts'

function Transfer() {
    const [accounts, setAccounts] = useState([])
    const [fromAccountId, setFromAccountId] = useState('')
    const [toAccountId, setToAccountId] = useState('')
    const [amount, setAmount] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        getAllAccounts().then(setAccounts)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        if (fromAccountId === toAccountId) {
            setError('Cannot transfer to the same account')
            return
        }

        setLoading(true)
        try {
            const txn = await transferMoney({
                fromAccountId,
                toAccountId,
                amount: parseFloat(amount),
                currency: 'USD',
                idempotencyKey: crypto.randomUUID(),
            })
            navigate(`/transactions/${txn.transactionId}`)
        } catch (err) {
            setError(err.response?.data?.message || 'Transfer failed')
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto p-8">
            <h1 className="text-2xl font-semibold text-slate-800 mb-1">Transfer money</h1>
            <p className="text-slate-500 text-sm mb-6">Send money between your accounts.</p>

            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">From</label>
                    <select
                        value={fromAccountId}
                        onChange={(e) => setFromAccountId(e.target.value)}
                        required
                        className="w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Select account</option>
                        {accounts.map((a) => (
                            <option key={a.accountId} value={a.accountId}>
                                {a.ownerName} — {a.balance} {a.currency}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">To</label>
                    <select
                        value={toAccountId}
                        onChange={(e) => setToAccountId(e.target.value)}
                        required
                        className="w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Select account</option>
                        {accounts.map((a) => (
                            <option key={a.accountId} value={a.accountId}>
                                {a.ownerName} — {a.balance} {a.currency}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Amount (USD)</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        placeholder="0.00"
                        className="w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white rounded-lg py-2.5 font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
                >
                    {loading ? 'Sending...' : 'Send transfer'}
                </button>
            </form>
        </div>
    )
}

export default Transfer