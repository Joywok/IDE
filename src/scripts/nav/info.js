import dva from 'dva';
import { Router, Route ,Link} from 'dva/router';
import React,{ Component }from 'react';
import { createStore } from 'redux';
import { Provider ,connect} from 'react-redux';
import { EventEmitter } from 'events';
module.exports = function(){
  // let project = projects[0];
  let init = false;
  let project;
  let url ;
  let server;
  let appServer
  const app = dva();
  const emitter = new EventEmitter();
  const mime = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
  };
  function initServer(){
    if(init){
      server.close();
      // server.exit();
    }
    console.log(init,'41');
    server = http.createServer(function (req, res) {
      console.log(`${req.method} ${req.url}`);
      const parsedUrl = httpUrl.parse(req.url);
      let pathname = `${parsedUrl.pathname}`;
      console.log(parsedUrl,'123123',pathname)
      const mimeType = {
        '.ico': 'image/x-icon',
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mpeg',
        '.svg': 'image/svg+xml',
        '.pdf': 'application/pdf',
        '.doc': 'application/msword',
        '.eot': 'appliaction/vnd.ms-fontobject',
        '.ttf': 'aplication/font-sfnt'
      };
      pathname = url+pathname
      fs.exists(pathname, function (exist) {
        if(!exist) {
          res.statusCode = 404;
          res.end(`File ${pathname} not found!`);
          return;
        }
        if (fs.statSync(pathname).isDirectory()) {
          pathname += 'index.html';
        }
        fs.readFile(pathname, function(err, data){
          if(err){
            res.statusCode = 500;
            res.end(`Error getting the file: ${err}.`);
          } else {
            const ext = path.parse(pathname).ext;
            res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
            res.end(data);
          }
        });
      });
    })
    
    server.listen('0','127.0.0.1',function(){
      var port = server.address().port;
      window.nodeServerPort = port;
      let date = Date.parse(new Date())/1000;
      $("#phone-inset").attr({src:"http://127.0.0.1:"+nodeServerPort});
      $("#phone-inset").removeClass('hide');
    });
  }
  function initController(){
    project = _.filter(projects,function(i){return i['id'] == user['openId']})[0];
    url = project['src'].split('file://')[1];
    console.log(project,'94行');
    initServer();
  }

  initController();
  const nowWin = require('nw.gui').Window.get();
  let initData = {
    windowW:nowWin.width,
    windowH:nowWin.height,
    project:project,
    sidebar:'edit',
    showPlatform:false,
    showPlatformVal:'iPhone 4',
    phoneW:320,
    phoneH:480,
    filesList:[],
    title:'Joywok',
    btns:[],
    footer:[],
    tabs:[],
    tabsBg:''
  }
  app.model({
    namespace: 'info',
    state: initData,
    reducers: {
      changeSidebar(state,action){
        return { ...state,
          sidebar: action["payload"],
        };
      },
      showPlatform(state,action) {
        return { ...state,
          showPlatform: action["payload"],
        };
      },
      changePhoneSize(state,action){
        return _.extend({},state,action['payload']);
      },
      changeWindow(state,action){
        return _.extend({},state,action['data']);
      },
      addFileList(state,action){
        return _.extend({},state,{filesList:action['data']});
      },
      changeTitle:function(state,action){
        return _.extend({},state,{title:action['data']});
      },
      setFuncBtns:function(state,action){
        return _.extend({},state,{btns:action['data']});
      },
      setFuncBtnStatus:function(state,action){
        let btns = [];
        _.each(state["btns"],function(i){
          if(i['type'] == action['data']['type']){
            i['disabled'] = (action['data']['disabled']=='disable'?true:false)
            btns.push(i)
          }else{
            btns.push(i)
          }
        })
        return _.extend({},state,{btns:btns});
      },
      showTabs:function(state,action){
        return _.extend({},state,{tabs:action['data']['tabs'],tabsBg:action['data']['style']});
      },
      changeTabs:function(state,action){
        let tabs = [];
        _.each(state["tabs"],function(i){
          if(i['num'] == action['data']['num']){
            i['active'] = true
            tabs.push(i)
          }else{
            i['active'] = false
            tabs.push(i)
          }
        })
        return _.extend({},state,{tabs:tabs});
      },
      hideTabs:function(state){
        return _.extend({},state,{tabs:[],tabsBg:''});
      },
      resetNormal:function(state){
        return _.extend({},state,{tabs:[],tabsBg:'',btns:[],footer:[],title:'Joywok'});
      },
      allreset:function(){
        return _.extend({},{
          windowW:nowWin.width,
          windowH:nowWin.height,
          project:project,
          sidebar:'edit',
          showPlatform:false,
          showPlatformVal:'iPhone 4',
          phoneW:320,
          phoneH:480,
          filesList:[],
          title:'Joywok',
          btns:[],
          footer:[],
          tabs:[],
          tabsBg:''
        })
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
  const menu = require('./../menu/index')(emitter);  
  const Phone = require('./../components/phone.js')(app,store);
  const Edit = require('./../editinfo/edit')(app,store);
  const Debug = require('./../editinfo/debug')(app,store);
  const Project = require('./../editinfo/project')(app,store);
  const windows = require('./../platform/windows')(app,store,emitter)
  class CountApp extends Component{
  	render(){	
  		return (
  	    <div className="info ide-info">
          <div className="ide-info-sidebar">
            <div className="ide-info-user">
              <img src={serverUrl+user.avatar.avatar_l} />
            </div>
            <div className="ide-info-nav">
              <div activeClassName="active" className={"ide-info-nav-i "+(this.props.sidebar=='edit'?'active':'')} onClick={(e)=>this.changeSidebar(e,'edit')}>
                <div className="ide-info-nav-icon"><i className="icon-edit"></i></div>
                <div className="ide-info-nav-val">编辑</div>
              </div>
              <div activeClassName="active" className={"ide-info-nav-i "+(this.props.sidebar=='debug'?'active':'')} onClick={(e)=>this.changeSidebar(e,'debug')}>
                <div className="ide-info-nav-icon"><i className="icon-code"></i></div>
                <div className="ide-info-nav-val">调试</div>
              </div>
              <div activeClassName="active" className={"ide-info-nav-i "+(this.props.sidebar=='project'?'active':'')} onClick={(e)=>this.changeSidebar(e,'project')}>
                <div className="ide-info-nav-icon"><i className="icon-project"></i></div>
                <div className="ide-info-nav-val">项目</div>
              </div>
            </div>
            <div className="ide-sidebar-opear">
              <div className="ide-sidebar-sep"></div>
              <div className="ide-info-exit" onClick={(e)=>this.exitProject(e)}>
                <div className="ide-info-exit-ico"></div>
                <span>退出</span>
              </div>
            </div>
          </div>
          <div className="ide-info-childview">
            <div className={"ide-info-spcail "+(this.props.sidebar=='project'?'hide':'')}>
              <Phone {...this.props}></Phone>
              <Edit {...this.props}></Edit>
              <Debug {...this.props}></Debug>  
            </div>
            <Project {...this.props}></Project>
          </div>
  	    </div>
  	  );
  	}
    componentDidMount(){
      const {dispatch} = this.props;
      let fs = require('fs');
      setTimeout(function(){
        return 
        $('.xxxxx').html('');
        var oHead = document.getElementsByClassName('xxxxx')[0];
        var oScript= document.createElement("iframe");
        oScript.id = "foo";
        oScript.src='file:///'+basurl+'/src/template/editor.html';
        oScript.onload=function(){
          fs.readFile(basurl+'/webpack.config.js',{
            encoding:'utf-8'
          },function(err,data){
            console.log('发送数据')
            oScript.contentWindow.postMessage(data, "*");
          })
        }
        oHead.appendChild(oScript);
        return 
        let iframeWin =  document.getElementById("foo").contentWindow;
        console.log(iframeWin,'1231231');
        fs.readFile(basurl+'/webpack.config.js',{
          encoding:'utf-8'
        },function(err,data){
          console.log('发送数据')
          iframeWin.postMessage(data, "*");
        })
        return 
        $('.xxxxx').html('')
        var oHead = document.getElementsByClassName('xxxxx')[0];
        var oScript= document.createElement("iframe");
        oScript.id = "foo";
        oScript.partition = "trusted";
        // oScript.src='file:///'+basurl+'/src/template/template.html?src=xxxxxxxxx';
         oScript.src='chrome-extension://lblocnhdapdghmpkknoijhgonjfikalb/src/template/template.html';
        oHead.appendChild(oScript);
        console.log(oScript,'1231');
      },0)
      console.log(document.getElementById('body'))
    }
    changeSidebar(e,data){
      let dispatch = this.props.dispatch;
      dispatch({
        type:'info/changeSidebar',
        payload:data
      })
    }
    exitProject(e){
      let data = user;
      delete data['openId'];
      UserStore.update({id:'login',data:data});
      // fs.writeFile('config.json',JSON.stringify(data),function(){
        window.user = data;
        hashHistory.push("/apps");  
      // })
    }
  }
  function mapStateToProps(state) {
    console.log('这里会走几次');
    return state;
  }
  const RootApp = connect(mapStateToProps)(CountApp);
  class Main extends Component{
    constructor(props){
      super(props);
      if(!init){
        init = true
      }else{
        initController();
        setTimeout(function(){
          store.dispatch({
            type:'info/allreset'
          })  
        })
      }
    }
    render(){
      return (<Provider store={store}>
                <RootApp {...this.props} />
              </Provider>
              )
    }
  }
  return Main
}()
