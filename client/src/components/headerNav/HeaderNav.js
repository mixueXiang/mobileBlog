require('./headerNav.less');
import React, { Component } from 'react';
import { render } from 'react-dom';
import {Link} from 'react-router-dom';
import { indexUserData, indexArcData} from '../../static/js/indexData';
let Utils = require('../../utils/Utils');

export default class HeaderNav extends React.Component {

    componentDidMount() {
        const me = this;
    }

    render() {
    	//let userData = indexUserData.result || {};
        const me = this; 
        let userData = me.props.data || {};
        let arcData = indexArcData.result || {};
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
                        <h2>{userData.blog_motto}</h2>
                    </div>
                    <ul className="nav">
                        <li><Link to="/index">首页</Link></li>
                        <li><Link to="/archive">归档</Link></li>
                        <li><Link to="/manage">管理</Link></li>
                        <li><Link to="/login">登陆/注册</Link></li>                        
                    </ul>
                </div>
             </header>
        )
    }
}
