'use strict';
let nowVersion = ide.version;
window.AppRestart = function() {
    var child,
    child_process = require("child_process"),
    gui = require('nw.gui'),
    win = gui.Window.get();
    if (process.platform == "darwin")  {
        child = child_process.spawn("open", ["-n", "-a", process.execPath.match(/^([^\0]+?\.app)\//)[1]], {detached:true});
    } else {
        child = child_process.spawn(process.execPath, [], {detached: true});
    }
    child.unref();
    win.hide();
    gui.App.quit();
}
window.newNotication = function(){
	let nowWin = gui.Screen.screens[0]['bounds'];
	let newWin;
	gui.Window.open('file://'+basurl+'/build/template/update.html', {
		x:nowWin['width']-375,
	  y:40,
	  width: 360,
	  height: 126,
    frame: false
	},function(new_win){
		newWin = new_win;
		newWin.on('document-end',function(){
			let target = $(newWin.window.document);
			let title = target.find('.title');
			let content = target.find('.content'); 
			content.html('新版本'+nowVersion+'已经准备好，立刻重启更新？');
			newWin.window.restart = function(){
				targz().extract('update.tgz', '.', function(err){
					if(err) console.log('Something is wrong ', err.stack);
					fsExtra.remove('update.tgz', function (err){});
					console.log('Job done!');
					newWin.close();
					window.AppRestart();
				});
			}
			newWin.window.close = function(){
				newWin.close();
			}
		})
	});
}
window.UpdateDownload = function(){
	let body = "";
	let cur = 0;
	let len = 0;
	let data = [];
	request
		.get(serverUrl+'/test/ide/update.tgz')
		.on( 'response', function ( data ) {
			len = parseInt(data.headers['content-length']);
		})
		.on("data", function(chunk) {
			data.push(chunk);
			body += chunk;
			cur += chunk.length;
			console.log("Downloading " + parseInt(100.0 * cur / len) + "% ")
		})
		.on('end',function(){
			window.newNotication();
		})
		.pipe(fs.createWriteStream('update.tgz'))
}

window.checkVersion = function(){
	request
		.get(serverUrl+'/ide/version/check',function(err, res){
			let data = JSON.parse(res.body);
			console.log(nowVersion,data['data']["varsion"])
			if(nowVersion != data['data']["varsion"]){
				nowVersion = data['data']["varsion"];
				window.UpdateDownload();
			}
		})
}
