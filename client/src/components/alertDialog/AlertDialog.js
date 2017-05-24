//AlertDialog.js 弹窗组件

import './alertDialog.css';
import React, { Component } from 'react';
import { render } from 'react-dom';

export default class AlertDialog extends React.Component {
   
    componentDidMount = () => {
        this.center();
    }

    center = () => {
        let dialog = document.querySelector('.component-modal-dialog .dialog');
        //dialog.style.left = ((window.innerWidth - dialog.offsetWidth) /2)+"px";
        dialog.style.top = ((window.innerHeight - dialog.offsetHeight) /2)+"px";
    }

    getbutton = () => {
        const me = this;
        if(me.props.close && me.props.confirm){
            return (<div>
                        <a className="close-btn half-close-btn" onTouchStart={me.props.close}>关闭</a>
                        <a className="close-btn half-confirm-btn" onTouchStart={me.props.confirm}>确认</a>
                    </div>)
        }
        return <a className="close-btn" onTouchStart={me.props.close}>关闭</a>
    }
   
    render() {
        const me = this;
        return (
            <div className="component-modal-dialog" style={{display: this.props.dialogShow ? 'block': 'none'}}>
                <div className="dialog-mask" onTouchStart={me.props.close}></div>
                <div className="dialog">
                    <div className="modal-body">
                        <div className="component-alert-content">
                            {me.props.content ? me.props.content : me.props.children}
                        </div>
                    </div>
                    <div className="modal-button">
                        {me.getbutton()}
                    </div>
                </div>
            </div>
        )
    }
}