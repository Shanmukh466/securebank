import axios from 'axios'

const API_BASE = 'http://localhost:8081/api/accounts'

export const getAllAccounts = () => axios.get(API_BASE).then(res => res.data)

export const getAccount = (accountId) =>
    axios.get(`${API_BASE}/${accountId}`).then(res => res.data)

export const createAccount = (data) =>
    axios.post(API_BASE, data).then(res => res.data)