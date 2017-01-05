'use strict';
const nowWin = require('nw.gui').Window.get();
const Screen = require('nw.gui').Screen.Init()

module.exports = function(app,store,emitter){
	let platform = Screen.screens[0]['bounds'];
	if(platform['width']>1440){
		nowWin.resizeTo(1440,900);
	}else{
		nowWin.maximize();
	}
	nowWin.on('resize',function(){
    store.dispatch({
      type:'info/changeWindow',
      data:{
        windowW:nowWin.width,
        windowH:nowWin.height
      }
    })
  })

  function reloadWindow(){
    let src = $('#phone-inset').attr('src').split('?')[0];
    $('#phone-inset').attr('src','about:blank');
    $('#phone-inset').attr('src',src+'?time='+Math.random());
    let consoleContainer = document.getElementById('aaa');
    consoleContainer.src = src+'?time='+Math.random()
    let cdt = document.getElementById('cdt');
    setTimeout(function(){
      document.getElementById('aaa').showDevTools(true, cdt);  
    },300)
  }
  emitter.addListener('reload',reloadWindow)

  window.addEventListener('message',function(e){
    if(e.data['type'] == 'changeFile'){
      reloadWindow();
    }
  })
};