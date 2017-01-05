'use strict'
import dva from 'dva';
import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider ,connect} from 'react-redux';
module.exports = function(app,store){
	class Controller extends Component{
		render(){
			return (<div className={"info-edit "+(this.props.sidebar=='edit'?'':'hide')}>
                <iframe id="editor-view" className="edit-view" src={'file://'+basurl+'/src/template/editView.html'}/>
							</div>)
		}
		componentDidMount(){
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
      document.getElementById("editor-view").contentWindow.postMessage({
        type:'window'
      },'*');
			return false
		}
		change(data){
			console.log('asdasda',data);
		}
	}
	return Controller
}
