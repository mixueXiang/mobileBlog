require('../../static/css/layout.less');
import React, { Component } from 'react';
import { render } from 'react-dom';
import {Link} from 'react-router-dom';
import HeaderNav from '../../components/headerNav/HeaderNav';
import FooterInfo from '../../components/footerInfo/FooterInfo';
import IndexArticleItem from './IndexArticleItem';
import {indexArcData, indexUserData} from '../../static/js/indexData';
var HomeStore = require('../../components/HomeStore');


export default class HomePage extends Component {

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
        //获取个人信息数据
        HomeStore.getUserInfoData();
        //获取首页文章数据
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
        const me = this;
        //let userData = indexUserData.result || {};
        //let arcData = indexArcData.result || [];
        let userData = me.state.userInfo || {};
        let arcData = me.state.indexArc || [];
        
        return (
            <div className="wrapper">
                <HeaderNav data={userData}></HeaderNav>
                <div className="container">
                    <div className="main">
                        <div className="index-article">
                            {
                                arcData.map(function(item, i){
                                    return (
                                        <IndexArticleItem key={'article-' + i} nIndex={i} data={item} userName={userData.user_name}></IndexArticleItem> 
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
