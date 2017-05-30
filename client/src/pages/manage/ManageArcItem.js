//ManageArcItem.js
//文章管理页卡片
import React, { Component } from 'react';
import { render } from 'react-dom';
import {Link} from 'react-router-dom';
import {wrapperClick} from '../../utils/tap';
let Utils = require('../../utils/Utils');

export default class ArchiveArticleItem extends React.Component {
    
    jumpToDetailPage(e) {
        let cur = e.currentTarget;
        let link = cur.getAttribute('data-href');
        let url = location.href.replace(location.hash, '') + '#' + link;
        location.href = url;
    }

    jumpToEditPage = (e) => {
        let cur = e.currentTarget;
        let link = cur.getAttribute('data-href');
        let url = location.href.replace(location.hash, '') + '#' + link;
        location.href = url;
    }

    delHandler = (e) => {
        let params = {};
        let cur = e.currentTarget;
        let nIndex = cur.getAttribute('data-index');
        let arcId = cur.getAttribute('data-id');
        params = {
            'arc_index': nIndex,
            'arc_id': arcId
        };
        this.props.delArticle && this.props.delArticle(params);
    }

    render() {
    	let articleData = this.props.data;
        let nIndex = this.props.nIndex;
        let editLink = '/edit/' + articleData._id;
        let detailLink = '/detail/' + articleData._id;
        let time = Utils.getFormatTime(articleData.timestamp);
        return (
            <article className="article-li">
            	<div className="article-main" data-href={detailLink} onClick={wrapperClick(this.jumpToDetailPage.bind(this))}>
            		<div className="time">{time}</div>
        			<div className="article-title">{articleData.title}</div>        				
            	</div>  
                <div className="article-act">
                    <span>评论管理</span>
                    <sapn data-href={editLink} onClick={this.jumpToEditPage}>编辑</sapn>
                    <span data-index={nIndex} data-id={articleData._id} onClick={wrapperClick(this.delHandler)}>删除</span>
                </div>		
            </article>
        )
    }
}
