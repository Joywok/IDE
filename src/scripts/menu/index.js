module.exports = function(emitter){
	var gui = require('nw.gui');

	if(platform == 'mac'){
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
	}else{
		var gui = require('nw.gui');
		var item;

		// Create a separator
		item = new gui.MenuItem({ type: 'separator' });

		// Create a normal item with label and icon
		item = new gui.MenuItem({
		  type: "normal", 
		  label: "I'm a menu item",
		  icon: "img/icon.png"
		});

		// Or you can omit the 'type' field for normal items
		item = new gui.MenuItem({ label: 'Simple item' });

		// Bind a callback to item
		item = new gui.MenuItem({
		  label: "Click me",
		  click: function() {
		    console.log("I'm clicked");
		  },
		  key: "s",
		  modifiers: "ctrl-alt",
		});

		// You can have submenu!
		var submenu = new gui.Menu();
		submenu.append(new gui.MenuItem({ label: 'Item 1' }));
		submenu.append(new gui.MenuItem({ label: 'Item 2' }));
		submenu.append(new gui.MenuItem({ label: 'Item 3' }));
		item.submenu = submenu;

		// And everything can be changed at runtime
		item.label = 'New label';
		item.click = function() { console.log('New click callback'); };
	}
}