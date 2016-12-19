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
			return (<div className="">Debug</div>)
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