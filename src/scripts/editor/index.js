'use strict'
import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore , combineReducers} from 'redux';
import { Provider ,connect} from 'react-redux';
let FileType = {
  html:'html',
  js:'javascript',
  css:'css',
  json:'json',
  less:'less'
}
let watcher = chokidar.watch(project['src'].split('file://')[1], {
  ignored: /(^|[\/\\])\../,
  persistent: true
});
let log = console.log.bind(console);
setTimeout(function(){
  watcher
    .on('add', path => log(`File ${path} has been added`))
    .on('change', path => log(`File ${path} has been changed`))
    .on('unlink', path => log(`File ${path} has been removed`)) 
    .on('addDir', path => log(`Directory ${path} has been added`))
    .on('unlinkDir', path => log(`Directory ${path} has been removed`))
    .on('error', error => log(`Watcher error: ${error}`))
    .on('ready', () => log('Initial scan complete. Ready for changes'))
    .on('raw', (event, path, details) => {
      log('Raw event info:', event, path, details);
    });
},500)
let data = {
  project:project,
  listData:listData,
  tabs:[],
  nowTabs:{}
}
function changeTreeView(data){
  return _.extend({},{type:'changeTreeView',data:data})
}
function changeEdit(data){
  return _.extend({},{type:'changeEdit',data:data}) 
}
function addEditor(data){
  return _.extend({},{type:'addEditor',data:data}) 
}
function closeFile(data){
  return _.extend({},{type:'closeFile',data:data})  
}
function editorRefresh(){
  return _.extend({},{type:'editorRefresh'})  
}
function changeEditWindow(){
  return _.extend({},{type:'changeEditWindow'})  
}
function Reducer(state = data,action){
  switch(action.type){
    case 'changeTreeView':
      return _.extend({},state,{listData:action['data'],tabs:[],nowTabs:{}})
      break;
    case 'changeEdit':
      return _.extend({},state,{nowTabs:action['data']})
      break;
    case 'addEditor':
      var nowTabs;
      if(state.tabs.length!=0){
        var tabs = state.tabs;
        var nowData = _.filter(tabs,function(i){return i['id']==action['data']['id']});
        if(nowData.length!=0){
          nowTabs = nowData[0]
        }else{
          tabs.push(action['data'])
          nowTabs = tabs[tabs.length-1];
        }
      }else{
        var tabs = [];
        tabs.push(action['data'])
        nowTabs = tabs[0]
      }
      return _.extend({},state,{
        tabs:tabs,
        nowTabs:nowTabs
      });
      break;
    case 'closeFile':
      var tabs = [];
      tabs = _.filter(state['tabs'],function(i){
        return i['id'] != action['data']['id']
      })
      return _.extend({},state,{
        tabs:tabs,
        nowTabs:(tabs.length!=0?tabs[tabs.length-1]:{})
      });
      break;
    case 'editorRefresh':
      return _.extend({},state,{
        tabs:[],
        nowTabs:{}
      });
      break;
    case 'changeEditWindow':
      return _.extend({},state);
      break;
    default:
      return state
  }
}
const App = combineReducers({
  Reducer
})
let store = createStore(App);
let target;
window.addEventListener('message', function(e){
  if(!target) target = e;
  let data = e.data;
  if(data.type == 'window'){
    let width = $('.editor-main').width();
    let height = $('.editor-main').height();
    $('.editor-main-i').css({
      width:width+'px',
      height:height+'px'
    })
    store.dispatch(changeEditWindow())
  }else{
  }
});


