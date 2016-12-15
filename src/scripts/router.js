import React, { PropTypes , Component} from 'react';
import { Router, Route, IndexRoute, Link ,hashHistory} from 'dva/router';
class Dashboard extends Component {
  render() {
    return (
        <div>
          Dashboard
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
    if(user['id'] && user['name']){
      if(this.props.location.pathname == '/apps'){
      }else{
        this.props.history.push('/apps');  
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
      {path: 'login', component:require('./login')},
      {path: 'apps', component:require('./apps')},
      {path: 'info', component:require('./info')},
    ]
  }
]
module.exports = function({hashHistory}) {
  return (
    <Router routes={routeConfig}  history={hashHistory}/>
  );
};
