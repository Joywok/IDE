import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider ,connect} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const request = require('superagent/superagent');
import getMuiTheme from 'material-ui/styles/getMuiTheme';

module.exports = function(){
  // 引入css
  require('../../styles/login.css');

  // var localstore = new Store('Joywok:saas:login');
  // var cache = localstore.find({id:'login'});
  let data = {
    name:'',
    nameShow:true,
    nameClass:'',
    email:'',
    passwd:'',
    nameError:'',
    passwdError:'',
    isdis:true,
    loginVal:'登录',
    signVal:'注册'
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
        datas['isdis'] = true;
        if(datas['passwd'].length!=0){
          datas['isdis'] = false
        }
        return datas;
        break;
      case 'changeError':
        let aaa = _.extend({},state,action['data'],{loginVal:'登录'})
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
      let buttonStyle = {
        height:38,
        padding:0,
        border:'none'
      }
      let textStyle={
        bottom:"0px",
        color:'#e7e7e7'
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
                            <div></div>
                          </div>
                          <div className="login-c">
                            <div className="login-title">LOGIN</div>
                            <div className="login-info" autocomplete="off">
                              <div className="login-user">
                                <div className="login-user-input">
                                  <div className={"login-input-c "+(this.props.nameError.length!=0?'haserror':'')}>
                                    <input  className="email" type="text" autoComplete="new-password" placeholder="邮箱/手机号" onChange={(e)=>this.changeValue(e,'email')}  onKeyUp={(e)=>this.Keyup(e,'email')} />
                                    <div className={"login-input-error "+(this.props.nameError.length!=0?'':'hide')}>{this.props.nameError}</div>
                                  </div>
                                  <div className="login-tip">
                                    <i className="login-tip-icon"></i>
                                    <div className="login-tip-c">
                                      <div className="login-tip-bg"></div>
                                      <div className="login-tip-val">登录帐号是 Joywok 企业本身的用户</div>
                                      <i className="login-tip-cirtle"></i>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="login-passwd">
                                <div className="login-passwd-input">
                                  <div className={"login-input-c "+(this.props.passwdError.length!=0?'haserror':'')}>
                                    <input type="password" className="passwd" autoComplete="new-password" placeholder="密码" onChange={(e)=>this.changeValue(e,'passwd')}  onKeyUp={(e)=>this.Keyup(e,'passwd')}  />
                                    <div className={"login-input-error "+(this.props.passwdError.length!=0?'':'hide')}>{this.props.passwdError}</div>
                                  </div>
                                </div>
                              </div>
                              <div className="login-forget" ng-class="data['nameClass']" ><a href="javascript:;" onClick={(e)=>this.forgetPwd(e)}><span>忘记密码?</span></a></div>
                              <div className="submit-btns">
                                <div className="submit-btns-i sign">
                                  <button className="btn btn-info login-sign-btn" type="button" onClick={(e)=>this.sign(e)}>{this.props.signVal}</button>
                                </div>
                                <div className="submit-btns-i submit">
                                  <button className="btn btn-info login-save-btn" type="button" onClick={(e)=>this.submit(e)} disabled={this.props.isdis} >{this.props.loginVal}</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="footer">2011-2017 道勤软件 版权所有</div>
                    </div>
                  </div>
                </div>
              </MuiThemeProvider>)
    }
    componentDidMount(){
      const { dispatch } = this.props;
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
    forgetPwd(){
      var shell = gui.Shell;
      shell.openExternal(serverUrl+'/forget');
    }
    sign(){
     var shell = gui.Shell;
      shell.openExternal(serverUrl); 
    }
    submit(){
      const { dispatch } = this.props
      dispatch(changeBtn({isdis:true,loginVal:'登录中…'}))
      var data = {"email":this.props.email,"password":this.props.passwd};
      request
        .post(serverUrl+'/ide/account/login')
        .send(data)
        .end(function(err,res){
          let data = JSON.parse(res["text"]);
          if(data["data"]["errcode"]){
            if(data["data"]["errcode"] == 20301){
              dispatch(changeError({passwdError:data["data"]["errmemo"]}));
            }else{
              dispatch(changeError({nameError:data["data"]["errmemo"]}));
            }
          }else{
            for(var i in data.data.user_info.contact){
              if(data.data.user_info.contact[i].type == "mobile"){
                var mobile = data.data.user_info.contact[i].val;
              }
            }
            var userinfo = {
              email : data.data.user_info.account,
              id  : data.data.id,
              name : data.data.user_info.name,
              title : data.data.user_info.title,
              mobile : mobile,
              avatar : {
                avatar_l : data.data.user_info.avatar_l,
                avatar_s : data.data.user_info.avatar_s
              },
              role : data.data.roles,
              time:Date.parse(new Date())/1000
            }
            window.user = userinfo;
            UserStore.update({id:'login',data:userinfo});
            setTimeout(function(){
              hashHistory.push("/apps");
            })
            return 
            fs.writeFile('config.json',JSON.stringify(userinfo),function(error){
              window.user = userinfo;
              setTimeout(function(){
                hashHistory.push("/apps");  
              })
            })
          }
        });
    }
  }
  function select(state) {
    return state
  }
  let RootApp = connect(select)(Controller);
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
  return Main
}()
