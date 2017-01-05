'use strict'
import dva from 'dva';
import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider ,connect} from 'react-redux';

module.exports = function(app){
	let PhoneSize = [
		{id:1,w:320,h:480,val:'iPhone 4'},
		{id:2,w:320,h:480,val:'iPhone 4s'},
		{id:3,w:320,h:568,val:'iPhone 5'},
		{id:4,w:375,h:667,val:'iPhone 6'},
		{id:5,w:414,h:736,val:'iPhone 6 Plus'},
		{id:6,w:384,h:640,val:'Galaxy S5'},
		{id:7,w:384,h:640,val:'Nexus 4'},
		{id:8,w:384,h:640,val:'Nexus 5'},
		{id:9,w:412,h:732,val:'Nexus 6'},
	]
	class Controller extends Component{
		render(){
			let self = this;
			let phoneCstyle ={
				width:this.props.phoneW+'px',
				height:this.props.phoneH+'px',
				marginLeft:-+(this.props.phoneW/2)+'px'
			}
			return (<div className="info-edit-phone">
								<div className="info-edit-phone-opear">
									<div className="info-phone-platform">
										<div className={"info-phone-platform-show "+(this.props.showPlatform?'show':'')} onClick={(e)=>this.showPlatform(e)}>
											<span className="">{this.props.showPlatformVal}</span>
											<i className={"fa "+(this.props.showPlatform?'fa-angle-up':'fa-angle-down')}></i>
										</div>
										<div className="info-phone-platform-list">
											{PhoneSize.map(function(i){
												let a = i;
												return <div className="info-phone-platform-list-i" onClick={(e)=>self.changePhoneSize(e,a)}>
																<div className="info-phone-platform-v">{i['val']}</div>
																<div className="info-phone-platform-size">{i['w']+' * '+i['h']}</div>
															</div>
											})}
										</div>
									</div>
								</div>
								<div className="info-edit-phone-container" style={phoneCstyle}>
									<iframe id="phone-outset" src={'file://'+basurl+'/src/template/phone.html'}/>
									<iframe id="phone-inset"/>
								</div>
							</div>
							)
		}
		componentDidMount(){
			let phoneOut = document.getElementById('phone-outset');
			let phoneIn = document.getElementById('phone-inset');
			let editor = document.getElementById('editor');
			let consoleContainer = document.getElementById('aaa');
			let self = this;
			phoneOut.onload = function(){
        phoneIn.src = self.props.project["src"]+'/index.html'
        // file:///'+basurl+'/src/template/phone-inset.html'
        phoneIn.onload=function(){
					phoneIn.contentWindow.JoywokMobileApp = phoneOut.contentWindow.JoywokMobileApp 
        }
        consoleContainer.src = self.props.project["src"]+'/index.html'
			}
		}
		showPlatform(evt){
			let target = $(evt.currentTarget);
			let dispatch = this.props.dispatch;
			dispatch({
				type:'info/showPlatform',
				payload:(target.hasClass('show')?false:true)
			})
		}
		changePhoneSize(evt,data){
			let dispatch = this.props.dispatch;
			dispatch({
				type:'info/changePhoneSize',
				payload:{
					showPlatform:false,
					showPlatformVal:data["val"],
      		phoneW:data['w'],
      		phoneH:data['h']
				}
			})
		}
		handleChange(){
		}
		change(data){
		}
	}
	return Controller
}