//EditPage 编辑文章页
import '../../static/css/layout.less';
import './edit.less';
import React, { Component } from 'react';
import { render } from 'react-dom';
import HeaderNav from '../../components/headerNav/HeaderNav';
import {indexArcData, indexUserData, tagsData} from '../../static/js/indexData';
import AlertDialog from '../../components/alertDialog/AlertDialog';
let HomeStore = require('../../components/HomeStore');


export default class EditPage extends React.Component {
    
	constructor(props) {
	    super(props);
	    this.state = {
	        userInfo: {},
	        arcDetail: {},
	        articleId: '',
            showDialog: false,
            dialogMsg: ''

	    };
	    HomeStore.dispose();
	    HomeStore.listen(['userInfo', 'arcDetail', 'addArticle','editArticle'], this);
	}

	componentDidMount = () => {
        const me = this;
        console.log('parames',me.props);
        let article_id = me.props.match.params.id || '';

        //获取用户信息
        HomeStore.getUserInfoData();
        //获取文章详情数据
        if (article_id) { //当前页是编辑文章页
            HomeStore.getArcDetail({'article_id': article_id});
            this.setState({
                articleId: article_id
            });
        } else {
            this.setState({
                articleId: 'new'
            });
        }
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
        });
    }

    afterGetAddArticle = (data) => {
        const me = this;
        console.log('=====addRrticle',data);
        if(!data) {
            console.log('addRrticleFailed',data);
            me.setState({
                showDialog: true,
                dialogMsg: '添加文章失败'
            });
        } else {
            console.log('addRrticleSuccess',data);
            me.setState({
                showDialog: true,
                dialogMsg: '添加文章成功'
            });
            let link = '/manage';
            location.href = location.href.replace(location.hash, '') + '#' + link;
        }     
    }

    afterGetEditArticle = (data) => {
        const me = this;
        console.log('=====editRrticle',data);
        if(!data) {
            console.log('editRrticleFailed',data);
            me.setState({
                showDialog: true,
                dialogMsg: '修改文章失败'
            });
        } else {
            console.log('editRrticleSuccess',data);
            me.setState({
                showDialog: true,
                dialogMsg: '修改文章成功'
            });
        }       
    }

    tagClickHandler = (e) => {
        let curArcDetail = this.state.arcDetail;
        let cur = e.currentTarget;
        let tagId = cur.getAttribute('data-id');
        let tagName = cur.getAttribute('data-name');
        let allEle = cur.parentNode.children;

        for (let i = 0; i < allEle.length; i++) {
            allEle[i].classList.remove('has-click');
        }
        cur.classList.add('has-click');
        curArcDetail['archive_type'] = tagName;
        this.setState({
            arcDetail: curArcDetail
        });
    } 

    //保存修改或者新增内容到文章的状态中
    inputChangeHandler = (e) => {
        let cur = e.currentTarget;
        let curArcDetail = this.state.arcDetail;

        curArcDetail[cur.name] = cur.value;
        console.log('===curArcDetail',curArcDetail);
        this.setState({
             arcDetail: curArcDetail
        }); 
    }

    saveInfo = () => {
        let arcDetail = this.state.arcDetail;
        let articleId = this.state.articleId;
        let params = {};
        console.log('saveArticleInfo',arcDetail);

        //数据有效性验证
        if (!arcDetail.title) {
            this.setState({
                showDialog: true,
                dialogMsg: '文章题目不能为空'
            });
            return;
        }
        if (!arcDetail.remark) {
            this.setState({
                showDialog: true,
                dialogMsg: '文章摘要不能为空'
            });
            return;
        }
        if (!arcDetail.detail) {
            this.setState({
                showDialog: true,
                dialogMsg: '文章内容不能为空'
            });
            return;
        }
        if (!arcDetail.archive_type) {
            this.setState({
                showDialog: true,
                dialogMsg: '文章分类标签不能为空'
            });
            return;
        }

        //当数据有效时，向新增文章接口发起请求
        if (articleId != 'new') {//编辑文章页
            params = {
                'arc_id': articleId,
                'arc_detail': JSON.stringify(arcDetail)
            };
            HomeStore.editArticle(params);
            
        } else { //新建文章页
            params = {
                'arc_detail': JSON.stringify(arcDetail)
            };
            HomeStore.addArticle(params);
        }
    }

    closeDialog = () => {
        this.setState({
            showDialog: false,
        });
    }

    render() {

    	const me = this;
        let userData = me.state.userInfo || {};
        let arcDetail = me.state.arcDetail || {};
        console.log('tagsData',tagsData);
        let tagsArr = tagsData.result || [];
        
        return (
            <div className="edit-wrapper">
                <HeaderNav data={userData}></HeaderNav>
                <div className="container">
                    <AlertDialog dialogShow={me.state.showDialog} content={me.state.dialogMsg}  close={this.closeDialog}></AlertDialog>
                    <div className="main"> 
                        <div className="edit-content">
                            <div className="input-wrapper">
                                <h3>标题</h3>
                                <input type="text" name="title" autofocus="autofocus" maxlength="30" required="required" value={arcDetail.title} onChange={this.inputChangeHandler}/>
                            </div>
                            <div className="input-wrapper">
                                <h3>摘要</h3>
                                <textarea name="remark" id="" cols="30" rows="4" required="required" maxlength="160" value={arcDetail.remark} onChange={this.inputChangeHandler}></textarea>
                            </div>
                            <div className="input-wrapper con-detail">
                                <h3>内容</h3>
                                <textarea name="detail" id="" cols="30" rows="10" required="required" maxlength="3000" value={arcDetail.detail} onChange={this.inputChangeHandler}></textarea>
                            </div>
                            <div className="input-wrapper con-tag">
                                <h3>分类</h3>
                                <div className="has-tags">
                                    {
                                        tagsArr.map((item, index) => {
                                            return (<span data-id={item.tag_id} data-name={item.tag_name} onClick={this.tagClickHandler}>{item.tag_name}</span>)
                                        })
                                    }
                                </div>
                                <input type="text" ref="archiveType" name="archive_type" maxlength="6" placeholder="请添加新分类" value={arcDetail.archive_type} onChange={this.inputChangeHandler}/>
                            </div>
                            <div className="save" onClick={this.saveInfo}>保存</div>
                        </div>                     
                    </div>
                    <div className="asidepart"></div>
                </div>
            </div>
        )
    }
}
