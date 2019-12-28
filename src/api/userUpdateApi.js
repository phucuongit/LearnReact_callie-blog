import axios from 'axios';
import Cookies from 'js-cookie';

export const userUpdateApi = (id, userEdit) => {
    console.log(userEdit);
        return axios({
            method: 'PUT',
            url: `http://localhost:8000/api/users/${id}`,
            headers: {
                Authorization: Cookies.get('access_token')
            },
            data: userEdit,
        });
}