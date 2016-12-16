import React, { PropTypes , Component} from 'react';
import { Router, Route, IndexRoute, Link ,hashHistory,browserHistory} from 'dva/router';
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
      if(project.length!=0){
        this.props.history.push('/info');  
      }else{
        if(this.props.location.pathname == '/apps'){
        }else{
          this.props.history.push('/apps');  
        }  
      }
    }else{
      this.props.history.push('/login');  
    }
  }
}
console.log('xxx');
const routeConfig = [
  { path: '/',
    component: App,
    indexRoute: { component:Dashboard},
    childRoutes:[
      {path: 'login', component:require('./login')},
      {path: 'apps', component:require('./apps')},
      {path: 'info', component:require('./info'),
        indexRoute:{component:require('./edit')},
        childRoutes:[
          {path:'debug',component:require('./debug')},
          {path:'project',component:require('./project')}
        ]
      },
    ]
  }
]
module.exports = function({hashHistory}) {
  return (
    <Router routes={routeConfig}  history={hashHistory}/>
  );
};
