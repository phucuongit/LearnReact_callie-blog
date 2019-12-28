import {userUpdateApi} from '../api/userUpdateApi';
import {updateUserSuccess} from "./userActionCreators";

export const updateUser = (id, user,dispatch) => {
            dispatch(updateUserSuccess({user,id}));
            userUpdateApi(id, user)
                .then(res => {
                    alert(`User ${id} is updated`);
                }).catch(e => {
                    throw(e);
                })

}