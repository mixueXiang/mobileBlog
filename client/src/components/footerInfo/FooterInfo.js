//FooterInfo.js

require('./footerInfo.less');
import React, { Component } from 'react';
import { render } from 'react-dom';
import {Link} from 'react-router-dom';

export default class FooterInfo extends React.Component {
    render() {
    	let userData = this.props.data || {};
        return (
            <footer className="footer">
            	<div className="footer-main">
            		<div className="bottom-avator">
            			<div className="line"></div>
            			<div className="avator">
                            <img src={userData.avatar_url} alt=""/>
                        </div>
            		</div>
            		<div className="info">
            			<p>{userData.bottom_text}</p>
            		</div>
            		<div className="copyright">
            			<p>@copyright&nbsp;<strong>{userData.user_name}</strong></p>
            		</div>
            	</div>
            </footer>
        )
    }
}
