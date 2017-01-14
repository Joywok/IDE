import dva from 'dva';
import { Router, Route } from 'dva/router';
import React,{ Component }from 'react';
import { createStore } from 'redux';
import { Provider ,connect} from 'react-redux';

require('../../styles/apps.css');

var config = fs.readFileSync('config.json', 'utf-8');
config = JSON.parse(config);

module.exports = function(){
  const app = dva();
  app.model({
    namespace: 'apps',
    state: {
      list: {},
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
  class Apps extends Component{
  	render(){
  		return (
  	   <div className="apps">
          <div className="avatar"><img src={"http://loc.joywok.com" + this.props.userinfo.avatar.avatar_l}/></div>
          <div className="name">大神：{this.props.userinfo.name}</div>
          <hr />
          <div className="list">
            <div className="item">
              <img src="/add.png"/>
              <span>添加项目</span>
            </div>
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
