'use strict'
import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider ,connect} from 'react-redux';
module.exports = function(app,store){
	class Controller extends Component{
		render(){
			return (<div className={"info-project "+(this.props.sidebar=='project'?'':'hide')}>
								<div className="info-project-w">
									<div className="info-project-icon">
										<i className="fa fa-code"></i>
									</div>
									<div className="info-project-name">{this.props.project['name']}</div>
									<div className="info-project-appid">AppID:{this.props.project['id']}</div>
									<div className="info-project-item">
										<div className="info-project-i-c">
											<div className="info-project-i-label">本地开发目录</div>
											<button className="info-project-i-btn" type="button" onClick={(e)=>this.openFolder(e)}>打开</button>	
											<div className="info-project-i-content">{this.props.project.src}</div>
										</div>
									</div>
									<div className="info-project-item">
										<div className="info-project-i-c">
											<div className="info-project-i-label">最新更新时间</div>
											<button className="info-project-i-btn" type="button">预览</button>	
											<div className="info-project-i-content">项目未关联AppID</div>
										</div>
									</div>
									<div className="info-project-item">
										<div className="info-project-i-c">
											<div className="info-project-i-label">最近上传时间</div>
											<button className="info-project-i-btn" type="button" onClick={(e)=>this.uploadProject(e)}>上传</button>	
											<div className="info-project-i-content">项目未关联AppID</div>
										</div>
									</div>
									<div className="info-project-tools">
										<div className="info-project-tools-i">
											<div className="info-project-tools-status">
												<input type="checkbox" id="checkbox-1" defaultChecked={this.props.project.tools.babel}/>
											</div>
											<div className="info-project-tools-val">开启ES6转ES5(上传后自动转义)</div>
										</div>
										<div className="info-project-tools-i">
											<div className="info-project-tools-status">
												<input type="checkbox" id="checkbox-2" defaultChecked={this.props.project.tools.completion}/>
											</div>
											<div className="info-project-tools-val">开启上传代码样式文件自动补全(上传后自动补全)</div>
										</div>
										<div className="info-project-tools-i">
											<div className="info-project-tools-status">
												<input type="checkbox" id="checkbox-3" defaultChecked={this.props.project.tools.compress}/>
											</div>
											<div className="info-project-tools-val">开启代码压缩(上传后自动压缩)</div>
										</div>
									</div>
									<button className="info-project-remove" type="button" onClick={(e)=>this.removeProject(e)}>删除项目</button>
								</div>
							</div>)
		}
		openFolder(){
			// console.log(this.props.project.src)
			gui.Shell.showItemInFolder(this.props.project.src.split('file://')[1]+'/index.html');
		}
		uploadProject(){
		}
		changeTools(evt,type){
		}
		removeProject(){
			fs.writeFile('project.json',JSON.stringify([]),function(){
				hashHistory.push("/apps");
			});
		}
	}
	return Controller
}