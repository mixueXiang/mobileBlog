//PayPage.js 支付页面
//import './pay.less' 
import React, { Component } from 'react';
import { render } from 'react-dom';
require('../static/css/layout.less');

export default class PayPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            indexArc: [],
        };
    }

    componentDidMount() {
        const me = this;
        this.changeHandler();

    }

    changeHandler = () => {
    	var inputs = document.getElementsByTagName('input');
    	for (let i = 0; i < inputs.length; i++) {
    		console.log(1);
    		inputs[i].onchange = function(e) {
    			console.log(2);
    			console.log('e.target.value.length',e.target.value.length);
    			console.log('e.target.maxlenth',inputs[i].maxLength);
    			if (e.target.value.length == inputs[i].maxLength) {
    				console.log('==');
    				if (inputs[i+1]) {
    					inputs[i+1].focus();
    				}    				
    			}
    		}
    	}
    } 

    getInputArr = () => {
    	console.log('push');
    	let arr = [];
    	let count = 6;
    	for (let i = 0; i < count; i++) {
    		arr.push(<input type="text" name={"input"+i} maxlength='1'/>);
    	}
    	return arr;
    }

    render() {
        const me = this;
    
        return (
            <div className="wrapper">
            	{this.getInputArr()}
            	'aaa'
            </div>
        )
    }
}
