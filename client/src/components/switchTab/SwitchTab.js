//SwitchTab.js
import './switchTab.less';
import React, { Component } from 'react';
import { render } from 'react-dom';
let HomeStore = require('../HomeStore');
export default class SwitchTab extends React.Component {
	
	constructor(props) {
        super(props);
        this.state = {
        	userInfo: {},
            indexArc: [],
            clickIndex: 0,
            showConClass: 'article-con',
        };
        HomeStore.dispose();
        HomeStore.listen(['userInfo','indexArc'], this);
    }

    componentDidMount() {
        const me = this;
        me.initDom();
    }

    initDom = () => {
    	let tabs = document.querySelector('.tab-wrapper').childNodes;
    	let tabFirst = tabs[0];
    	tabFirst.classList.add('has-click');
    	console.log('tabs',tabs);
    }

    tabClickHandler = (e) => {
        let cur = e.currentTarget;
        let nIndex = cur.getAttribute('data-index');
        let conClass = cur.getAttribute('data-conclass');
        let allEle = cur.parentNode.children;
        for (let i = 0; i < allEle.length; i++) {
            allEle[i].classList.remove('has-click');
        }
        cur.classList.add('has-click');
        this.setState({
        	clickIndex: nIndex,
        	showConClass: conClass,
        });
    }

    //文章管理内容
    getArticleCon = () => {
    	return (<div className="article-con">
    				文章管理
    		   </div>)

    }

    //个人信息内容
    getPersonCon = () => {
    	return (<div className="personInfo-con">
    				个人信息管理
    		   </div>)

    }

    //新文章内容
    getNewArtileCon = () => {
    	return (<div className="newArticle-con">
    				新文章
    		   </div>)
    }

    //设置tab下的内容
    renderCon = () => {
    	let conClass = this.state.showConClass;
        let returnCon = '';

        switch(conClass) {
        	case 'article-con':
        		returnCon = this.getArticleCon();
        		break;
        	case 'personInfo-con': 
        		returnCon = this.getPersonCon();
        		break;
        	case 'newArticle-con': 
        		returnCon = this.getNewArtileCon();
        		break;
        }
        return (<div className="tab-content">{returnCon}</div>);            
    }

    render() {
    	const me = this;
    	let tabData = this.props.data || [];
    	console.log('tabData',tabData);
      
        return (
            <div>
            	<div className="tab-wrapper">
            		{
    					tabData.map(function(item, index) {
    						return <span data-index={index} data-conclass={item.contentClass} onClick={me.tabClickHandler.bind(me)}>{item.title}</span>
    					})
            		}
            	</div>
            	{this.renderCon()}
            </div>
        )
    }
}
