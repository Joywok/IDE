import dva from 'dva';
import { Router, Route } from 'dva/router';
import React,{ Component }from 'react';
import { createStore } from 'redux';
import { Provider ,connect} from 'react-redux';

require('../../styles/apps.css');

let config = fs.readFileSync('config.json', 'utf-8');
config = JSON.parse(config);
let list = fs.readFileSync('project.json', 'utf-8');
list = JSON.parse(list);
list = [
  {
    "id": '1',
    "name" : '1231',
    "src" : '~/Desktop/demo'
  },
  {
    "id": '2',
    "name" : '43221',
    "src" : '~/Desktop/demo'
  }
];
module.exports = function(){
  const app = dva();
  app.model({
    namespace: 'apps',
    state: {
      list: list,
      userinfo: config
    },
    reducers: {
      add(state) {
        const newCurrent = state.list + 1;
        return { ...state,
          list: newCurrent,
        };
      },
      list(state) {
        const list = state.list;
        return { ...state,
          list: list,
        };
      }
    }
  });

  function createProject(){
     hashHistory.push("/buildapps");
  }

  function openProject(id, value){
      config.oepnId = id;
      fs.writeFile('config.json',JSON.stringify(config),function(){
        hashHistory.push("/info");
      })
  }

  class ChildeView extends Component{
    render(){
      return(
         <div className="item" onClick={openProject.bind(null, this.props.id)}>
            <div><img src="http://loc.joywok.com/openfile/getfile?type=jw_n_avatar&size=large&id=fKDzDqvrBZULanBV"/></div>
            <div>测试项目1</div>
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

  class Apps extends Component{
  	render(){
      let self = this;
  		return (
  	   <div className="apps">
          <div className="avatar"><img src={"http://loc.joywok.com" + this.props.userinfo.avatar.avatar_l}/></div>
          <div className="name">大神：{this.props.userinfo.name}</div>
          <hr />
          <div className="list">
            <div className="item" onClick={createProject}>
              <div><img src={"http://loc.joywok.com" + this.props.userinfo.avatar.avatar_l}/></div>
              <div>添加项目</div>
            </div>
            {this.props.list.map(function(item) {
              return <ChildeView {...item} dispatch={self.props.dispatch}></ChildeView>
            })}
          </div>
          <hr />
  	   </div>
  	  );
  	}

    componentDidMount(){
      const {dispatch} = this.props;
      dispatch({type: 'apps/list'});
    }
  }
  function mapStateToProps(state) {
    return state;
  }
  function App(state = app._models[0]["state"],action){
    if(app._models['0'].reducers){
      let hasFunc = _.filter(app._models['0'].reducers,function(i,key){return key==action['type']})
      if(hasFunc.length!=0){
        return (hasFunc[0](state))
      }else{
        return state
      }
    }else{
      return state
    }
  }
  let store = createStore(App);
  const RootApp = connect(mapStateToProps)(Apps);
  class Main extends Component{
    render(){
      return (<Provider store={store}>
                <RootApp />
              </Provider>
              )
    }
  }

  var project = fs.readFileSync('project.json', 'utf-8');
  project = JSON.parse(project);
  if(project.length != 0){

  }

  return Main
}()
