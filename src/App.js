import React, {useState, useEffect} from 'react';
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

import {DashBoard} from "./pages/Admin";
import store from './store';
import AppliedRoute from './components/AppliedRoute/AppliedRoute';
import {
    createBrowserHistory,
} from 'history';
import {authenticate} from './authenticate/authen';
import { Provider } from 'react-redux';

function App ()  {
    const [isAuthenticated, setAuthenticated ] = useState(false);
    // useEffect(() => {
    //     onLoad();
    // }, []);
    // async function onLoad(){
    //     try{
    //
    //     }catch(e){
    //         alert(e);
    //     }
    // }
    // async componentDidMount() {
    //     var res = await authenticate();
    //     //console.log(res.data);
    //         //this.setState({ isAuthenticated: res.data.isAuthenticated })
    // };

        const history = createBrowserHistory();
        // console.log(isAuthenticated, Cookies.get('access_token'));

        return (

            <BrowserRouter history={history}>
                <Provider store={store}>
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
                                        <AppliedRoute exact path={"/login"} component={Login} appProps={{isAuthenticated,setAuthenticated }}/>
                                        <AppliedRoute exact path={"/logout"} component={LogoutHandler} appProps={{isAuthenticated,setAuthenticated }}/>
                                        <AppliedRoute exact path="/post" component={ArticlePost} appProps={{isAuthenticated,setAuthenticated }}/>
                                        <AppliedRoute path="/contact" component={Contact} appProps={{isAuthenticated,setAuthenticated }}/>
                                        <AppliedRoute path='/test' component={Article} appProps={{isAuthenticated,setAuthenticated }}/>
                                        <AppliedRoute path='/:slug' children={(props) =>  { return props.match.isExact ? <Article {...props} /> : <NotFound/> }} appProps={{isAuthenticated,setAuthenticated }}/>
                                        <AppliedRoute exact path='/admin' children={(props) =>  { return isAuthenticated ? <DashBoard {...props} /> : <Redirect to={'/login'}/> }} appProps={{isAuthenticated,setAuthenticated }}/>
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
                </Provider>
            </BrowserRouter>
        );
}

export default App;
