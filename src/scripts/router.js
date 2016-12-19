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
    // request
    //   .get('/some-url')
    //   .end(function(err, res){
    //     // Do something
    //   });

    if(ide.version !='0.0.2'){
    }
    console.log(ide.version,'123123');
    // if(ide.version)

    return 
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
        childRoutes:[
          // {path:'edit',getComponents(location, callback) {
          //   require.ensure([], function (require) {
          //     callback(null, require('./edit'));
          //   },'edit')
          // }},
          // {path:'debug',getComponents(location, callback) {
          //   require.ensure([], function (require) {
          //     callback(null, require('./debug'));
          //   },'debug')
          // }},
          // {path:'project',getComponents(location, callback) {
          //   require.ensure([], function (require) {
          //     callback(null, require('./project'));
          //   },'project')
          // }},
          {path:'edit',component:require('./edit')},
          {path:'debug',component:require('./debug')},
          {path:'project',component:require('./project')},
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
