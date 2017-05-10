//ArchivePage.js 文章归档页
//
require('../../static/css/layout.less');
require('./detail.less');
import React, { Component } from 'react';
import { render } from 'react-dom';
import {Link} from 'react-router-dom';
import HeaderNav from '../../components/headerNav/HeaderNav';
import FooterInfo from '../../components/footerInfo/FooterInfo';
import {indexArcData, indexUserData, detailArticleData} from '../../static/js/indexData';
var HomeStore = require('../../components/HomeStore');

export default class DetailArtPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            indexArc: [],
            arcDetail: {},
            read_count: 0,
            article_id: ''
        };
        HomeStore.dispose();
        HomeStore.listen(['userInfo','indexArc', 'arcDetail', 'addReading'], this);
    }

    componentDidMount = () => {
        const me = this;
        console.log('parames',me.props);
        let article_id = me.props.match.params.id || '';
        console.log('=====paramsid',article_id);
        //获取用户信息
        HomeStore.getUserInfoData();
        //获取文章列表数据
        HomeStore.getIndexArcData();
        //获取文章详情数据
        HomeStore.getArcDetail({'article_id': article_id});

    }

    addReading = () => {
        //alert(3);
        const me = this;
        let count = me.state.read_count;
        me.setState({
            read_count: count + 1,
        });
        let params = {
            'read_count': count + 1 ,
            'article_id': me.state.article_id
        };
        HomeStore.setAddReading(params);
        console.log('====addReading',params);
    }

    afterGetAddReading = () => {
        
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

    afterGetArcDetail = (data) => {
        const me = this;
        console.log('ArcDetailData=======',data);
        if(!data) {
            return;
        }
        me.setState({
            arcDetail: data,
            read_count: data.read_count,
            article_id: data._id,
        }, () => {
            me.addReading();
            console.log('read_count',me.state.read_count);
        });
    }

    render() {
        //let arcData = indexArcData.result || [];
		//let userData = indexUserData.result || {};
        //let detailData = detailArticleData.result || {};
        const me = this;
        let userData = me.state.userInfo || {};
        let arcDetail = me.state.arcDetail || {};
        return (
            <div className="wrapper">
                <HeaderNav data={userData}></HeaderNav>
                <div className="container">
                    <div className="main"> 
                        <div className="detail-content">
                            <div className="title">
                                <p>{arcDetail.title}</p>
                            </div>
                            <div className="content">
                                <p>{arcDetail.detail}</p>
                            </div>
                        </div>                     
                    </div>
                    <div className="asidepart"></div>
                </div>
                <FooterInfo data={userData}></FooterInfo>
            </div>
        )
    }
}
