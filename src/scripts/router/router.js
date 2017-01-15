import React, { PropTypes , Component} from 'react';
import { Router, Route, IndexRoute, Link ,hashHistory,browserHistory} from 'dva/router';

window.hashHistory = hashHistory;




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
    console.log(this.props.children,'22222');
    return (
        <div className="main-w">
          {this.props.children}
        </div>
    )
  }
  componentDidMount(){
    window.checkVersion();
    // const child_process = require('child_process').exec;
    // child_process(`cp`, function(error, stdout, stderr){
    //   console.log(error, stdout, stderr)
    // })
    if(user['id'] && user['name']){
      if(projects.length!=0){
        if(this.props.location.pathname.indexOf('/info')>-1){
        }else{
          this.props.history.push('/info');
        }
      }else{
        // this.props.history.push('/info');
        // if(this.props.location.pathname == '/apps'){
        // }else{
          this.props.history.push('/apps');  
        // }  
      }
    }else{
      this.props.history.push('/login');  
    }
  }
}
const routeConfig = [
  { path: '/',
    component: App,
    indexRoute: { component:Dashboard},
    childRoutes:[
      // {path: 'login', component:require('./../nav/login')},
      // {path: 'apps', component:require('./../nav/apps')},
      // {path: 'info', component:require('./../nav/info')}
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

      {path:'apps/build',name:'build',getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./../nav/build'));
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
