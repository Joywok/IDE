'use strict';
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
		newWin.on('loaded',function(){
			let target = $(newWin.window.document);
			let title = target.find('.title');
			let content = target.find('.content'); 
			content.html('新版本0.0.1已经准备好，立刻重启更新？');
			newWin.window.restart = function(){
				var body = "";
				var cur = 0;
				var len = 0;
				var data = [];
				request
					.get('http://192.168.1.73/test/a.tgz')
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
						console.log('下载完了');
						targz().extract('a.tgz', '.', function(err){
						  if(err) console.log('Something is wrong ', err.stack);
						  fsExtra.remove('a.tgz', function (err){});
						  console.log('Job done!');
						});
					})
					.pipe(fs.createWriteStream('a.tgz'))
			}
			newWin.window.close = function(){
				newWin.close();
			}
		})
	});
}

