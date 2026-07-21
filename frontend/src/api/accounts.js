import axios from 'axios'

const API_BASE = 'http://localhost:8081/api/accounts'

export const getAllAccounts = () => axios.get(API_BASE).then(res => res.data)

export const getAccount = (accountId) =>
    axios.get(`${API_BASE}/${accountId}`).then(res => res.data)

export const createAccount = (data) =>
    axios.post(API_BASE, data).then(res => res.data)

const TRANSACTION_API_BASE = 'http://localhost:8082/api/transactions'

export const transferMoney = (data) =>
    axios.post(`${TRANSACTION_API_BASE}/transfer`, data).then(res => res.data)

export const getTransaction = (transactionId) =>
    axios.get(`${TRANSACTION_API_BASE}/${transactionId}`).then(res => res.data)