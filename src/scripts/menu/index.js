module.exports = function(emitter){
	var gui = require('nw.gui');
	const nowWin = gui.Window.get()
	const tray = new gui.Tray({
		icon:(platform=="mac"?'build/images/icon-64.icns':'build/images/icon-32.png'),
		alticon:true
	});//window下面可以
	tray.tooltip = '点击打开'
	tray.on('click',function(){
		nowWin.show();
  })
  let platformKey = ('darwin' === process.platform ? 'cmd' : 'ctrl');
  var menuItems = new gui.Menu();
	// menuItems.append(new gui.MenuItem({ 
	// 	label: '项目重建',
	// 	key: 'B',
	// 	modifiers:platformKey,
	// 	click:function(){
	// 	}
	// }));
	menuItems.append(new gui.MenuItem({ 
		label: '刷新',
		key: 'R',
		modifiers:platformKey,
		click:function(){
			emitter.emit('phoneReload');
		}
	}));
	// menuItems.append(new gui.MenuItem({ 
	// 	label: '后退',
	// 	key: 'Left',
	// 	modifiers:platformKey,
	// 	click:function(){
	// 	}
	// }));
	// menuItems.append(new gui.MenuItem({ 
	// 	label: '前进',
	// 	key: 'Right',
	// 	modifiers:platformKey,
	// 	click:function(){
	// 	}
	// }));
	// menuItems.append(new gui.MenuItem({ 
	// 	type: 'separator'
	// }));
	// menuItems.append(new gui.MenuItem({ 
	// 	label: '设置',
	// 	click:function(){
	// 	}
	// }));
	if(platform == 'mac'){
		var menu = new gui.Menu({ type: 'menubar' });
		menu.createMacBuiltin('App',{
		    // hideEdit: true,
		    // hideWindow: true
		});
		menu.append(
	    new gui.MenuItem({
	      label: '动作',
	      submenu: menuItems 
	    })
		);
		gui.Window.get().menu = menu;
	}else{
		
		tray.menu = menuItems;
	}
}