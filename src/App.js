import React, { useState,useEffect, useReducer} from 'react';
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
import Context from './Context';
import {UserLoginContext} from "./Context";

function App ()  {
    const [isAuthenticated, setAuthenticated ] = useState(false);
    const [UserLogin, setUserLogin] = useState( null);

    useEffect( () => {
        onLoad();
    }, [isAuthenticated]);

    function onLoad(){
        try{
            setAuthenticated(authenticate());
            console.log(isAuthenticated);
        }catch(e){
            alert(e);
        }
    }

    //  console.log(state, dispatch);
    const history = createBrowserHistory();
    // console.log(isAuthenticated, Cookies.get('access_token'));
    // console.log(isAuthenticated);
    return (
        <StateInspector name="App">
            <BrowserRouter history={history}>
                <UserLoginContext.Provider value={{UserLogin, setUserLogin}}>
                    <Context.Provider value={{isAuthenticated, setAuthenticated}}>
                        <Provider  store={store}>
                            { (isAuthenticated && true)
                                ?   <>
                                    <AppliedRoute exact path='/admin/1' children={(props) =>  { return  <DashBoard {...props} appProps={{isAuthenticated,setAuthenticated }}/>  }}  />
                                </>
                                : <>
                                    <div className="App">
                                        <Header appProps={{isAuthenticated,setAuthenticated }}/>
                                    </div>
                                    <Route exact path="/">
                                        <HotPost/>
                                    </Route>
                                    <div className="section">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <Switch>
                                                        <AppliedRoute exact path="/" children={props => {  return isAuthenticated ? <FrontEnd/> : <Redirect to={'/login'}/>   }} appProps={{isAuthenticated,setAuthenticated }} />
                                                        <AppliedRoute exact path={"/login"} component={Login} />
                                                        <AppliedRoute exact path={"/logout"} component={LogoutHandler} appProps={{isAuthenticated,setAuthenticated }}/>
                                                        <AppliedRoute exact path="/post" component={ArticlePost} appProps={{isAuthenticated,setAuthenticated }}/>
                                                        <AppliedRoute path="/contact" component={Contact} appProps={{isAuthenticated,setAuthenticated }}/>
                                                        <AppliedRoute path='/test' component={Article} appProps={{isAuthenticated,setAuthenticated }}/>
                                                        <AppliedRoute exact path='/:slug' children={(props) =>  { return props.match.isExact ? <Article {...props} /> : <NotFound/> }} appProps={{isAuthenticated,setAuthenticated }}/>
                                                        <Route component={NotFound}/>
                                                    </Switch>
                                                </div>
                                                <div className="col-md-4">
                                                    <Sidebar/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Footer/>
                                </>
                            }
                        </Provider>
                    </Context.Provider>
                </UserLoginContext.Provider>
            </BrowserRouter>
        </StateInspector>
    );
}

export default App;
