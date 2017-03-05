'use strict'
import dva from 'dva';
import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider ,connect} from 'react-redux';
module.exports = function(app){
	class Controller extends Component{
		render(){
			let self = this;
			return (<div className="ide-info-remote">
								<div className="ide-info-remote-c">
									<div className="ide-remote-input">
										<input type="text" defaultValue={this.props.project['remotepath']} onKeyUp={(e)=>this.keyUp(e)}/>
										<button type="button" className="ide-remote-refresh" onClick={(e)=>this.refresh(e)}><i className="fa fa-refresh"></i></button>
									</div>
									<div className="ide-remote-button hide">
										<button type="button" className=""></button>
									</div>
								</div>
							</div>)
		}
		componentDidMount(){
		}
		keyUp(e){
			let dispatch = this.props.dispatch;
			if(e.keyCode == '13'){
				const node = event.target;
				const text = node.value.trim();
				dispatch({
	        type:'apps/changeProjectUrl',
	        payload:text
	      })
			}
		}
		refresh(){
		}
	}
	return Controller
}
