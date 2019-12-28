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

const DashBoard =  ({history})  => {
    let { isAuthenticated,setAuthenticated } = useContext(Context);
    const useUserState = useReducer(reducer, initialState);
    const {UserLogin, setUserLogin} = useContext(UserLoginContext);

    useEffect(() => {
        onload();
    }, [isAuthenticated]);

    function onload(){
        if(authenticate() && isAuthenticated){
            setUserLogin(JSON.parse(Cookies.get('user_login')));
            history.push('/admin/1');
        }else{
            if(authenticate()){
                setAuthenticated(true);
                setUserLogin(JSON.parse(Cookies.get('user_login')));
                history.push('/admin/1');
            }else{
                history.push('/login');
            }
        }
    }

    return (

        <DashBoardContext.Provider value={useUserState}>

            <div className={"wrapper__dashboard"}>
                <div className="wrapper">
                    <Header history={history}/>
                    <Aside/>
                    <Switch>

                        <Route exact path={'/admin/users'} component={IndexUser} history={history}/>
                        <Route exact path={'/admin/add-user'} component={AddUser} history={history}/>

                        <Route exact path={'/admin/all-posts'} component={AllPost} history={history}/>
                        <Route exact path={'/admin/posts/:id'} component={EditPost} history={history}/>
                        <Route exact path={'/admin/add-posts'} component={AddPost} history={history}/>

                        <Route exact path={'/admin/categories'} component={Categories} history={history}/>
                        <Route exact path={'/admin/1'} component={IndexDashBoard}/>

                    </Switch>

                    {/*<aside className="control-sidebar control-sidebar-dark"/>*/}
                    <Footer/>
                </div>
            </div>

        </DashBoardContext.Provider>


    );

}

export default (DashBoard);