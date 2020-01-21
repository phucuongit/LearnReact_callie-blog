import React, {useEffect, useContext} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import '../../issets/plugins/fontawesome-free/css/all.scss';
import '../../issets/plugins/overlayScrollbars/css/OverlayScrollbars.scss';
import '../../issets/dist/css/adminlte.scss';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Aside from './Aside/Aside';
import Context, {UserLoginContext} from '../../Context';
import {authenticate} from "../../authenticate/authen";
import IndexUser from './User/IndexUser';
import IndexDashBoard from './DashBoard/DashBoard';
import AddUser from "./User/AddUser";
import reducer, {initialState} from "../../reducers/reducer";
import {useReducer} from "reinspect";
import AllPost from './Posts/AllPost/AllPost';
import EditPost from './Posts/EditPost/EditPost';
import Cookies from 'js-cookie';
import {DashBoardContext, CateogryContext} from '../../Context';

import AddPost from './Posts/AddPost/AddPost';
import Categories from './Categories/Categories';
import {CategoriesReducerBo, initial} from "../../reducers/CategoriesReducer(bo)";
import toastr from 'toastr';
import 'toastr/toastr.scss';
import {Setting} from './Setting/Setting';
import {initialStateSettings, SettingReducer} from '../../reducers/SettingReducer';
import Menus from '../Admin/Menus/Menus';
import MyProfile from "./My Profile/MyProfile";
import '../../components/Notification/Notification';

const DashBoard =  ({history})  => {
    let { isAuthenticated,setAuthenticated } = useContext(Context);
    const useUserState = useReducer(reducer, initialState);
    const {UserLogin, setUserLogin} = useContext(UserLoginContext);
    let settingsReducer = useReducer( SettingReducer, initialStateSettings, 'Settings');

    useEffect(() => {
        onload();
    }, [isAuthenticated]);

    function onload(){
        if(authenticate() && isAuthenticated){
            setUserLogin(JSON.parse(Cookies.get('user_login')));
            if(UserLogin !== null){

                if(isAdmin(UserLogin.roles)){ // check phải admin không
                    toastr.success('Welcome to Admin DashBoard', {closeButton: true});
                }else{
                    history.push('/');
                    toastr.error('You don\'t have admin permission', {closeButton: true});

                }

            }


        }else{
            if(authenticate()){
                setAuthenticated(true);
                setUserLogin(JSON.parse(Cookies.get('user_login')));
                if(UserLogin !== null){
                    toastr.success('Welcome to Admin DashBoard', {closeButton: true});
                    if(isAdmin(UserLogin.roles)){ // check phải admin không
                        toastr.success('Welcome to Admin DashBoard', {closeButton: true});
                    }else{
                        history.push('/');
                        toastr.error('You don\'t have admin permission', {closeButton: true});

                    }
                };
            }else{
                history.push('/login');
            }

        }
    }
    function isAdmin(roles){
        let result=false;
        roles.forEach( (role, index) => {
            if(role.slug === 'admin') {
                result = true;
            }
        });
        return result;
    }

    return (

        <DashBoardContext.Provider value={{useUserState, settingsReducer}}>
            {isAuthenticated && (
                <div className={"wrapper__dashboard"}>
                    <div className="wrapper">
                        <Header history={history}/>
                        <Aside/>
                        <Switch>

                            <Route exact path={'/admin'} component={IndexDashBoard}/>

                            <Route exact path={'/admin/users'} component={IndexUser} history={history}/>
                            <Route exact path={'/admin/add-user'} component={AddUser} history={history}/>

                            <Route exact path={'/admin/all-posts'} component={AllPost} history={history}/>
                            <Route path={'/admin/posts/:id'} component={EditPost} history={history}/>
                            <Route exact path={'/admin/add-posts'} component={AddPost} history={history}/>
                            <Route exact path={'/admin/my-profile'} component={MyProfile} history={history}/>

                            <Route exact path={'/admin/categories'} component={Categories} history={history}/>

                            <Route exact path={'/admin/setting'} component={Setting} />

                        </Switch>

                        <Footer/>
                    </div>
                </div>
            )}
        </DashBoardContext.Provider>

    );

}

export default (DashBoard);