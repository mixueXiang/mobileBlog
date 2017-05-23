//ArchivePage.js 文章归档页

require('../../static/css/layout.less');
require('./archive.less');
import React, { Component } from 'react';
import { render } from 'react-dom';
import {Link} from 'react-router-dom';
import HeaderNav from '../../components/headerNav/HeaderNav';
import FooterInfo from '../../components/footerInfo/FooterInfo';
import ArchiveArticleItem from './ArchiveArticleItem';
import {indexArcData, indexUserData, tagsData} from '../../static/js/indexData';
let HomeStore = require('../../components/HomeStore');

export default class ArchivePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            indexArc: [],
            tagsArr: [],
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

    getSiblings = (ele) => {
        let siblings = [];
        let allEle = ele.parentNode.children;
        for (let i = 0; i < allEle.length; i++) {
            if (allEle[i] != ele) {
                siblings.push(allEle[i]);
            }
        }
        return siblings;
    }
 
    tagHandler = (e) => {
        let cur = e.currentTarget;
        let tagId = cur.getAttribute('data-id');
        let allEle = cur.parentNode.children;
        for (let i = 0; i < allEle.length; i++) {
            allEle[i].classList.remove('has-click');
        }
        cur.classList.add('has-click');
        console.log('clickTag'+tagId,cur);
        //点击分类获取数据，填充到indexArc
    }

    render() {
        //let arcData = indexArcData.result || [];
		//let userData = indexUserData.result || {};
        console.log('tagsData',tagsData);
        let tagsArr = tagsData.result || [];

        const me = this;
        let userData = me.state.userInfo || {};
        let arcData = me.state.indexArc || [];
        return (
            <div className="archive-wrapper">
                <HeaderNav data={userData}></HeaderNav>
                <div className="container">
                    <div className="main">
                    	<div className="article-tags">
                            <div className="archive-icon">归档</div>
                            <div className="tag-title">
                                {
                                    tagsArr.map(function(item, i){
                                        return (
                                            <div className="tag-item" data-key={'tag-' + i} data-id={item.tag_id} 
                                                onClick={me.tagHandler.bind(me)}>{item.tag_name}
                                            </div> 
                                        )
                                    })
                                }
                            </div>
                        </div>

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
                </div>
                <FooterInfo data={userData}></FooterInfo>
            </div>
        )
    }
}