class ChildeView extends Component{
  render(){
    let children;
    let icon;
    if(this.props.children){
      children = <div className="info-tree-view-i-child">
                    {this.props.children.map(function(item) {
                      return <ChildeView {...item}></ChildeView>
                    })}
                 </div>
      icon = <i className="fa fa-folder"></i>
    }else{
      icon = <div className="no-icon"></div>
    }
    return(
        <div className="info-tree-view-i">
          <div className="info-tree-view-i-s" onClick={(e)=>this.clickChild(e)}>
            <div className="info-tree-view-i-ico">
              {icon}
            </div>
            <div className="info-tree-view-i-val">{this.props.name}</div>
            <div className="info-tree-view-i-opear">
              <i className="fa fa-gears"></i>
            </div>
          </div>
          {children}
        </div>
      )
  }
  clickChild(evt){
    let dispatch = this.props.dispatch
    let target = $(evt.currentTarget);
    let parent = target.parent();
    if(this.props.type == 'folder'){
      if(parent.hasClass('show-child')){
        parent.removeClass('show-child')
        target.find('.fa').removeClass('fa-folder-open').addClass('fa-folder')
      }else{
        parent.addClass('show-child')
        target.find('.fa').removeClass('fa-folder').addClass('fa-folder-open')
      }
    }else{
      dispatch(addEditor(this.props))
    }
  }
}
class TreeView  extends Component{
  render(){
    let data = this.props.Reducer;
    let self = this;
    return(<div className="info-tree-view">
            <div className="info-tree-view-title">
              <div className="info-tree-view-tilte-refresh" onClick={(e)=>this.refresh(e)}>
                <i className="fa fa-refresh"></i>
              </div>
              <div className="info-tree-view-tilte-val">{data.project['name']}</div>
            </div>
            <div className="info-tree-view-list">
              {data.listData.map(function(item) {
                return <ChildeView {...item} dispatch={self.props.dispatch}></ChildeView>
              })}
            </div>
          </div>)
  }
  refresh(e){
    fileId = 0;
    oldFile = [];
    let listData = geFileList(project['src'].split('file://')[1]);
    listData = sortFolder(listData);
    let dispatch = this.props.dispatch;
    dispatch(changeTreeView(listData))
  }
}
class EditContainer extends Component{
  constructor(props){
    super(props);
    this.allEdit = [];
  }
  render(){
    console.log(this.allEdit,'123123123123')
    let data = this.props.Reducer;
    let self = this;
    return (<div className="editor-main">
            </div>)
  }
  componentDidMount(){
    let self = this;
    let ctrlKey = false;
    let sCode = false;
    $('.editor-main').delegate('.editor-main-i','keydown',function(evt){
      let data = self.props.Reducer;
      let nowData = _.filter(data['tabs'],function(i){return i['id'] == data['nowTabs']['id']})[0];
      if(evt.keyCode == 17){
        ctrlKey = true
      }
      if(evt.keyCode == 83){
        sCode = true
      }
      if(evt.keyCode == 91){
        ctrlKey = true
      }
      if(ctrlKey && sCode ){
        fs.writeFile(nowData['value'],self['editor_'+nowData['id']].getValue());
        target.source.postMessage({
          type:'changeFile'
        },'*')
      }
    })
    $('.editor-main').delegate('.editor-main-i','keyup',function(){
      ctrlKey = false;
      sCode =false
    })
  }
  shouldComponentUpdate(options){
    let self = this;
    let data = options['Reducer'];
    let dispatch = options['dispatch'];
    let width = $('.editor-main').width();
    let height = $('.editor-main').height();
    if(data['nowTabs']["id"] && data['nowTabs']["id"].length!=0){
      let nowData = _.filter(data['tabs'],function(i){return i['id'] == data['nowTabs']["id"]})
      if(nowData.length!=0){
        nowData = nowData[0];
        $('.editor-main-i').addClass('hide');
        if(this['editor_'+nowData['id']]){
          $('#editor-'+nowData['id']).removeClass('hide');
        }else{
          this.allEdit.push(nowData);
          $(".editor-main").append('<div class="editor-main-i "id="editor-'+nowData['id']+'" style="width:'+(width)+'px;height:'+(height)+'px"></div>');
          let fileType = nowData['value'].split('.');
          fileType = fileType[fileType.length-1];
          let code = fs.readFileSync(nowData["value"]);
          this['editor_'+nowData['id']] = monaco.editor.create(document.getElementById('editor-'+nowData['id']), {
            value: [
             code
            ].join('\n'),
            autoSize:true,
           language:FileType[fileType]
          });  
        }
      }
    }else{
      $(".editor-main").html('');
    }
    _.each(this.allEdit,function(i){
      self['editor_'+i['id']] && self['editor_'+i['id']].layout({
        width: width,
        height: height
      });
    })
    return false
  } 
  closeFile(data){
    this.allEdit = _.filter(this.allEdit,function(i){
      return i['id']!=data['id']
    })
    this['editor_'+data['id']] = null;
    $('#editor-'+data['id']).remove();
  }
  refresh(){
    let self = this;
    let dispatch = this.props.dispatch
    _.each(this.allEdit,function(i){
      self['editor_'+i['id']] = null;
    })
    $(".editor-main").html('');
    this.allEdit = [];
    dispatch(editorRefresh())
  }
}
class Edit extends Component{
  render(){
    let data = this.props.Reducer;
    let self = this;
    return (
        <div className="editor-container">
          <div className="editor-container-tabs">
            {data.tabs.map(function(i){
              return (<div className={"editor-tabs-i "+(data['nowTabs']['id'] == i["id"]?'active':'')} onClick={(e)=>self.changeEdit(e,i)}>
                      <div className="editor-tabs-i-w">
                        <div className="editor-tabs-i-val ellipsis">{i["name"]}</div>
                        <div className="editor-tabs-i-close" onClick={(e)=>self.closeFile(e,i)}><i className="fa fa-close"></i></div>
                      </div>
                    </div>)
            })}
          </div>
          <EditContainer {...this.props} ref="children"></EditContainer>
        </div>
      )
  }
  changeEdit(e,i){
    let dispatch = this.props.dispatch;
    dispatch(changeEdit(i))
  }
  closeFile(e,i){
    this.refs.children.closeFile(i);
    let dispatch = this.props.dispatch;
    dispatch(closeFile(i));
    e.stopPropagation();
  }
  refresh(){
    this.refs.children.refresh()
  }
}
class Controller extends Component {
  render() {
    return (
        <div className="main-w">
          <TreeView {...this.props} refresh={this.refresh}></TreeView>
          <Edit {...this.props} ref="edit"></Edit>
        </div>
    )
  }
  componentDidMount(){
  }
  refresh(){
    this.refs.edit.refresh()
  }
}
function select(state) {
  return state
}
let RootApp = connect(select)(Controller);

let rootElement = document.getElementById('main');
render(
  <Provider store={store}>
    <RootApp />
  </Provider>,
  rootElement
)
