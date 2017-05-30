require('./headerNav.less');
import React, { Component } from 'react';
import { render } from 'react-dom';
import {Link} from 'react-router-dom';
import { indexUserData, indexArcData} from '../../static/js/indexData';
let Utils = require('../../utils/Utils');

export default class HeaderNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginInfo: {}
        };
    }

    componentDidMount() {
        const me = this;
        me.getLoginInfo(); 
    }

    //获取用户登录信息
    getLoginInfo = () => {
        let loginData = Utils.getLoginInfo() || {} ;
        this.setState({
            loginInfo: loginData
        });
    }

    clickHandler = (e) => {
        let cur = e.currentTarget;
        let link = cur.getAttribute('data-path');
        let allEle = cur.parentNode.children;
        for (let i = 0; i < allEle.length; i++) {
            allEle[i].classList.remove('has-click');
        }
        cur.classList.add('has-click');

        link && (location.href = location.href.replace(location.hash, '') + '#' + link);
    }

    leaveHandler = () => {
        let storage =  window.localStorage ? window.localStorage : {};
        storage.removeItem('login');
        location.href = location.href.replace(location.hash, '') + '#' + '/login';
        this.setState({
            loginInfo: {},          
        });
    }

    getNavDom = () => {
        let loginInfo = this.state.loginInfo;
        let loginText,loginDom;
        console.log('getNavDom login', loginInfo);
        let isShowManage; 
        loginText = loginInfo.user_name ? loginInfo.user_name + '/注销': '登录';
        if (loginInfo.user_name) {
            loginDom = <li onClick={this.leaveHandler}>{loginInfo.user_name}/注销</li>
        } else {
            loginDom = <li data-path="/login" onClick={this.clickHandler}>登陆</li>;
        }
        if (loginInfo.type == 'admin') {
            isShowManage = true;
        }

        return (<ul className="nav">
                    <li data-path="/index" onClick={this.clickHandler}>首页</li>
                    <li data-path="/archive" onClick={this.clickHandler}>归档</li>
                    <li data-path="/manage" onClick={this.clickHandler} style={{display: isShowManage ? 'block': 'none'}}>管理</li>
                    {loginDom}                     
               </ul>)
    }

    render() {
    	//let userData = indexUserData.result || {};
        //<h2>{userData.blog_motto}</h2>
        const me = this; 
        let userData = me.props.data || {};

        return (
            <header>
                <div className="user-info">
                    <div className="img-logo">
                        <img src={userData.avatar_url} alt=""/>
                    </div>
                    <div className="text-logo">
                        <h1>
                            <a href="/">{userData.text_logo}</a>
                        </h1>
                    </div>
                    {me.getNavDom()}
                </div>
             </header>
        )
    }
}
