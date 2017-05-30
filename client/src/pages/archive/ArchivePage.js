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
            tagInfo: [],
            tagArc: []
        };
        HomeStore.dispose();
        HomeStore.listen(['userInfo','indexArc','tagArc'], this);
    }

    componentDidMount() {
        const me = this;
        //获取用户信息
        HomeStore.getUserInfoData();
        //获取文章列表数据
        HomeStore.getIndexArcData();
    }

   /* shouldComponentUpdate(nextProps,nextstate) {
        if(this.state.tagInfo != nextstate.tagInfo ){
            return true;
        }
    }*/

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

    afterGetTagArc = (data)=> {
        const me = this;
        console.log('IndexArcData=======',data);
        if(!data) {
            return;
        }
        me.setState({
           tagArc: data,
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
        }, () => {
            this.getTagData();
        });

    }

    getTagData = () => { //标签去重
        let data = this.state.indexArc;
        console.log('getTagData', data);
        let tempTagArr = []; 
        let hash = {};
        let tag = '';
        for (let i = 0; i < data.length; i++) {
            tag = data[i].archive_type;
            if (!hash[tag]) {
                hash[tag] = true;
                tempTagArr.push(tag);
            }
        }
        this.setState({
            tagInfo: tempTagArr
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
        let tagId = cur.getAttribute('data-tag');
        let allEle = cur.parentNode.children;
        for (let i = 0; i < allEle.length; i++) {
            allEle[i].classList.remove('has-click');
        }
        cur.classList.add('has-click');
        console.log('clickTag'+tagId,cur);
        //点击分类获取数据，填充到indexArc
        HomeStore.getArcByTag({
            tag: tagId
        });
    }

    render() {
        //let arcData = indexArcData.result || [];
		//let userData = indexUserData.result || {};
        console.log('tempTagArr from database', this.state.tagInfo);

        const me = this;
        let userData = me.state.userInfo || {};
        let arcData = (me.state.tagArc.length == 0) ? me.state.indexArc : me.state.tagArc;
        let tagsData = me.state.tagInfo || [];

        return (
            <div className="archive-wrapper">
                <HeaderNav data={userData}></HeaderNav>
                <div className="container">
                    <div className="main">
                    	<div className="article-tags">
                            <div className="archive-icon">归档</div>
                            <div className="tag-title">
                                {
                                    tagsData.map(function(item, i){
                                        return (
                                            <div className="tag-item" data-key={'tag-' + i} data-tag={item}
                                                onClick={me.tagHandler.bind(me)}>{item}
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
