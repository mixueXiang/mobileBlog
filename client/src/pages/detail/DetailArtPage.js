//ArchivePage.js 文章归档页

require('../../static/css/layout.less');
require('./detail.less');
import React, { Component } from 'react';
import { render } from 'react-dom';
import {Link} from 'react-router-dom';
import HeaderNav from '../../components/headerNav/HeaderNav';
import FooterInfo from '../../components/footerInfo/FooterInfo';
import {indexArcData, indexUserData, detailArticleData, commentData} from '../../static/js/indexData';
import AlertDialog from '../../components/alertDialog/AlertDialog';
var HomeStore = require('../../components/HomeStore');
let Utils = require('../../utils/Utils');

export default class DetailArtPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            indexArc: [],
            arcDetail: {},
            commentList: [],
            read_count: 0,
            article_id: '',
            loginInfo: {},
            dialogMsg: '',
            showDialog: false,
            upVote: false,
        };
        HomeStore.dispose();
        HomeStore.listen(['userInfo','indexArc', 'arcDetail', 'commentList', 'addReading', 'postComment', 'upvote'], this);
    }

    componentDidMount = () => {
        const me = this;
        console.log('parames',me.props);
        let article_id = me.props.match.params.id || '';
        console.log('=====paramsid',article_id);
        //获取登陆信息
        this.getLoginInfo();
        //获取用户信息
        HomeStore.getUserInfoData();
        //获取文章列表数据
        HomeStore.getIndexArcData();
        //获取评论列表数据
        HomeStore.getCommentData({'article_id': article_id});
        //获取文章详情数据
        HomeStore.getArcDetail({'article_id': article_id});
    }

    getLoginInfo = () => {
         let loginData = Utils.getLoginInfo() || {};
         this.setState({
            loginInfo: loginData
         });
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
    afterGetCommentList = (data) => {
        const me = this;
        if(!data) {
            return;
        }
       me.setState({
            commentList: data,
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

    afterGetPostComment = (data) => {
        const me = this;
        let commentList = this.state.commentList;
        console.log('PostommentData=======',data);
        if(!data) {
            return;
        }
        //前端页面插入一条评论
        commentList.unshift(data);
        this.setState({
            commentList: commentList
        });
    }

    //发表评论
    sendComment = () => {
        let loginName = this.state.loginInfo.user_name;
        let inputValue = this.refs.inputComment.value;
        let params = {};
        console.log('=======sendComment');
        if (loginName) {//处于登陆状态
            if (inputValue.length == 0) {
                this.setState({
                    dialogMsg: '评论内容不能为空',
                    showDialog: true,
                });
            } else {
                params = {
                    'article_id': this.state.article_id,
                    'commentor': loginName,
                    'comment': inputValue,
                    'timestamp': Date.now()
                };
                HomeStore.postComment(params);
            }
        } else {//用户未登陆
            this.setState({
                dialogMsg: '登陆后才能发表评论，去登陆',
                showDialog: true,
            });
        }
    }

    //点赞和取消点赞
    handleUpvote = () => {
        let loginName = this.state.loginInfo.user_name;
        let voteState;
        let params = {};
        if (loginName) {//处于登陆状态
            voteState = this.state.upVote ? 0 : 1;
            params = {
                'vote_state': voteState,
                'article_id': this.state.article_id,
                'upvotor': loginName,
            };
            HomeStore.doUpVote(params);
            this.setState({
                 upVote: !this.state.upVote
            });         
        } else {//用户未登陆
            this.setState({
                dialogMsg: '登陆后才能进行点赞，去登陆',
                showDialog: true,
            });
        }
    }

    closeDialog = () => {   
        this.setState({
            showDialog: false
        });        
    }

    confirmDialog = (type) => {
        let link = '/login';
        this.setState({
           showDialog: false
        });
        if (type == 'jumpToLogin') {
            let url = location.href.replace(location.hash, '') + '#' + link;
            location.href = url;
        }
    }

    getCommentDom = () => {
        let commentInfo = this.state.commentList || [];
        return (<div className="comments"> 
                    <div className="post-comment">
                        <h3>发表评论</h3>
                        <textarea name="input-comment" ref="inputComment" cols="30" rows="5"></textarea>
                        <h3 className="post-btn" onClick={this.sendComment}>发表</h3>
                    </div> 
                    <div className="comment-list">
                        <h3>评论<span className="comment-count">{commentInfo.length}</span></h3>
                        {
                            commentInfo.map((item, i) => {
                                let formatTime = Utils.getFormatTime(item.timestamp);
                                console.log(' Utils.getFormatTime', Utils.getFormatTime('1496141174618'));
                                return(<setion className="comment-item">
                                        <div className="avator">
                                            <img src={item.avator} alt=""/>
                                        </div>
                                        <div className="text">
                                            <h3 className="commentor">{item.commentor}</h3>
                                            <h3 className="comment-time">{formatTime}</h3>
                                            <p className="comment-content">{item.comment}</p>
                                        </div>
                                    </setion>)
                            })
                        }
                    </div>      
                </div>)
    }

    getContentDom = () => {
         let arcDetail = this.state.arcDetail || {};
         let userData = this.state.userInfo || {};
         console.log('arcDetail.timestamp', arcDetail.timestamp);
         let time = Utils.getFormatTime(arcDetail.timestamp);
        return (<div className="detail-content">
                    <div className="title-wrapper">
                        <p className="title">{arcDetail.title}</p>
                        <h3 className="post">
                            <span>发表于 {time}</span>
                            <span className="author">By <strong>{userData.user_name}</strong></span>
                        </h3>
                    </div>
                    <div className="remark">
                        <p>{arcDetail.remark}</p>
                    </div>
                    <div className="content">
                        <p>{arcDetail.detail}</p>
                    </div>
                    <div className="nextArc">
                        <h3>下一篇:</h3>
                        <p>js判断数据类型的几种方fa</p>
                    </div>
                    <div className=""></div>
            </div>)                     
    }

    render() {
    
        const me = this;
        console.log('localcommentData',commentData);
        let userData = me.state.userInfo || {};
        let loginName = me.state.loginInfo.user_name;
        let upvote = me.state.upVote;
        let confirmDialog = loginName ? '' : me.confirmDialog.bind(me, 'jumpToLogin');

        return (
            <div className="wrapper">
                <HeaderNav data={userData}></HeaderNav>
                <div className="container">
                    <AlertDialog dialogShow={me.state.showDialog} content={me.state.dialogMsg}  close={this.closeDialog} confirm={confirmDialog}></AlertDialog>
                    <div className="main"> 
                        {this.getContentDom()}    
                        {this.getCommentDom()}
                    </div>
                </div>
                <ul className="comment-wrapper">
                    <li><span className={upvote? "icon like-icon": "icon dislike-icon"} onClick={this.handleUpvote}></span>赞</li>
                </ul>
            </div>

        )
    }
}
