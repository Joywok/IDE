'use strict'
import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider ,connect} from 'react-redux';
const request = require('superagent/superagent');
module.exports = function(){
	let data = {
	}
	function App(state = data,action){
		switch(action.type){
			default:
				return state;
		}
	}
	class Controller extends Component{
		render(){
			return (<div className="phone-container">
					<iframe id="phone-outset" src={'file:///'+basurl+'/src/template/phone.html'}/>
				</div>)
		}
		componentDidMount(){
			let phoneOut = document.getElementById('phone-outset');
			phoneOut.onload = function(){
				var oHead = document.getElementsByClassName('phone-container')[0];
        var phoneInset= document.createElement("iframe");
        phoneInset.id = "phone-inset";
        phoneInset.src='file:///'+basurl+'/src/template/phone-inset.html';
        phoneInset.onload=function(){
					phoneInset.contentWindow.JoywokMobileApp = phoneOut.contentWindow.JoywokMobileApp 
        }
        oHead.appendChild(phoneInset);
			}
		}
	}
	function select(state) {
	  return state
	}
	let RootApp = connect(select)(Controller)
	let store = createStore(App);
	class Main extends Component{
		render(){
			return (<Provider store={store}>
						    <RootApp />
						  </Provider>
							)
		}
	}
	return Main
}()
