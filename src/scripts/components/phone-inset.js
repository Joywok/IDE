'use strict'
import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore , combineReducers} from 'redux';
import { Provider ,connect} from 'react-redux';
let data = {
	project:project
}
function Reducer(state = data,action){
  switch(action.type){
    default:
      return state
  }
}
const App = combineReducers({
  Reducer
})
let store = createStore(App);
class Controller extends Component {
  render() {
    return (
        <div className="main-w">
        	<div className="header">Title</div>	
					<div className="container" id="container">
						<iframe className="phone" id="phone" src='file:///Users/zhailei/Desktop/App/index.html'></iframe>
					</div>
					<div className="footer"></div>
        </div>
    )
  }
  componentDidMount(){
  	// <iframe className="phone" id="phone"/>
  	let self = this;
  	let data = self.props.Reducer
  	console.log(window.JoywokMobileApp);
  	console.log(window.WebViewJavascriptBridge);
  	console.log(window._config);
  	let aaa =  document.getElementById('phone');
  	// aaa.setAttribute("src",data.project["src"]+'/index.html');
  	// aaa.setAttribute("src",'file:///Users/zhailei/Desktop/App/index.html');
  	// let iframes = document.createElement('iframe');
  	// iframes.id = 'phone'
  	// iframes.src='file:///Users/zhailei/Desktop/App/index.html';
  	aaa.onload = function(){
  		// console.log(aaa.contentWindow)
	  //   aaa.contentWindow.JoywokMobileApp = window.JoywokMobileApp ;
   //  	aaa.contentWindow.WebViewJavascriptBridge = window.WebViewJavascriptBridge ;
			// aaa.contentWindow._config = window._config;
  	}
  	// document.getElementById('container').appendChild(iframes);
  }
}
function select(state) {
  return state
}
let RootApp = connect(select)(Controller);

let rootElement = document.getElementById('main');
render(
  <Provider store={store}>
    <RootApp />
  </Provider>,
  rootElement
)