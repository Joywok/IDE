'use strict'
import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider ,connect} from 'react-redux';
module.exports = function(app,store){
	class Controller extends Component{
		render(){
			return (<div className={"info-project "+(this.props.sidebar=='project'?'':'hide')}>
								{this.props.project['remote']?
								<div className="info-project-w has-remote">
									<div className="info-project-icon"></div>
									<div className="info-project-name">{this.props.project['name']}</div>
									<div className="info-project-appid">{this.props.project['appId'] && this.props.project['appId'].length!=0?'AppID:'+this.props.project['appId']:'项目未关联AppID'}</div>
									<div className="info-project-item path">
										<div className="info-project-i-c">
											<div className="info-project-i-label">服务器地址</div>
											<div className="info-project-i-content">{this.props.project.remotepath}</div>
										</div>
									</div>
									<button className="info-project-remove" type="button" onClick={(e)=>this.removeProject(e)}>删除项目</button>
								</div>
								:<div className="info-project-w">
									<div className="info-project-icon"></div>
									<div className="info-project-name">{this.props.project['name']}</div>
									<div className="info-project-appid">{this.props.project['appId'] && this.props.project['appId'].length!=0?('AppID:'+this.props.project['appId']):'项目未关联AppID'}</div>
									<div className="info-project-item path">
										<div className="info-project-i-c">
											<div className="info-project-i-label">本地开发目录</div>
											<button className="info-project-i-btn" type="button" onClick={(e)=>this.openFolder(e)}>打开</button>	
											<div className="info-project-i-content">{this.props.project.src.split('file://')[1]}</div>
										</div>
									</div>
									<div className="info-project-item update-time">
										<div className="info-project-i-c">
											<div className="info-project-i-label">最新更新时间</div>
											<button className="info-project-i-btn" type="button">预览</button>	
											<div className="info-project-i-content">此功能开发中…</div>
										</div>
									</div>
									<div className="info-project-item upload-time">
										<div className="info-project-i-c">
											<div className="info-project-i-label">最近上传时间</div>
											<button className="info-project-i-btn" type="button" onClick={(e)=>this.uploadProject(e)}>上传</button>	
											<div className="info-project-i-content">此功能开发中…</div>
										</div>
									</div>
									<div className="info-project-tools">
										<div className="info-project-tools-i">
											<div className="info-project-tools-status">
												<input type="checkbox" id="checkbox-babel" defaultChecked={this.props.project.tools.babel}/>
												<label htmlFor="checkbox-babel"></label>
											</div>
											<div className="info-project-tools-val">开启ES6转ES5(上传后自动转义)</div>
										</div>
										<div className="info-project-tools-i">
											<div className="info-project-tools-status">
												<input type="checkbox" id="checkbox-completion" defaultChecked={this.props.project.tools.completion}/>
												<label htmlFor="checkbox-completion"></label>
											</div>
											<div className="info-project-tools-val">开启上传代码样式文件自动补全(上传后自动补全)</div>
										</div>
										<div className="info-project-tools-i">
											<div className="info-project-tools-status">
												<input type="checkbox" id="checkbox-compress" defaultChecked={this.props.project.tools.compress}/>
												<label htmlFor="checkbox-compress"></label>
											</div>
											<div className="info-project-tools-val">开启代码压缩(上传后自动压缩)</div>
										</div>
									</div>
									<button className="info-project-remove" type="button" onClick={(e)=>this.removeProject(e)}>删除项目</button>
								</div>}
							</div>)
		}
		openFolder(){
			gui.Shell.showItemInFolder(this.props.project.src.split('file://')[1]+'/index.html');
		}
		uploadProject(){
		}
		changeTools(evt,type){
		}
		removeProject(){
			let projects = _.filter(window.projects,function(i){return i['id']!=user["openId"]});
			ProjectStore.update({id:'projects',data:projects});
			// fs.writeFile('project.json',JSON.stringify(projects),function(){
				window.projects = projects;
				let data = user;
				delete data['openId'];
				UserStore.update({id:'login',data:data});
				// fs.writeFile('config.json',JSON.stringify(data),function(){
					window.user = data;
					hashHistory.push("/apps");
				// })
			// });
		}
	}
	return Controller
}