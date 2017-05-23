//ManagePage.js 文章管理页

import '../../static/css/layout.less';
import './manage.less';
import React, { Component } from 'react';
import { render } from 'react-dom';
import HeaderNav from '../../components/headerNav/HeaderNav';
import SwitchTab from '../../components/switchTab/SwitchTab';
import ManageArcItem from './ManageArcItem';
var HomeStore = require('../../components/HomeStore');
console.log('HomeStore manage', HomeStore);

export default class ManagePage extends React.Component {
    
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
	    //获取用户信息
        HomeStore.getUserInfoData();
        //获取文章列表数据
        HomeStore.getIndexArcData();
        me.initDom();
	}

	initDom = () => {
    	let tabs = document.querySelector('.tab-wrapper').childNodes;
    	let tabFirst = tabs[0];
    	tabFirst.classList.add('has-click');
    	console.log('tabs',tabs);
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

    afterGetIndexArc = (data) => {
        const me = this;
        console.log('IndexArcData=======',data);
        if(!data) {
            return;
        }
        me.setState({
            indexArc: data,
        });
    }

    jumpToEditArc = (tag) => {
        let url;
        if (tag == 'new') {
            let link = '/edit/new';
            url = location.href.replace(location.hash, '') + '#' + link;
            location.href = url;
        }
    }

    setTabData = () => {
    	let tabData = [{
    		title: '文章管理',
    		contentClass: 'article-con'
    	},{
    		title: '个人管理',
    		contentClass: 'personInfo-con'
    	},{
    		title: '新文章',
    		contentClass: 'newArticle-con',
            callback: this.jumpToEditArc
    	}];
    	return tabData;
    }

    setPersonInfo = () => {
    	const me = this;
    	let userData = me.state.userInfo || {};
    	let contentDom = [{
    		type: 'Input',
    		name: '昵称',
    		dafaultValue: userData.user_name || '请输入昵称',
    		required: true,
    		callback: me.nameHandler
    	},{
            type: 'Input',
            name: '密码',
            dafaultValue: userData.password || '请输入密码',
            required: true,
            callback: me.passwordHandler
        },{
            type: 'Input',
            name: '邮箱',
            dafaultValue: userData.email || '请输入邮箱',
            required: false,
            callback: me.emailHandler
       
    	},{
    		type: 'Input',
    		name: '地址',
    		dafaultValue: userData.location || '请输入地址',
    		required: false,
    		callback: me.locationHandler
    	},{
    		type: 'Input',
    		name: '头像',
    		dafaultValue: userData.avatar_url || '请输入有效的头像地址',
    		required: true,
    		callback: me.avatarPicHandler
    	},{
    		type: 'Input',
    		name: '个性签名',
    		dafaultValue: userData.blog_motto || '请输入个性签名',
    		required: true,
    		callback: me.motoHandler
    	},{
    		type: 'Input',
    		name: '友情链接',
    		dafaultValue: userData.blog_motto || '请输入友情链接',
    		required: true,
    		callback: me.linkHandler
    	}];
    	return contentDom;
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

        //新文章点击后跳转至新建文章页面
        if (conClass == 'newArticle-con') {
            this.jumpToEditArc('new');
        }
    }

    //文章管理内容
    getArticleCon = () => {
    	let arcData = this.state.indexArc || [];

    	return (<div className="article-con">
    				<div className="arc-list">
    					{
    						arcData.map(function(item, index) {
    							return (<ManageArcItem key={"managearc"+index} data={item}></ManageArcItem>)
    						})
    					}
    				</div>
    				<div className="pagination"></div>
    		   </div>)

    }

    //个人信息内容
    getPersonCon = () => {
    	let personInfo = this.setPersonInfo();
    	console.log('personInfo', personInfo);
    	return (<div className="personInfo-con">
    				{
    					personInfo.map(function(item, i) {
    						let requiredTag = item.required ? '*' : '';
    						let callback = item.callback && item.callback;
    						if (item.type == 'Input') {
    							return (<div className="input-wrapper">
    										<sapn className="required-tag">{requiredTag}</sapn>
    										<span>{item.name}</span>
    										<input type="text" name={item.name} placeholder={item.dafaultValue}/>
    								   </div>)
    						}
    					})
    				}
    				<div className="save">保存</div>
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
    	let userData = me.state.userInfo || {};
        let arcData = me.state.indexArc || [];
        let tabData = me.setTabData();
        console.log('manage Data', userData,tabData);

        return (
            <div className="manage-wrapper">
                <HeaderNav data={userData}></HeaderNav>
                <div className="container">
                    <div className="main">  
                    	<div className="manage-tab">
        		        	<div className="tab-wrapper">
        		        		{
        							tabData.map(function(item, index) {
        								return (<span data-index={index} data-conclass={item.contentClass} 
                                                    onClick={me.tabClickHandler.bind(me)}>{item.title}
                                               </span>)
        							})
        		        		}
        		        	</div>
        		        	{this.renderCon()}
                    	</div>            
                    </div>
                </div>
            </div>
        )
    }
}