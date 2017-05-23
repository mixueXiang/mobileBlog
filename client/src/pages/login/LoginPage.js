//LoginPage.js 登陆页

import '../../static/css/layout.less';
import './login.less';
import React, { Component } from 'react';
import { render } from 'react-dom';
import HeaderNav from '../../components/headerNav/HeaderNav';
var HomeStore = require('../../components/HomeStore');

export default class LoginPage extends React.Component {
    
	constructor(props) {
	    super(props);
	    this.state = {
	        userInfo: {},
	    };
	    HomeStore.dispose();
	    HomeStore.listen(['userInfo'], this);
	}

	componentDidMount() {
	    const me = this;
	    //获取用户信息
	    HomeStore.getUserInfoData();
	}

	afterGetUserInfo = (data) => {
	    const me = this;
	    console.log('UserData=======',data);
	    if(!data) {
	        return;
	    }
	    me.setState({
	        userInfo: data,
	    });
	}

    render() {
    	const me = this;
    	let userData = me.state.userInfo || {};

        return (
            <div className="wrapper">
                <HeaderNav data={userData}></HeaderNav>
                <div className="container">
                    <div className="main">  
                    	<div className="login-wrapper">
                    		<h3 className="notice-info">非管理员请采用底部的第三方工具登录</h3>
                    		<div className="input-wrapper">
                    			<label>账号：</label><input type="text" placeholder="请输入账号"/><br/>
                    			<label>密码：</label><input type="password" placeholder="请输入密码"/>
                    			<h3 className="error-info">账号密码不匹配</h3>
                    			<div className="login-conform">登录</div>
                    		</div>
                    		<div className="else-login">
                    			<p>用户请使用第三方工具进行登录</p>
                    		</div>
                    	</div>                
                    </div>
                </div>
            </div>
        )
    }
}
