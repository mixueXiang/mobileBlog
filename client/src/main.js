import React, { Component } from 'react';
import { render } from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import EditPage from './pages/edit/EditPage';
import ArchivePage from './pages/archive/ArchivePage';
import ManagePage from './pages/manage/ManagePage';
import DetailArtPage from './pages/detail/DetailArtPage';
//import ReactDOM from 'react-dom';
//w
render((
        <HashRouter> 
            <Switch>
                <Route path="/index" component={HomePage}/>
                <Route path="/archive" component={ArchivePage}/>
                <Route path="/manage" component={ManagePage}/>
                <Route path="/login" component={LoginPage}/> 
                <Route path="/edit" component={EditPage}/> 
                <Route path="/detail/:id" component={DetailArtPage}/> 
                <Route path="/" component={HomePage}/>      
            </Switch> 
        </HashRouter>    
    ),
    document.getElementById('mobileblog')
);
