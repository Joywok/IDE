module.exports = function(emitter){
	var gui = require('nw.gui');
	var menu = new gui.Menu({ type: 'menubar' });
	var menuItems = new gui.Menu();
	let platform = 'darwin' === process.platform ? 'cmd' : 'ctrl';
	menuItems.append(new gui.MenuItem({ 
		label: '项目重建',
		key: 'B',
		modifiers:platform,
		click:function(){
		}
	}));
	menuItems.append(new gui.MenuItem({ 
		label: '刷新',
		key: 'R',
		modifiers:platform,
		click:function(){
			emitter.emit('reload')
		}
	}));
	menuItems.append(new gui.MenuItem({ 
		label: '后退',
		key: 'Left',
		modifiers:platform,
		click:function(){
		}
	}));
	menuItems.append(new gui.MenuItem({ 
		label: '前进',
		key: 'Right',
		modifiers:platform,
		click:function(){
		}
	}));
	menuItems.append(new gui.MenuItem({ 
		type: 'separator'
	}));
	menuItems.append(new gui.MenuItem({ 
		label: '设置',
		click:function(){
		}
	}));
	menu.createMacBuiltin('App',{
	    // hideEdit: true,
	    hideWindow: true
	});
	menu.append(
    new gui.MenuItem({
      label: '动作',
      submenu: menuItems 
    })
	);
	gui.Window.get().menu = menu;
}