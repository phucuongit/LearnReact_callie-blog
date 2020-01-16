import React, {useState, useEffect, useContext} from 'react';
import {useReducer} from 'reinspect';
import './App.css';
import Header from './components/Header';
import ArticlePost from "./components/ArticlePost/ArticlePost";
import FrontEnd from './pages/FrontEnd';
import { BrowserRouter , Route, Switch, Redirect} from 'react-router-dom';
import Contact from './components/Contact';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import {HotPost} from './components/HotPost';
import {NotFound} from './pages/NotFound';
import {Article} from './pages/Article';
import {Login} from './pages/Login';
import {LogoutHandler} from './pages/Logout/Logout';
import {StateInspector } from "reinspect";
import {DashBoard} from "./pages/Admin";
import store from './store';
import AppliedRoute from './components/AppliedRoute/AppliedRoute';
import {
    createBrowserHistory,
} from 'history';
import {authenticate} from './authenticate/authen';
import { Provider } from 'react-redux';
import Context, {DashBoardContext} from './Context';
import {UserLoginContext} from "./Context";
import DocumentMeta from 'react-document-meta';
import IndexBlog from './pages/Index/IndexBlog';
import {fetchingSettings, successSettings} from "./action/SettingActionCreators";
import apiSent from "./api/config";
import {initialStateSettings, SettingReducer} from "./reducers/SettingReducer";
function App ()  {
    const [isAuthenticated, setAuthenticated ] = useState(false);
    const [UserLogin, setUserLogin] = useState( null);
    // const [setting, setSetting] = useState( null);
    // var meta = {
    //     title: '',
    //     description: '',
    //     canonical: 'http://example.com/path/to/page',
    //     meta: {
    //         charset: 'utf-8',
    //         name: {
    //             keywords: 'react,meta,document,html,tags'
    //         }
    //     }
    // };
    useEffect( () => {
        document.title =  'Callie Blog';
        onLoad();
    }, [isAuthenticated]);
    useEffect( () => {
        onLoadSetting();

    }, []);

    function onLoadSetting() {

        // apiSent.get('/settings').then(res => {
            // setSetting(res.data.success);
        // });
    }
    function onLoad(){


        try{
            setAuthenticated(authenticate());
            console.log(isAuthenticated);
        }catch(e){
            alert(e);
        }

    }

    const history = createBrowserHistory();

    console.log(UserLogin);
    return (
        <StateInspector name="App">
            <BrowserRouter history={history}>
                <UserLoginContext.Provider value={{UserLogin, setUserLogin}}>
                    <Context.Provider value={{isAuthenticated, setAuthenticated}}>
                        <Provider  store={store}>

                            {/*<DocumentMeta {...meta}>*/}
                                <Switch>
                                    <AppliedRoute path="/admin" children={(props) =>  { return  <DashBoard {...props} appProps={{isAuthenticated,setAuthenticated }}/>  }}  />
                                    <AppliedRoute path="/" children={(props) =>  { return  <IndexBlog {...props} appProps={{isAuthenticated,setAuthenticated }}/>  }}  />
                                </Switch>
                            {/*</DocumentMeta>*/}

                        </Provider>
                    </Context.Provider>
                </UserLoginContext.Provider>
            </BrowserRouter>
        </StateInspector>
    );
}

export default App;
