import React, { Component } from 'react';
import { render } from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import EditPage from './pages/edit/EditPage';
import ArchivePage from './pages/archive/ArchivePage';
import ManagePage from './pages/manage/ManagePage';
import DetailArtPage from './pages/detail/DetailArtPage';
import PayPage from './pages/PayPage';
//import ReactDOM from 'react-dom';

render((
        <HashRouter> 
            <Switch>
                <Route path="/pay" component={PayPage}/>
                <Route path="/index" component={HomePage}/>
                <Route path="/manage" component={ManagePage}/>
                <Route path="/archive" component={ArchivePage}/>
                <Route path="/login" component={LoginPage}/> 
                <Route path="/register" component={RegisterPage}/>
                <Route path="/edit/new" component={EditPage}/> 
                <Route path="/edit/:id" component={EditPage}/>
                <Route path="/detail/:id" component={DetailArtPage}/> 
                <Route path="/" component={HomePage}/>      
            </Switch> 
        </HashRouter>    
    ),
    document.getElementById('mobileblog')
);
