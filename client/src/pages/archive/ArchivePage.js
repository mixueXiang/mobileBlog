//ArchivePage.js 文章归档页
//
require('../../static/css/layout.less');
require('./archive.less');
import React, { Component } from 'react';
import { render } from 'react-dom';
import {Link} from 'react-router-dom';
import HeaderNav from '../../components/headerNav/HeaderNav';
import FooterInfo from '../../components/footerInfo/FooterInfo';
import ArchiveArticleItem from './ArchiveArticleItem';
import {indexArcData, indexUserData} from '../../static/js/indexData';
var HomeStore = require('../../components/HomeStore');

export default class ArchivePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            indexArc: [],
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

    render() {
        //let arcData = indexArcData.result || [];
		//let userData = indexUserData.result || {};
        const me = this;
        let userData = me.state.userInfo || {};
        let arcData = me.state.indexArc || [];
        return (
            <div className="wrapper">
                <HeaderNav data={userData}></HeaderNav>
                <div className="container">
                    <div className="main">
                    	<div className="article-archive"></div>
                    	<div className="article-list">
                    		{
	                            arcData.map(function(item, i){
	                                return (
	                                    <ArchiveArticleItem key={'article-' + i} nIndex={i} data={item}></ArchiveArticleItem> 
	                                )
	                            })
                        	}
                    	</div>                       
                    </div>
                    <div className="asidepart"></div>
                </div>
                <FooterInfo data={userData}></FooterInfo>
            </div>
        )
    }
}
