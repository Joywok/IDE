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
			let phoneInsetStyle = {
				top:(this.props.tabs.length!=0?"90px":'40px'),
				bottom:(this.props.footer.length!=0?'45px':'0px')
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
								<div className="info-edit-phone-container" id="info-edit-phone-container" style={phoneCstyle}>
							 		<div className={"phone-header "+(this.props.btns.length!=0?'has-btns':'')+(this.props.tabsBg.length!=0?' has-tabs tabs-bg-'+this.props.tabsBg:'')}>
							 			<div className="phone-title">{this.props.title}</div>
							 			{this.props.btns.length!=0?<div className="phone-btns">{this.props.btns.map(function(i){
							 				return <button onClick={(e)=>self.NavBtnClick(e,i)} disabled={i["disabled"]} className={"phone-btns-i "+(i["type"]>3?'phone-btns-i-specail':('phone-btns-i-'+i["type"]))} type="button">{i["name"]?i["name"]:''}</button>
							 			})}</div>:''}
							 		</div>
						 			{this.props.tabs.length!=0?<div className={"phone-tabs "+(' phone-tabs-num-'+this.props.tabs.length+' ')+(this.props.tabsBg.length!=0?' tabs-bg-'+this.props.tabsBg:'')}>{
							 			this.props.tabs.map(function(i){
							 				return <div className={"phone-tabs-i "+(i['active']?'active':'')} onClick={(e)=>self.TabClick(e,i)}>
							 								<div className="phone-tabs-i-val">{i["val"]}</div>
							 								<div className="phone-tabs-i-bg"></div>
							 							</div>
							 			})
							 		}</div>:''}
							 		<div className={"phone-container "+(this.props.tabs.length!=0?'has-tabs':'')} id="phone-container" style={phoneInsetStyle}></div>
							 		{this.props.footer.length!=0?<div className="phone-footer"></div>:''}
							 		<div className="phone-specail hide"></div>
								</div>
							</div>
							)
		}
		componentDidMount(){
			let self = this;
			let webview = document.createElement('webview');
			webview.setAttribute('partition', 'trusted');
			webview.setAttribute('allownw', 'true');
			webview.setAttribute('class', 'hide');
			webview.id = 'phone-inset';
			document.getElementById('phone-container').appendChild(webview);
			webview.addEventListener('permissionrequest', function (s) {
        s.request.allow()
      })
      webview.addEventListener('dialog', function (e) {
      	if(e.messageType == 'alert'){
      		window.alert(e['messageText'])
      	}else{
      		e.preventDefault()
      	}
      })
      webview.addEventListener('permissionrequest',function(e){
      	e.request.allow();
      })
			webview.addEventListener('contentload', function(e) {
				$("#phone-inset").removeClass('hide')
				e.target.contentWindow.postMessage({
					type:'init'
				},'*');
			});
			// webview.addEventListener('consolemessage', function(e) {
			//   console.log('Guest page logged a message: ', e.message);
			// });
			// webview.setUserAgentOverride(this.props.showPlatformVal)
			// webview.setAttribute('src', 'http://127.0.0.1:10000')
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
		NavBtnClick(e,i){
			phoneInset.postMessage({
				type:'register',
				register:'onNavBtnClick',
				data:i
			},'*')
		}
		TabClick(e,i){
			let dispatch = this.props.dispatch;
			dispatch({
        type:'info/changeTabs',
        data:i
      })
      phoneInset.postMessage({
				type:'register',
				register:'onSelectTab',
				data:i["num"]
			},'*')
		}
	}
	return Controller
}