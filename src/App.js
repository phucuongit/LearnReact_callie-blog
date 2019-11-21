import React from 'react';
import './App.css';
import Header from './components/Header';
import ArticlePost from "./components/ArticlePost/ArticlePost";
import FrontEnd from './pages/FrontEnd';
import { HashRouter , Route, Switch} from 'react-router-dom';
import Contact from './components/Contact';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import {HotPost} from './components/HotPost';
import {NotFound} from './pages/NotFound';

import store from './store';
import { createBrowserHistory } from "history";
import { Provider } from 'react-redux';
function App() {
  return (

          <HashRouter basename="/" history={createBrowserHistory} >
              <Provider store={store}>
                  <div className="App">
                      <Header/>
                  </div>
                  <Route exact path="/" >
                    <HotPost/>
                  </Route>
                  <div className="section">

                      <div className="container">

                          <div className="row">
                              <div className="col-md-8">
                                    <Switch>
                                      <Route exact path="/" component={FrontEnd}/>
                                      <Route  path="/post" component={ArticlePost}/>
                                      <Route  path="/contact" component={Contact}/>
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
          </HashRouter>


  );
}

export default App;
