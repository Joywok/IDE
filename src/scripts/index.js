import dva from 'dva';
// 1. Initialize
window.app = dva();
// 2. Plugins
//app.use({});
// 3. Model
//app.model(require('./models/example'));
// 4. Router
app.router(require('./router/router'));
// 5. Start
app.start('#main');
