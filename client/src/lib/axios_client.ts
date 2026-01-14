import axios from 'axios'
import { baseUrl } from './urls'

export const axiosClient = axios.create({
    baseURL: baseUrl.toString()
})