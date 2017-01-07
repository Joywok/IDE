import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider ,connect} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const request = require('superagent/superagent');
import { RaisedButton ,TextField,FlatButton} from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// 引入css
require('../../styles/login.css');

var localstore = new Store('Joywok:saas:login');
var cache = localstore.find({id:'login'});
let data = {
  name:cache&&cache['id']?cache['name']:'',
  nameShow:cache&&cache['id']?false:true,
  nameClass:cache&&cache['id']?'show':'',
  email:cache&&cache['id']?cache["email"]:'',
  passwd:'',
  nameError:'',
  passwdError:'',
  isdis:true,
  loginVal:'登录'
}
function changeValue(key,value){
  return _.extend({},{type:'changeValue'},{key:key,value:value})
}
function changeError(data){
  return _.extend({},{type:'changeError'},{data:data})
}
function changeBtn(data){
  return _.extend({},{type:'changeBtn'},{data:data})
}
function App(state = data,action){
  switch(action.type){
    case 'changeValue':
      let datas = _.extend({},state)
      datas[action['key']] = action['value'];
      if(action['key'] == 'email'){
        datas['nameError'] = ''
        datas['nameHasError'] = ''
      }else{
        datas['passwdError'] = ''
        datas['passwdHasError'] = ''
      }
      datas['isdis'] = true
      if(datas['passwd'].length!=0){
        datas['isdis'] = false
      }
      return datas;
      break;
    case 'changeError':
      let aaa = _.extend({},state,action['data'])
      return aaa;
      break;
    case "changeBtn":
      return _.extend({},state,action['data']);
      break;
    default:
      return state
  }
}
class Controller extends Component{
  render(){
    const { dispatch } = this.props;
    console.log(this.props)
    let buttonStyle = {
      height:38,
      padding:0
    }
    return (<MuiThemeProvider>
              <div className="blog">
                <div className="blog-w">
                  <div className="containers blog-c" id="containers">
                    <div className="login-bg">
                      <div className="login-bg-t"></div>
                      <div className="login-bg-b"></div>
                    </div>
                    <div className="login">
                      <div className="login-w">
                        <div className="login-t">
                          <img src="../images/logo.png"/>
                          <span>管理后台</span>
                        </div>
                        <div className="login-c">
                          <div className="login-logo">
                            <img src="../images/l.jpg" />
                          </div>
                          <div className="login-info">
                            {this.props.nameShow?<div className="login-info-name">{this.props["name"]}</div>:''}
                            <div className="login-user">
                              <div className="login-user-input">
                                {!this.props.nameShow?<div className="login-user-input-c">{this.props.email}</div>:<TextField type="text" className="email" id="exampleInputEmail1" hintText="邮箱/手机号" fullWidth={true} defaultValue={this.props.email} onChange={(e)=>this.changeValue(e,'email')} errorText={this.props.nameError} onKeyUp={(e)=>this.Keyup(e,'email')}/>}
                              </div>
                            </div>
                            <div className="login-passwd">
                              <div className="login-passwd-input">
                                <TextField type="password" className={"passwd "+this.props.passwdHasError} id="exampleInputEmail1" hintText="密码"  fullWidth={true} defaultValue={this.props.passwd} onChange={(e)=>this.changeValue(e,'passwd')} errorText={this.props.passwdError} onKeyUp={(e)=>this.Keyup(e,'passwd')}/>
                              </div>
                            </div>
                            <RaisedButton type="button" className="btn btn-info active login-save-btn" label={this.props.loginVal} onClick={(e)=>this.submit(e)} disabled={this.props.isdis} style={buttonStyle} backgroundColor="#444" labelColor="#fff"/>
                            <a href=""><div className="login-forget" ng-class="data['nameClass']">忘记密码?</div></a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="footer">© 2011-2014 道勤软件 版权所有</div>
                  </div>
                </div>
              </div>
            </MuiThemeProvider>)
  }
  componentDidMount(){
    $('.email input').focus();
  }
  changeValue(event,key){
    const { dispatch } = this.props
    const node = event.target;
    const text = node.value.trim();
    dispatch(changeValue(key,text))
  }
  Keyup(evt,key){
    if(evt.keyCode == 13){
      if(key == 'email'){
        $('.passwd input').focus()
      }else{
        this.submit()
      }  
    }
  }
  submit(){
    const { dispatch } = this.props
    dispatch(changeBtn({isdis:true,loginVal:'登录中…'}))
    var data = {"email":this.props.email,"pname":this.props.passwd};
    request
      .post('http://blogs-1774886889.cn-north-1.elb.amazonaws.com.cn/siteconsole/login/post')
      .send(data)
      .end(function(err,res){
        let data = JSON.parse(res["text"]);
        if(data["ret"] == 'error'){
          dispatch(changeBtn({isdis:false,loginVal:'登录'}))
          if(data['cmt']['code'] == 'jw_reg_nouser'){
            dispatch(changeError({nameError:'用户名不存在'}))
          }else{
            dispatch(changeError({passwdError:'密码错误'}))
          }
        }else{
          
          ipcRenderer.send('openinfo',data);
        }
      });
  }
}
function select(state) {
  return state
}
let RootApp = connect(select)(Controller)
let store = createStore(App);

injectTapEventPlugin();
class Main extends Component{
  render(){
    return (<Provider store={store}>
              <RootApp />
            </Provider>
            )
  }
}
module.exports = Main