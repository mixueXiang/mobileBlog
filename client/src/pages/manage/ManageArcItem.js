//ManageArcItem.js
//文章管理页卡片
import React, { Component } from 'react';
import { render } from 'react-dom';
import {Link} from 'react-router-dom';
import {wrapperClick} from '../../utils/tap';

export default class ArchiveArticleItem extends React.Component {
    
    handlerTap(e) {
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

    render() {
    	let articleData = this.props.data;
        let link = '/edit/' + articleData._id;
        return (
            <article className="article-li">
            	<div className="article-main" data-href={link} onClick={wrapperClick(this.handlerTap.bind(this))}>
            		<div className="time">{articleData.timestamp}</div>
        			<div className="article-title">{articleData.title}</div>        				
            	</div>  
                <div className="article-act">
                    <span>评论管理</span>
                    <sapn data-href={link} onClick={this.jumpToEditPage}>编辑</sapn>
                    <span>删除</span>
                </div>		
            </article>
        )
    }
}
