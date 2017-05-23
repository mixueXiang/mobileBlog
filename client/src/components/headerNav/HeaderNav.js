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
    clickHandler = (e) => {
        let cur = e.currentTarget;
        let allEle = cur.parentNode.children;
        for (let i = 0; i < allEle.length; i++) {
            allEle[i].classList.remove('has-click');
        }
        cur.classList.add('has-click');
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
                    <ul className="nav">
                        <li><Link to="/index" onClick={this.clickHandler.bind(this)}>首页</Link></li>
                        <li onClick={this.clickHandler.bind(this)}><Link to="/archive">归档</Link></li>
                        <li onClick={this.clickHandler.bind(this)}><Link to="/manage">管理</Link></li>
                        <li onClick={this.clickHandler.bind(this)}><Link to="/login">登陆</Link></li>                        
                    </ul>
                </div>
             </header>
        )
    }
}
