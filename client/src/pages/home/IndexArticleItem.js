//IndexArticleItem.js 首页文章列表Item

require('./indexArticleItem.less');
import React, { Component } from 'react';
import { render } from 'react-dom';
import {Link} from 'react-router-dom';

import {wrapperClick} from '../../utils/tap';


export default class IndexArticleItem extends React.Component {
   
    handlerTap(e) {
        var cur = e.currentTarget;
        var link = cur.getAttribute('data-href');
        var url = location.href.replace(location.hash, '') + '#' + link;
        location.href = url;
    }
   
    render() {
    	let userName = this.props.userName || '';
        let articleData = this.props.data;
        let link = '/detail/' + articleData._id;
        return (
            <div>
            	<article>
        			<div className="article-title" data-href={link} onClick={wrapperClick(this.handlerTap.bind(this))}>
                        {articleData.title}
                    </div>
            		<p className="article-author">By <strong>{userName}</strong></p>
            		<p className="article-time">发表于&nbsp;{articleData.timestamp}</p>
            		<div className="article-content">
            			<p className="article-remark">{articleData.remark}</p>
            			<p className="article-more-link" data-href={link} onClick={wrapperClick(this.handlerTap.bind(this))}>
            				<span>Read more</span>
            			</p>
            		</div>
                    <div className="post-info">
                        <span>阅读({articleData.read_count})</span>
                        <sapn>评论({articleData.comment_list.length})</sapn>
                        <span>赞({articleData.upvote_count})</span>
                    </div>
            	</article>
            </div>
        )
    }
}
