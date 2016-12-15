import dva from 'dva';
import { Router, Route } from 'dva/router';
import React,{ Component }from 'react';
import { createStore } from 'redux';
import { Provider ,connect} from 'react-redux';
const app = dva();
app.model({
  namespace: 'count',
  state: {
    record: 0,
    current: 0,
  },
  reducers: {
    add(state) {
      const newCurrent = state.current + 1;
      console.log({ ...state,
        current: newCurrent,
      })
      return { ...state,
        current: newCurrent,
      };
    },
    minus(state) {
      return { ...state, current: state.current - 1};
    }
  }
});
class CountApp extends Component{
	render(){	
		return (
	    <div className="">
	     <div className="">Record:{this.props.record}</div>
      <div className="">Current:{this.props.current}</div>
	    </div>
	  );
	}
  componentDidMount(){
    const {dispatch} = this.props;
    dispatch({type: 'count/add'})
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
const RootApp = connect(mapStateToProps)(CountApp);

class Main extends Component{
  render(){
    return (<Provider store={store}>
              <RootApp />
            </Provider>
            )
  }
}
module.exports = Main

// module.exports = RootApp