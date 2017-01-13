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
    console.log(this.props.children,'22222');
    return (
        <div className="main-w">
          {this.props.children}
        </div>
    )
  }
  componentDidMount(){
    // fsExtra.copy('build', 'tmp', function (err) {
    //   if (err) return console.error(err)
    //   console.log("success!")
    // });
    // if(ide.version!='0.0.2'){
    //   newNotication();
    //   return 
    //   var body = "";
    //   var cur = 0;
    //   var len = 0;
    //   request
    //     .get('http://192.168.1.73/public/platforms/Joywok.dmg')
    //     .on( 'response', function ( data ) {
    //       len = parseInt(data.headers['content-length']);
    //     })
    //     .on("data", function(chunk) {
    //       body += chunk;
    //       cur += chunk.length;
    //       console.log("Downloading " + parseInt(100.0 * cur / len) + "% ")
    //     })
    //     .pipe(fs.createWriteStream('Joywok.dmg'))
    // }
    // const child_process = require('child_process').exec;
    // child_process(`cp`, function(error, stdout, stderr){
    //   console.log(error, stdout, stderr)
    // })
    // return 
    if(user['id'] && user['name']){
      if(projects.length!=0){
        if(this.props.location.pathname.indexOf('/info')>-1){
        }else{
          this.props.history.push('/info');
        }
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
