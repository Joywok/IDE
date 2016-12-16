import dva from 'dva';
import { Router, Route ,Link} from 'dva/router';
import React,{ Component }from 'react';
import { createStore } from 'redux';
import { Provider ,connect} from 'react-redux';

module.exports = function(){
  const app = dva();
  app.model({
    namespace: 'count',
    state: {
      record: 0,
      current: 0,
    },
    reducers: {
      add(state) {
        const newCurrent = state.current + 1;
        return { ...state,
          current: newCurrent,
        };
      },
      minus(state) {
        return { ...state, current: state.current - 1};
      }
    }
  });
  class CountApp extends Component{
  	render(){	
      console.log(this.props);
  		return (
  	    <div className="info">
          123123123123123123<br/>
          <Link to="/info">edit</Link><br/>
          <Link to="/info/debug">debug</Link><br/>
          <Link to="/info/project">project</Link><br/>
          {this.props.children}
  	    </div>
  	  );
  	}
    componentDidMount(){
      const {dispatch} = this.props;
      // dispatch({type: 'count/add'})
      let fs = require('fs');
      setTimeout(function(){
        return 
        $('.xxxxx').html('');
        var oHead = document.getElementsByClassName('xxxxx')[0];
        var oScript= document.createElement("iframe");
        oScript.id = "foo";
        oScript.src='file:///'+basurl+'/src/template/editor.html';
        oScript.onload=function(){
          fs.readFile(basurl+'/webpack.config.js',{
            encoding:'utf-8'
          },function(err,data){
            console.log('发送数据')
            oScript.contentWindow.postMessage(data, "*");
          })
        }
        oHead.appendChild(oScript);
        return 
        let iframeWin =  document.getElementById("foo").contentWindow;
        console.log(iframeWin,'1231231');
        fs.readFile(basurl+'/webpack.config.js',{
          encoding:'utf-8'
        },function(err,data){
          console.log('发送数据')
          iframeWin.postMessage(data, "*");
        })
        return 

        $('.xxxxx').html('')
        var oHead = document.getElementsByClassName('xxxxx')[0];
        var oScript= document.createElement("iframe");
        oScript.id = "foo";
        oScript.partition = "trusted";
        // oScript.src='file:///'+basurl+'/src/template/template.html?src=xxxxxxxxx';
         oScript.src='chrome-extension://lblocnhdapdghmpkknoijhgonjfikalb/src/template/template.html';
        oHead.appendChild(oScript);
        console.log(oScript,'1231');
      },0)
    }
  }
  function mapStateToProps(state) {
    return state;
  }
  function App(state = app._models[0]["state"],action){
    if(app._models['0'].reducers){
      let hasFunc = _.filter(app._models['0'].reducers,function(i,key){return key==action['type']})
      if(hasFunc.length!=0){
        return (hasFunc[0](state))
      }else{
        return state  
      }
    }else{
      return state
    }
  }
  let store = createStore(App);
  const RootApp = connect(mapStateToProps)(CountApp);
  class Main extends Component{
    render(){
      return (<Provider store={store}>
                <RootApp {...this.props} />
              </Provider>
              )
    }
  }
  return Main
}()
