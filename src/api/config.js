import axios from 'axios';
import Cookies from 'js-cookie';

export default axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        Authorization: Cookies.get('access_token'),
    }
})
export const BASE_URL = 'http://localhost:8000/';