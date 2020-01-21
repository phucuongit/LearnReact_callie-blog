import axios from 'axios';
import Cookies from 'js-cookie';

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        Authorization: Cookies.get('access_token'),
    }
})
export const BASE_URL = 'http://127.0.0.1:8000/';