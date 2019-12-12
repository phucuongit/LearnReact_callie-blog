import Cookies from 'js-cookie';
import axios from 'axios';
import {
    createBrowserHistory,
    createHashHistory,
    createMemoryHistory
} from 'history';
// const history = createBrowserHistory();
export const getAccessToken = ()  => Cookies.get('access_token');

export const getRefreshToken = () => Cookies.get('refresh_token');

export const isAuthenticated = () => !getAccessToken();
const redirectToLogin = ({history}) => {
    history.push('/login');
}
const refreshToken = async () => {
    try{
        axios.post('http://localhost:8000/oauth/token/refresh', { 'refresh_token' : Cookies.get('access_token') } )
            .then(res => {
                return res.data.success.token;
            });
    }catch(errors){
        return;
    }

}
export const authenticate = () => {
    if(Cookies.get('access_token')){
        return true;
    }else{
        return false;
    }
};
