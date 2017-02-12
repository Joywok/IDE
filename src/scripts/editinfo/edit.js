'use strict'
import dva from 'dva';
import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider ,connect} from 'react-redux';
module.exports = function(app,store){
	class Controller extends Component{
		render(){
			return (<div className={"info-edit "+(this.props.sidebar=='edit'?'':'hide')} id="info-edit">
								<iframe id="editor-view" allownw className="edit-view" src={'file://'+basurl+'/build/template/editView.html'}/>
							</div>)
		}
		componentDidMount(){
			// <webview id="editor-view" partition ="trusted" allownw className="edit-view" src={}></webview>
			// let webview = document.createElement('webview');
			// webview.id = 'editor-view';
			// webview.setAttribute('partition', 'trusted');
			// webview.setAttribute('class', 'edit-view');
			// webview.setAttribute('allownw', 'true');
			// document.getElementById('info-edit').appendChild(webview);
			// webview.addEventListener('dialog', function (e) {
   //    	if(e.messageType == 'alert'){
   //    		window.alert(e['messageText'])
   //    	}else{
   //    		e.preventDefault()
   //    	}
   //    })
			// webview.setAttribute('src','file://'+basurl+'/build/template/editView.html')
			// return 
			// <iframe id="editor-view" allownw className="edit-view" src={'file://'+basurl+'/src/template/editView.html'}/>
			let self = this;
			let editor = document.getElementById("editor-view");
			editor.onload = function(){
        editor.contentWindow.project = self.props.project
				editor.contentWindow.fs = fs;
        editor.contentWindow.fsExtra = fsExtra;
        editor.contentWindow.chokidar = chokidar;
        setTimeout(function(){
          editor.contentWindow.postMessage({
            type:'init'
          },'*');  
        },100)
			}
		}
		shouldComponentUpdate(data){
      if(data['sidebar'] == 'edit'){
        $('.info-edit').removeClass('hide')
      }else{
        $('.info-edit').addClass('hide')
      }
     	if(document.getElementById("editor-view")){
     		document.getElementById("editor-view").contentWindow.postMessage({
	        type:'window'
	      },'*');	
     	}
			return false
		}
		change(data){
			console.log('asdasda',data);
		}
	}
	return Controller
}
