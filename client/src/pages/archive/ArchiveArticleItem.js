//ArchiveArticleItem.js
//文章归档页文章卡片
import React, { Component } from 'react';
import { render } from 'react-dom';
import {Link} from 'react-router-dom';
import {wrapperClick} from '../../utils/tap';
let Utils = require('../../utils/Utils');

export default class ArchiveArticleItem extends React.Component {
    
    handlerTap(e) {
        let cur = e.currentTarget;
        let link = cur.getAttribute('data-href');
        let url = location.href.replace(location.hash, '') + '#' + link;
        location.href = url;
    }

    render() {
    	let articleData = this.props.data;
        let link = '/detail/' + articleData._id;
        let time = Utils.getFormatTime(articleData.timestamp);
        return (
            <article className="article-li">
            	<div className="article-main" data-href={link} onClick={wrapperClick(this.handlerTap.bind(this))}>
            		<div className="time">{time}</div>
        			<div className="article-title">{articleData.title}</div>        				
            	</div>  
                <div className="post-info">
                    <span>阅读({articleData.read_count})</span>
                    <sapn>评论({articleData.comment_list.length})</sapn>
                    <span>赞({articleData.upvote_count})</span>
                </div>		
            </article>
        )
    }
}
