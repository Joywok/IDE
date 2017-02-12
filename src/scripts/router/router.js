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
      if(this.props.location.pathname.indexOf('/login')>-1){
      }else{
        this.props.history.push('/login');
      }
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
        require.ensure([], require => {
          cb(null, require('./../nav/login'));
        },'login');
      }},
      {path:'apps',name:'apps',getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./../nav/apps'));
        },'apps');
      }},
      {path:'info',name:'info',getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./../nav/info'));
        },'info');
      }}
    ]
  }
]
module.exports = function({hashHistory}) {
  return (
    <Router routes={routeConfig}  history={hashHistory}/>
  );
};
