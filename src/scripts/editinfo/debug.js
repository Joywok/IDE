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
			return (<div className={"info-debug "+(this.props.sidebar=='debug'?'':'hide')}>
								<div className="info-debug-console" id="info-debug-console">
									<webview id="cdt" partition="trusted" class="xxxxx" src="about:blank"></webview>
								</div>
							</div>)
		}
		componentDidMount(){
			let cdt = document.getElementById('cdt');
			setTimeout(function(){
				console.log('xxxxxxx','showDevTools');
				document.getElementById('aaa').showDevTools(true, cdt);
			},300);
		}
		shouldComponentUpdate(data){
      if(data['sidebar'] == 'debug'){
        $('.info-debug').removeClass('hide')
      }else{
        $('.info-debug').addClass('hide')
      }
			return false
		}
	}
	return Controller
}
