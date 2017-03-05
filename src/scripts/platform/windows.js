'use strict';
const nowWin = require('nw.gui').Window.get();
window.phoneInset;
window.EditorTarget
module.exports = function(app,store,emitter){
  let jssdkCallHander = require('./../jssdk/jssdk-callHander');
  jssdkCallHander = new jssdkCallHander(store);
	let platformWindow = Screen.screens[0]['bounds'];
	if(platformWindow['width']>1440){
		nowWin.resizeTo(1440,900);
    // if(platformWindow['width'] == 1440){
    //   nowWin.maximize();
    //   nowWin.moveTo(0,0);
    // }else{
    nowWin.moveTo((platformWindow['width']-1440)/2,(platformWindow['height']-900)/2)
    // }
	}else{
    if(platformWindow['width'] == '1440'){
      if(platform == 'win'){
        nowWin.maximize();
      }else{
        nowWin.maximize();
        nowWin.moveTo(0,0);  
      }
    }else{
      nowWin.maximize();  
    }
	}
  let time;
	nowWin.on('resize',function(){
    clearTimeout(time);
    time = setTimeout(function(){
      store.dispatch({
        type:'info/changeWindow',
        data:{
          windowW:nowWin.width,
          windowH:nowWin.height
        }
      })  
    },400)
  })
  window.addEventListener('message',function(e){
    let type = e.data['type'];
    let data = e.data;
    if(type == 'changeFile'){
      // reloadWindow();
      emitter.emit('phoneReload');
    }else if(type == 'changePhone'){
      switch(data['phoneType']){
        case "setTitle":
          store.dispatch({
            type:'info/changeTitle',
            data:data['data']['title']
          })
          break;
        case "setFuncBtns":
          store.dispatch({
            type:'info/setFuncBtns',
            data:data['data']['buttons']
          })
          break;
        case "setFuncBtnStatus":
          store.dispatch({
            type:'info/setFuncBtnStatus',
            data:{
              type:data['data']['type'],
              disabled:data['data']['status']
            }
          })
          break;
        case "showTabs":
          store.dispatch({
            type:'info/showTabs',
            data:data['data']
          })
          break;
        case "hideTabs":
          store.dispatch({
            type:'info/hideTabs'
          })
          break;
        default:
          break;
      }
    }else if(type=="phoneInsetInit"){
      // if(!window.phoneInset) {
        window.phoneInset = e.source;
        store.dispatch({
          type:'info/resetNormal'
        })
      // }
    }else if(type=="phoneFile"){
      if(data['phoneType'] == 'choseFile'){
        $('.phone-specail').html('<input style="display:none;" id="fileDialog" type="file" accept=".png,.gif,.jpg,.jpeg" />');
        let chooser = $('#fileDialog');
        chooser.unbind('change cancel');
        chooser.change(function(evt){
          phoneInset.postMessage({
            type:'callback',
            data:'{"errMsg":"choseFile:ok","localFiles":[{"id":"http://blogs-1774886889.cn-north-1.elb.amazonaws.com.cn/siteconsole/public/images/blog/article/1AdnlO_resize.jpeg","type":"image/jpeg"},{"id":"http://blogs-1774886889.cn-north-1.elb.amazonaws.com.cn/siteconsole/public/images/blog/article/1B5Rto_resize.png","type":"image/png"}]}'
          },'*')
        });
        chooser.on("cancel",function(evt) {
          phoneInset.postMessage({
            type:'callback',
            data:'{"errMsg":"choseFile:cancel"}'
          },'*')
        });
        chooser.click();  
      }else if(data['phoneType'] == 'xxxxx'){

      }
    }else if(type == 'jssdk'){
      jssdkCallHander.init(data["data"])
    }else if(type == 'changePhoneUrl'){
      store.dispatch({
        type:'info/changePhoneUrl',
        data:data['data']
      })
    }
  })
};