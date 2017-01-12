function initBridge(){
  this.init = function(callback){
    callback('xxxxx',function(){})
  }
  this.callHandler = function(func_name,data,callback){
    console.log(func_name,data)
  }
  this.registerHandler = function(){
  },
  this.setTitle = function(){}
  this.checkJsApi = function(){}
  this.getInfo = function(){}
  this.pushWebView = function(){}
  this.newWebView = function(){}
  this.closeWebView = function(){}
  this.setFuncBtns = function(){}
  this.setFuncBtnStatus = function(){}
  this.showTabs = function(){}
  this.hideTabs = function(){}
  this.mailto = function(){}
  this.back = function(){}
  this.AuthCode = function(){
  }
  return this;
}
window.JoywokMobileApp = window.WebViewJavascriptBridge = new initBridge()