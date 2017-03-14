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
				top:(this.props.tabs.length!=0?"90px":'39px'),
				bottom:(this.props.footer.length!=0?'45px':'0px')
			}
			let phoneHeaderBar = {
			}
			if(this.props.navBg&&this.props.navBg.length!=0){
				phoneHeaderBar['background'] = '#'+this.props.navBg;
				phoneHeaderBar['color'] = '#fff';
				if(this.props.navBg == 'fffff' || this.props.navBg =='fff'){
					phoneHeaderBar['color'] = '#494949';
				}
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
							 		<div className={"phone-header "+(this.props.btns.length!=0?'has-btns':'')+(this.props.tabsBg.length!=0?' has-tabs tabs-bg-'+this.props.tabsBg:'')} style={phoneHeaderBar}>
							 			{this.props.page!=0?<button type="button" className="header-back" onClick={e=>this.backPhoneUrl(e)}></button>:''}
							 			<div className={"phone-title "+(this.props.page!=0?'has-back':'')}>{this.props.title}</div>
							 			{this.props.btns.length!=0?<div className="phone-btns">{this.props.btns.map(function(i){
							 				return <button onClick={(e)=>self.NavBtnClick(e,i)} disabled={i["disabled"]} className={"phone-btns-i "+(i["type"]>10?'phone-btns-i-specail':('phone-btns-i-'+i["type"]))} type="button">{i["name"]?i["name"]:''}</button>
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
			let init = false
			let dispatch = this.props.dispatch;
			let webview = document.createElement('webview');
			// webview.setAttribute('partition', 'trusted');
			// webview.setAttribute('allowtransparency', 'trusted');
			webview.setAttribute('allownw', 'true');
			webview.setAttribute('class', 'hide');
			webview.id = 'phone-inset';
			webview.contextmenu = function(){
				return false;
			}
			webview.setAttribute('autosize', 'on');
			let showPlatformVal = this.props.showPlatformVal
			if(showPlatformVal=='iPhone 4'){
				webview.setUserAgentOverride('Mozilla/5.0 (iPhone; CPU iPhone OS 8_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 Language/zh_CN JoywokIDE')	
			}else if(showPlatformVal == 'iPhone 4s'){
				webview.setUserAgentOverride('Mozilla/5.0 (iPhone; CPU iPhone OS 8_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 Language/zh_CN JoywokIDE')	
			}else if(showPlatformVal == 'iPhone 5'){
				webview.setUserAgentOverride('Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 Language/zh_CN JoywokIDE')	
			}else if(showPlatformVal == 'iPhone 6'){
				webview.setUserAgentOverride('Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 Language/zh_CN JoywokIDE')	
			}else if(showPlatformVal == 'iPhone 6 Plus'){
				webview.setUserAgentOverride('Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 Language/zh_CN JoywokIDE')	
			}else if(showPlatformVal == 'Galaxy S5'){
				webview.setUserAgentOverride('Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36 Language/zh_CN JoywokIDE')	
			}else if(showPlatformVal == 'Nexus 4'){
				webview.setUserAgentOverride('Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36 Language/zh_CN JoywokIDE')	
			}else if(showPlatformVal == 'Nexus 5'){
				webview.setUserAgentOverride('Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36 Language/zh_CN JoywokIDE')	
			}else if(showPlatformVal == 'Nexus 6'){
				webview.setUserAgentOverride('Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36 Language/zh_CN JoywokIDE')	
			}
			if(this.props.project['remote']){
				webview.src = this.props.project['remotepath']
			}
			document.getElementById('phone-container').appendChild(webview);
			webview.addEventListener('permissionrequest', function (s) {
        s.request.allow()
      })
      webview.addContentScripts([{
    		name:'myRule',
    		matches: ['<all_urls>'],
    		css: { files: ['build/styles/phone-inset.css'] },
    		// js: {
      //     files: ['src/scripts/jssdk-callHander.js']
      //   },
    		run_at: 'document_start',
    		all_frames:true
    	}])
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
      webview.addEventListener('loadabort',function(e){
      	// console.log(e,'这个错误信息是什么');
      })
      webview.addEventListener('loadcommit',function(e){
      	// console.log('url-里面是什么',e)
      })
      webview.addEventListener('loadredirect',function(e){
      	// console.log('loadredirect',arguments);
      })
      webview.addEventListener('loadstop',function(e){
      	// console.log('这里走了几次啊');
      	if(init== false){
      		if(self.props.project['remotepath']!=$('#phone-inset').attr('src')){
						$('#phone-inset').attr({src:$('#phone-inset').attr('src')})
						init = true;
					}
      	}
      })
			webview.addEventListener('contentload', function(e) {
				console.log('这里会加载么？contentloadcontentloadcontentload')
				$("#phone-inset").removeClass('hide');
				setTimeout(function(){
					$('.info-debug').removeClass('hide');
      		document.getElementById('phone-inset').showDevTools(true, document.getElementById('cdt'));	
				},50);
				// if(self.props.project['remotepath']!=$('#phone-inset').attr('src')){
				// 	$('#phone-inset')[0].reload();
				// 	document.getElementById('phone-inset').showDevTools(true, document.getElementById('cdt'));	
				// }
				// console.log(self.props.page,'phone手机壳里面');
				setTimeout(function(){
					e.target.contentWindow.postMessage({
						type:'init',
						data:{
							user:window.user,
							project:window.project,
							page:self.props.page
						}
					},'*');	
				},0)
			});
			webview.contextMenus.onShow.addListener(function(e){
				e.preventDefault()
			})
		}
		shouldComponentUpdate(nextProps,nextState){
			// console.log(this.state,nextProps)
			return true
		}
		componentDidUpdate(){
			// let webview = document.getElementById('phone-inset');
			// let showPlatformVal = this.props.showPlatformVal
			// if(showPlatformVal=='iPhone 4'){
			// 	webview.setUserAgentOverride('Mozilla/5.0 (iPhone; CPU iPhone OS 8_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 Language/zh_CN ')	
			// }else if(showPlatformVal == 'iPhone 4s'){
			// 	webview.setUserAgentOverride('Mozilla/5.0 (iPhone; CPU iPhone OS 8_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 Language/zh_CN ')	
			// }else if(showPlatformVal == 'iPhone 5'){
			// 	webview.setUserAgentOverride('Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 Language/zh_CN ')	
			// }else if(showPlatformVal == 'iPhone 6'){
			// 	webview.setUserAgentOverride('Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 Language/zh_CN ')	
			// }else if(showPlatformVal == 'iPhone 6 Plus'){
			// 	webview.setUserAgentOverride('Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 Language/zh_CN ')	
			// }else if(showPlatformVal == 'Galaxy S5'){
			// 	webview.setUserAgentOverride('Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36 Language/zh_CN ')	
			// }else if(showPlatformVal == 'Nexus 4'){
			// 	webview.setUserAgentOverride('Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36 Language/zh_CN ')	
			// }else if(showPlatformVal == 'Nexus 5'){
			// 	webview.setUserAgentOverride('Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36 Language/zh_CN ')	
			// }else if(showPlatformVal == 'Nexus 6'){
			// 	webview.setUserAgentOverride('Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36 Language/zh_CN ')	
			// }
			// if(this.props.project['remote']){
			// 	webview.src = this.props.project['remotepath']
			// }
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
		backPhoneUrl(){
			let dispatch = this.props.dispatch;
			let page = (this.props.page-1);
			dispatch({
        type:'info/changePhoneUrl',
        data:page
      })
			phoneInset.postMessage({
				type:'changePhoneURL',
				data:page
			},'*')
		}
		change(data){
		}
		NavBtnClick(e,i){
			phoneInset.postMessage({
				type:'register',
				register:'onNavBtnClick',
				data:JSON.stringify(i)
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