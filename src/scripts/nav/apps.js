import dva from 'dva';
import { Router, Route } from 'dva/router';
import React,{ Component }from 'react';
import { createStore } from 'redux';
import { Provider ,connect} from 'react-redux';

require('../../styles/apps.css');

module.exports = function(){
  const app = dva();
  let init = false;
  app.model({
    namespace: 'apps',
    state: {
      list: projects,
      userinfo: user,
      showList:true,
      pname:'',
      corpId:'',
      copesecret:'',
      appId:'',
      dirpath:'',
      remote:false,
      remotepath:'',
      babel:true,completion:true,compress:true
    },
    reducers: {
      add:function(state,action) {
        let data = state['list'];
        data.push(action['data']);
        window.projects = data;
        return _.extend({},state,{list:data})
      },
      allreset:function(){
        return _.extend({},{
          list: projects,
          userinfo: user,
          showList:true,
          pname:'',
          corpId:'',
          copesecret:'',
          appId:'',
          dirpath:'',
          remote:false,
          remotepath:'',
          babel:true,completion:true,compress:true
        })
      },
      changeShowList:function(state,action){
        return _.extend({},state,{showList:action['payload']})
      },
      backList:function(state,action){
        return _.extend({},state,{
          showList:true,
          pname:'',
          corpId:'',
          copesecret:'',
          appId:'',
          dirpath:'',
          remote:false,
          remotepath:''
        })
      },
      changeInputVal:function(state,action){
        let data = _.extend({},state);
        data[action['target']] = action['payload']
        return data;
      },
      changeRadio:function(state,action){
        return _.extend({},state,{remote:action['payload']})
      }
    }
  });
  function App(state = app._models[0]["state"],action){
    if(app._models['0'].reducers){
      let hasFunc = _.filter(app._models['0'].reducers,function(i,key){return key==action['type']})
      if(hasFunc.length!=0){
        return (hasFunc[0](state,action))
      }else{
        return state  
      }
    }else{
      return state
    }
  }
  let store = createStore(App);
  function resetModel(){
  }
  function openProject(id, value){
      window.user.openId = id;
      let userinfo  = window.user;
      UserStore.update({id:'login',data:userinfo});
      setTimeout(function(){
        hashHistory.push("/info");  
      })
      // fs.writeFile('config.json',JSON.stringify(user),function(){
      //   hashHistory.push("/info");
      // })
  }

  class ChildeView extends Component{
    render(){
      return(
        <div className="apps-list-i" onClick={openProject.bind(null, this.props.id)}>
          <div className="apps-list-i-c">
            <div className="apps-list-i-pic"><div></div></div>
            <div className="apps-list-i-val ellipsis">{this.props.name}</div>
          </div>
        </div>
        )
    }
    /* <div className="item" onClick={openProject.bind(null, this.props.id)}>
          <div><img src={serverUrl+user.avatar.avatar_l} /></div>
          <div>{this.props.name}</div>
        </div>
    */
  }
  class Apps extends Component{
  	render(){
      let self = this;
      let data = this.props;
  		return (
        <div className="apps">
          <div className={"apps-tabs-i list "+(data['showList']?'':'hide')}>
            <div className="apps-user">
              <div className="apps-user-c">
                <div className="apps-info-avatar">
                  <img src={serverUrl + this.props.userinfo.avatar.avatar_l}/>
                  <div className="apps-info-exit" onClick={(e)=>this.logout()}>
                    <i className="fa fa-sign-in"></i>
                  </div>
                </div>
                <div className="apps-info-name">{this.props.userinfo.name}</div>
              </div>
            </div>
            <div className="xxxxx hide"></div>
            <div className="apps-list">
              <div className="apps-list-i apps-create-btn" onClick={(e)=>this.createApps(e)}>
                <div className="apps-list-i-c">
                  <div className="apps-list-i-pic">
                    <div></div>
                  </div>
                  <div className="apps-list-i-val">添加项目</div>
                </div>
              </div>
              <div className="apps-list-i hide">
                <div className="apps-list-i-c">
                  <div className="apps-list-i-pic">
                    <div></div>
                  </div>
                  <div className="apps-list-i-val ellipsis">xxxxxxxxxxxxxxxxxx</div>
                </div>
              </div>
              {this.props.list.map(function(item) {
                return <ChildeView {...item} dispatch={self.props.dispatch}></ChildeView>
              })}
            </div>
          </div>
          <div className={"apps-tabs-i create-form "+(data['showList']?'hide':'')}>
            <div className="create-form-back" onClick={(e)=>this.backList(e)}>
              <div className="create-form-back-pic"></div>
              <div className="create-form-back-val">返回</div>
            </div>
            <div className="create-form-c">
              <div className="create-form-title">添加项目</div>
              <div className="create-form-i">
                <div className="create-form-label">项目名称</div>
                <div className="create-form-i-c">
                  <input type="input" className="create-form-input" value={data['pname']} onChange={(e)=>this.changeInputVal(e,"pname")}/>
                </div>
              </div>
              <div className="create-form-i">
                <div className="create-form-label">Corp_id</div>
                <div className="create-form-i-c">
                  <input type="input" className="create-form-input" value={data['corpId']} onChange={(e)=>this.changeInputVal(e,"corpId")}/>
                  <div className="apps-tip">
                    <i className="apps-tip-icon"></i>
                    <div className="apps-tip-c">
                      <div className="apps-tip-bg"></div>
                      <div className="apps-tip-val">输入您在乐工平台获得的企业ID，该ID在平台系统管理中产生</div>
                      <i className="apps-tip-cirtle"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="create-form-i">
                <div className="create-form-label">Corp_Secret</div>
                <div className="create-form-i-c">
                  <input type="input" className="create-form-input" value={data['copesecret']} onChange={(e)=>this.changeInputVal(e,"copesecret")}/>
                  <div className="apps-tip">
                    <i className="apps-tip-icon"></i>
                    <div className="apps-tip-c">
                      <div className="apps-tip-bg"></div>
                      <div className="apps-tip-val">输入您在乐工平台的企业密钥，该密钥在平台系统管理中产生</div>
                      <i className="apps-tip-cirtle"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="create-form-i">
                <div className="create-form-label">AppID</div>
                <div className="create-form-i-c">
                  <input type="input" className="create-form-input" value={data['appId']} onChange={(e)=>this.changeInputVal(e,"appId")}/>
                </div>
              </div>
              <div className="create-form-i project-remote">
                <div className="create-form-label">远程项目</div>
                <div className="create-form-i-c">
                  <div className="create-form-checkboxs">
                    <div className="create-form-checkbox">
                      <input type="radio" name="site_name" onClick={(e)=>this.changeRadio(e,true)} id="project-radio-y" checked={data["remote"]?true:false}/>
                      <label htmlFor="project-radio-y"></label>
                      <span>是</span>
                    </div>
                    <div className="create-form-checkbox">
                      <input type="radio" name="site_name" onClick={(e)=>this.changeRadio(e,false)} id="project-radio-n" checked={data["remote"]?false:true}/>
                      <label htmlFor="project-radio-n"></label>
                      <span>否</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={"create-form-i "+(data["remote"]?'hide':'')}>
                <div className="create-form-label">项目目录</div>
                <div className="create-form-i-c">
                  <input type="text" className="create-form-input" value={data['dirpath']} disabled="disabled"/>
                  <div className="chose-directory">
                    <button className="apps-form-open-dir" type="button" onClick={(e)=>this.choseDirectory(e)}>打开</button>
                    <input type="file" id="choseDirectory" className="chose-directory-input" nwdirectory  onChange={(e)=>this.changeInputVal(e,'dirpath')}/>
                  </div>
                </div>
              </div>
              <div className={"create-form-i "+(data["remote"]?'':'hide')}>
                <div className="create-form-label">服务器路径</div>
                <div className="create-form-i-c">
                  <input type="text" className="create-form-input" value={data['remotepath']} onChange={(e)=>this.changeInputVal(e,"remotepath")}/>
                </div>
              </div>
              <div className="create-form-buttons">
                <button type="button" className="create-form-button cancel-btn" onClick={(e)=>this.backList(e)}>取消</button>
                <button type="button" disabled={(data["pname"].length!=0&&((data["remote"]==true&&data["remotepath"].length!=0)||(data["remote"]==false&&data["dirpath"].length!=0))?false:true)} className="create-form-button create-btn" onClick={(e)=>this.submit(e)}>保存</button>
              </div>
            </div>
          </div>
        </div>
  	  );
  	}
    componentDidMount(){
      // pname:'',
          // corpid:'',
          // copesecret:'',
          // appid:'',
          // dirpath:''
      $('.chose-directory-input').attr({nwdirectory:''})
    }
    choseDirectory(){
      $('#choseDirectory').click()
    }
    createApps(){
      let dispatch = this.props.dispatch;
      dispatch({
        type:'apps/changeShowList',
        payload:false
      })
    }
    backList(){
      let dispatch = this.props.dispatch;
      dispatch({
        type:'apps/backList',
        payload:false
      })
    }
    changeInputVal(e,type){
      let dispatch = this.props.dispatch;
      const node = event.target;
      const text = node.value.trim();
      dispatch({
        type:'apps/changeInputVal',
        target:type,
        payload:text
      })
    }
    changeRadio(e,type){
      let dispatch = this.props.dispatch;
      dispatch({
        type:'apps/changeRadio',
        payload:type
      })
    }
    submit(){
      let project = {};
      let data = this.props;
      project.id = parseInt(Math.random()*1000000000);
      project.name = data["pname"];
      project.corpId = data['corpId']
      project.copeSecret = data['copesecret']
      project.appId = data['appId']
      project.src = "file://"+data["dirpath"];
      project.tools = {babel:true,completion:true,compress:true};
      project.remote = data["remote"];
      project.remotepath = data["remotepath"];

      if(data['remote']){
        store.dispatch({
          type:'apps/add',
          data:project
        })
        ProjectStore.update({id:'projects',data:projects});
        store.dispatch({
          type:'apps/backList',
          payload:false
        })
        setTimeout(function(){
          openProject(project["id"])  
        },50)
        return 
      }

      fs.exists(data["dirpath"]+'/index.html', function(exists) {
        // window.projects.push(project);
        store.dispatch({
          type:'apps/add',
          data:project
        })
        setTimeout(function(){
          if(exists){
            ProjectStore.update({id:'projects',data:projects});
            // fs.writeFile('project.json',JSON.stringify(projects),function(){
              store.dispatch({
                type:'apps/backList',
                payload:false
              })
              setTimeout(function(){
                openProject(project["id"])  
              },50)
            // })
          }else{
            var unzipper = new DecompressZip('tmp/init.zip')
            unzipper.on('error', function (err) {
              console.log('Caught an error');
            });
            unzipper.on('extract', function (log) {
              fs.readFile(data["dirpath"]+'/index.html', 'utf8', (err, template)=>{
                template = template.replace('{username}', window.user['name']);
                fs.writeFile(data["dirpath"]+'/index.html',template,(error)=>{
                  ProjectStore.update({id:'projects',data:projects});
                  store.dispatch({type:'apps/backList',payload:false})
                  setTimeout(function(){
                    openProject(project["id"])  
                  },50)
                })
              })
            });
            unzipper.on('progress', function (fileIndex, fileCount) {
              console.log('Extracted file ' + (fileIndex + 1) + ' of ' + fileCount);
            });
            unzipper.extract({
              path: data["dirpath"],
              filter: function (file) {
                  return file.type !== "SymbolicLink";
              }
            });
          }
        })
      });
    }
    logout(){
      let win = require('nw.gui').Window.get();
      win.leaveFullscreen();
      localStorage.removeItem('Joywok:User');
      window.user = {};
      let nowWin = require('nw.gui').Window.get();
      let platformWindow = window.Screen.screens[0]['bounds'];
      nowWin.resizeTo(840,640);
      nowWin.moveTo((platformWindow['width']-840)/2,(platformWindow['height']-640)/2);
      setTimeout(function(){
        hashHistory.push("/login");
      })
    }
  }
  function mapStateToProps(state) {
    return state;
  }
  
  const RootApp = connect(mapStateToProps)(Apps);
  class Main extends Component{
    constructor(props){
      super(props);
      if(!init){
        init = true
      }else{
        setTimeout(function(){
          store.dispatch({
            type:'apps/allreset'
          })  
        })
      }
    }
    render(){
      return (<Provider store={store}>
                <RootApp />
              </Provider>
              )
    }
  }

  return Main
}()
