//EditPage 编辑文章页
import '../../static/css/layout.less';
import './edit.less';
import React, { Component } from 'react';
import { render } from 'react-dom';
import HeaderNav from '../../components/headerNav/HeaderNav';
let HomeStore = require('../../components/HomeStore');


export default class EditPage extends React.Component {
    
	constructor(props) {
	    super(props);
	    this.state = {
	        userInfo: {},
	        arcDetail: {},
	        article_id: ''
	    };
	    HomeStore.dispose();
	    HomeStore.listen(['userInfo', 'arcDetail'], this);
	}

	componentDidMount = () => {
        const me = this;
        console.log('parames',me.props);
        let article_id = me.props.match.params.id || '';
        console.log('=====paramsid',article_id);
        //获取用户信息
        HomeStore.getUserInfoData();
        //获取文章详情数据
        HomeStore.getArcDetail({'article_id': article_id});
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

    afterGetArcDetail = (data) => {
        const me = this;
        console.log('ArcDetailData=======',data);
        if(!data) {
            return;
        }
        me.setState({
            arcDetail: data,
            article_id: data._id,
        });
    }

    render() {

    	const me = this;
        let userData = me.state.userInfo || {};
        let arcDetail = me.state.arcDetail || {};
        
        return (
            <div className="edit-wrapper">
                <HeaderNav data={userData}></HeaderNav>
                <div className="container">
                    <div className="main"> 
                        <div className="edit-content">
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
            </div>
        )
    }
}
