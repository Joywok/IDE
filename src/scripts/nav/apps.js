import dva from 'dva';
import { Router, Route } from 'dva/router';
import React,{ Component }from 'react';
import { createStore } from 'redux';
import { Provider ,connect} from 'react-redux';

require('../../styles/apps.css');

module.exports = function(){
  const app = dva();
  app.model({
    namespace: 'apps',
    state: {
      list: projects,
      userinfo: user
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
     hashHistory.push("");
  }

  function openProject(id, value){
      user.oepnId = id;
      fs.writeFile('config.json',JSON.stringify(user),function(){
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

  return Main
}()
