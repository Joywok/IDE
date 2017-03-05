import React, { PropTypes , Component} from 'react';
import { Router, Route, IndexRoute, Link ,hashHistory,browserHistory} from 'dva/router';
window.hashHistory = hashHistory;
class Dashboard extends Component {
  render() {
    return (
        <div>
        </div>
    )
  }
}
class App extends Component {
  render() {
    return (
        <div className="main-w">
          {this.props.children}
        </div>
    )
  }
  componentDidMount(){
    let nowWin = require('nw.gui').Window.get();
    nowWin.on('close',function(){
      require('nw.gui').App.quit();
    })
    window.checkVersion();
    if(user['id'] && user['name']){
      if(user.openId && user.openId.length!=0){
        if(this.props.location.pathname.indexOf('/info')>-1){
        }else{
          this.props.history.push('/info');
        }
      }else{
        if(this.props.location.pathname.indexOf('/apps')>-1){
        }else{
          this.props.history.push('/apps');
        }
      }
    }else{
      this.props.history.push('/login');
    }
  }
}

let loginController,
    appsController,
    infoController;

const routeConfig = [
  { path: '/',
    component: App,
    // indexRoute: { component:Dashboard},
    onChange:function(previousRoute, nextRoute){
    },
    childRoutes:[
      {path:'login',name:'login',getComponent(nextState, cb) {
        if(user["name"] && user['id']){
          if(user['openId'] && user['openId'].length!=0){
            app._history.push('/info');
          }else{
            app._history.push('/apps');
          }
        }else{
          require.ensure([], require => {
            cb(null, require('./../nav/login'));
          },'login');  
        }
      }},
      {path:'apps',name:'apps',getComponent(nextState, cb) {
        if(user["name"] && user['id']){
          if(user['openId'] && user['openId'].length!=0){
            app._history.push('/info');
          }else{
            require.ensure([], require => {
              cb(null, require('./../nav/apps'));
            },'apps');
          }
        }else{
          app._history.push('/login');
        }
      }},
      {path:'info',name:'info',getComponent(nextState, cb) {
        if(user["name"] && user['id']){
          if(user['openId'] && user['openId'].length!=0){
            require.ensure([], require => {
              cb(null, require('./../nav/info'));
            },'info');
          }else{
            app._history.push('/apps');
          }
        }else{
          app._history.push('/login');
        }
      }}
    ]
  }
]
module.exports = function({hashHistory}) {
  return (
    <Router routes={routeConfig}  history={hashHistory}/>
  );
};
