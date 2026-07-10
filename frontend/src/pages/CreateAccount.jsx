import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createAccount } from '../api/accounts'

function CreateAccount() {
    const [ownerName, setOwnerName] = useState('')
    const [accountType, setAccountType] = useState('SAVINGS')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            const account = await createAccount({ ownerName, accountType })
            navigate(`/accounts/${account.accountId}`)
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto p-8">
            <h1 className="text-2xl font-semibold text-slate-800 mb-1">Open a new account</h1>
            <p className="text-slate-500 text-sm mb-6">Takes less than a minute.</p>

            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-sm">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Owner name</label>
                    <input
                        type="text"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        required
                        placeholder="e.g. Jordan Lee"
                        className="w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Account type</label>
                    <div className="grid grid-cols-2 gap-3">
                        {['SAVINGS', 'CHECKING'].map((type) => (
                            <button
                                type="button"
                                key={type}
                                onClick={() => setAccountType(type)}
                                className={`py-2.5 rounded-lg text-sm font-medium border transition ${accountType === type
                                        ? 'bg-indigo-600 text-white border-indigo-600'
                                        : 'bg-white text-slate-600 border-slate-300 hover:border-indigo-400'
                                    }`}
                            >
                                {type.charAt(0) + type.slice(1).toLowerCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-500 text-white rounded-lg py-2.5 font-semibold hover:bg-emerald-600 transition disabled:opacity-50"
                >
                    {loading ? 'Creating...' : 'Create account'}
                </button>
            </form>
        </div>
    )
}

export default CreateAccount