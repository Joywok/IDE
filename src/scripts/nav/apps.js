import dva from 'dva';
import { Router, Route } from 'dva/router';
import React,{ Component }from 'react';
import { createStore } from 'redux';
import { Provider ,connect} from 'react-redux';

require('../../styles/apps.css');

module.exports = function(){
  const app = dva();
  let init = false;
  console.log('xxxxxxxxxxxxx',projects);
  app.model({
    namespace: 'apps',
    state: {
      list: projects,
      userinfo: user
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
          userinfo: user
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
  function resetModel(){
  }

  function createProject(){
      $(".apps").html('\
        <div class="header">\
          <div class="back"> < 返回 </div>\
          <div class="title"> 添加项目 </div>\
        </div>\
        <form>\
        <p><label>项目名称: </label><input type="text" name="pname" /></p>\
        <p><label>corpID: </label><input type="text" name="corpid" /></p>\
        <p><label>copeSecret: </label><input type="text" name="copesecret" /></p>\
        <p><label>appID: </label><input type="text" name="appid" /></p>\
        <p><label>项目目录: </label><input type="text" name="file" /><button type="button">选择文件</button><input class="file" type="file" nwdirectory id="choseDirectory"/><p>\
        <p class="btn-group"><div class="cencle">取消</div> <div class="success">创建项目</div><p>\
        </form>\
      ')
      var chooser = $('#choseDirectory');
      var btn = $('button');
      btn.bind('click', function(){
        chooser.click(); 
      })
      chooser.unbind('change');
      chooser.change(function(evt) {
        let val = $(this).val();
        console.log(val);
        $('input[name="file"]').val(val);
      });
      chooser.on('cancel',function(){})
      
      $(".back").click(function(){
        alert('back')
        window.location.reload()
      })

      $(".success").click(function(evt){
          let project = {};
          var value = $('input[name="file"]').val()
          project.id = parseInt(Math.random()*1000000000);
          project.name = $('input[name="pname"]').val();
          project.corpID = $('input[name="corpid"]').val();
          project.copeSecret = $('input[name="copesecret"]').val();
          project.appID = $('input[name="appid"]').val();
          project.src = "file://"+value;
          project.tools = {babel:true,completion:true,compress:true};
          fs.exists(value+'/index.html', function(exists) {
            // window.projects.push(project);
            store.dispatch({
              type:'apps/add',
              data:project
            })
            setTimeout(function(){
              if(exists){
                fs.writeFile('project.json',JSON.stringify(projects),function(){
                  openProject(project["id"])
                })
              }else{
                var unzipper = new DecompressZip('tmp/init.zip')
                unzipper.on('error', function (err) {
                  console.log('Caught an error');
                });
                unzipper.on('extract', function (log) {
                  fs.writeFile('project.json',JSON.stringify(projects),function(){
                    openProject(project["id"])
                  })
                });
                unzipper.on('progress', function (fileIndex, fileCount) {
                  console.log('Extracted file ' + (fileIndex + 1) + ' of ' + fileCount);
                });
                unzipper.extract({
                  path: value,
                  filter: function (file) {
                      return file.type !== "SymbolicLink";
                  }
                });
              }
            })
          });
          evt.stopPropagation();
      })
      $(".cencle").click(function(){
        alert('cencle')
        window.location.reload()
      })
  }

  function openProject(id, value){
      window.user.openId = id;
      fs.writeFile('config.json',JSON.stringify(user),function(){
        hashHistory.push("/info");
      })
  }

  class ChildeView extends Component{
    render(){
      return(
         <div className="item" onClick={openProject.bind(null, this.props.id)}>
            <div><img src={serverUrl+user.avatar.avatar_l} /></div>
            <div>{this.props.name}</div>
          </div>
        )
    }
  }
  class Apps extends Component{
  	render(){
      console.log('123123123123123');
      let self = this;
  		return (
  	   <div className="apps">
          <div className="avatar"><img src={serverUrl + this.props.userinfo.avatar.avatar_l}/></div>
          <div className="name">大神：{this.props.userinfo.name}</div>
          <hr />
          <div className="list">
            <div className="item" onClick={createProject}>
              <div><img src={serverUrl + this.props.userinfo.avatar.avatar_l}/></div>
              <div>添加项目</div>
            </div>
            {this.props.list.map(function(item) {
              return <ChildeView {...item} dispatch={self.props.dispatch}></ChildeView>
            })}
          </div>
          <hr />
          <div className="new">
          </div>
  	   </div>
  	  );
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
