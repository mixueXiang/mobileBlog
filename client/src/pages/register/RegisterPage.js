//RegisterPage.js 注册页

import '../../static/css/layout.less';
import '../login/login.less';
import React, { Component } from 'react';
import { render } from 'react-dom';
import HeaderNav from '../../components/headerNav/HeaderNav';
import AlertDialog from '../../components/alertDialog/AlertDialog';
var HomeStore = require('../../components/HomeStore');

export default class RegisterPage extends React.Component {
    
	constructor(props) {
	    super(props);
	    this.state = {
	        userInfo: {},
            validInfo: '',
            loginInfo: {},
            showDialog: false,
            dialogMsg: ''
	    };
	    HomeStore.dispose();
	    HomeStore.listen(['userInfo', 'doRegister'], this);
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

    afterGetDoRegister = (data) => {
        const me = this;
        let loginInfo = {};
        let validInfo = '';
        if(!data) {
            return;
        }
        if (data.error_code == 0) {
            this.setState({
                showDialog: true,
                dialogMsg: data.error_msg
            });
        } else {
            this.setState({
                validInfo: data.error_msg,
            });
        }
    }

    registerHandler = () => {
        let userName = this.refs.userName;
        let password = this.refs.password;
        let passwordAgain = this.refs.passwordAgain;
        let params = {};

        //输入有效性验证
        if (userName.length > 8) {
            this.setState({
                validInfo: '用户名不能超过8位'
            });
            return;
        }
        if (userName.value == '') {
            this.setState({
                validInfo: '用户名不能为空'
            });
            return;
        }
        if (password.length > 10) {
            this.setState({
                validInfo: '用户密码不能超过10位'
            });
            return;
        }
        if (password.value == '') {
            this.setState({
                validInfo: '用户密码不能为空'
            });
            return;
        }
        if (passwordAgain.value == '') {
            this.setState({
                validInfo: '请再次输入密码'
            });
            return;
        }
        if (password.value != passwordAgain.value) {
            this.setState({
                validInfo: '密码不一致，请重新输入'
            });
            return;
        }
 
        params = {
            user_name: userName.value || '',
            password: password.value || ''
        }
        HomeStore.doRegister(params);
    }

    closeDialog = (type) => {
        this.setState({
            showDialog: false,
        }, () => {
            if (type == 'registerSuccess') {
                location.href = location.href.replace(location.hash, '') + '#' + '/login';
            }
        });
    } 

    render() {
    	const me = this;
    	let userData = me.state.userInfo || {};
        let validInfo = me.state.validInfo;

        return (
            <div className="wrapper">
                <HeaderNav data={userData}></HeaderNav>
                <div className="container">
                    <AlertDialog dialogShow={me.state.showDialog} content={me.state.dialogMsg}  close={this.closeDialog.bind(this,'registerSuccess')}></AlertDialog>
                    <div className="main">  
                    	<div className="login-wrapper">
                    		<div className="input-wrapper">
                    			<label>账号：</label><input ref="userName" type="text" placeholder="请输入账号"/><br/>
                    			<label>密码：</label><input ref="password" type="password" name="password1" placeholder="请输入密码"/><br/>
                                <label>确认密码：</label><input ref="passwordAgain" type="password" name="password2" placeholder="再次输入密码"/>
                    			<h3 className="error-info" ref="validInfo">{validInfo}</h3>
                    			<div className="login-conform" onClick={me.registerHandler}>注册</div>
                    		</div>
                    		<div className="else-login">
                                
                    		</div>
                    	</div>                
                    </div>
                </div>
            </div>
        )
    }
}
