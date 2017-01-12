/**
 * Joywok jssdk.js
 */
(function(root, factory) {
  if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = factory(root);
  } else if (typeof define === 'function' && (define.amd || define.cmd)) {
    define([], function(_) {
      return (root.jw = factory(root));
    });
  } else {
    root.jw = factory(root);
  }
}(this, function(root) {

  var jwParams = defaultParams = {
    debug: false,   // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appid: '',      // 必填，公众号的唯一标识
    timestamp: 0,   // 必填，生成签名的时间戳(10位)
    nonceStr: '',   // 必填，生成签名的随机串
    signature: '',  // 必填，签名，见附录1
    jsApiList: [],   // 必填，需要使用的JS接口列表，所有JS接口列表见附录2,
    corpid:'',//企业ID,
    code:'', //免登录获取的Token
    // agentid:''
  };
  var a = navigator.userAgent;
  var Bridge;
  function JWBridge( func_name, data, origindata ){
    if(/iPhone|iPad|iPod/i.test(a)){
      // alert(func_name+'开始调用')
      Bridge?Bridge.callHandler(func_name,combineData(data),function(resp){
         jw.callback( func_name, resp, origindata );
      }):innerInvoke( func_name, origindata ) ;
    }else{
      root.JoywokMobileApp ? JoywokMobileApp.callHandler(
          func_name
          , combineData(data)
          , function(resp) {
            jw.callback( func_name, resp, origindata );
          }
      ) : innerInvoke( func_name, origindata ) ;
    }
  }
  /**
   * func_name 方法名
   * resp 返回报文
   * cb 回调函数
   * status: {"checkResult":{"setTitle":true},"status":"checkJsApi:ok"}
   */
  function callback( func_name, resp, cb ){
    // alert('callback['+func_name+']['+typeof resp+']['+JSON.stringify(resp)+']');
    // alert(resp);
    if( typeof resp === 'string' ) resp = JSON.parse(resp);
    var d,e,f;
    switch(
      delete resp.err_code,
      delete resp.err_desc,
      delete resp.err_detail,
      d = resp.errMsg,
      // alert(d),
      // d||(d=resp.err_msg,delete resp.err_msg,d=h(a,d),resp.errMsg=d),
      cb = cb||{},
      cb._complete && (cb._complete(resp), delete cb._complete),
      d = resp.errMsg||"",
      jw.config.debug && !cb.isInnerInvoke && alert(JSON.stringify(resp)),
      e = d.indexOf(":"),
      f = d.substring(e+1)){
      case"ok":
        cb.success && cb.success( resp );
        break;
      case "cancel":
        cb.cancel && cb.cancel( resp );
        break;
      default:
        cb.fail && cb.fail( resp )
    }
    cb.complete && cb.complete(resp)
  }

  function innerInvoke( func_name, data ){
    console.log('innerInvoke', func_name, data, jw.config);
    if(!(!jw.config.debug||data&&data.isInnerInvoke)){
      var c = route_list[func_name];
      c&&(func_name=c),data&&data._complete&&delete data._complete,console.log('"'+func_name+'",',data||"");
    }
  }

  function addDebug( func_name, data ){
    console.log('"'+func_name+'",',data||"")
  }

  function combineData( data ){
    // 如果是数组，则直接传入数据
    // if( Object.prototype.toString.call( data ) === '[object Array]' ) return data;
    // 
    data = data||{};
    data.appId = jwParams.appid;
    data.verifyAppId = jwParams.appid;
    data.verifySignType = "sha1";
    data.verifyTimestamp = jwParams.timestamp+"";
    data.verifyNonceStr = jwParams.nonceStr;
    data.verifySignature = jwParams.signature;
    data.verifyCorpid = jwParams.corpid;
    if((jwParams.code && jwParams.code.length!=0 )){
      data.code = jwParams.code  
    }
    return data;
    // return data = data||{},
    //   data.appId = jwParams.appid,
    //   data.verifyAppId = jwParams.appid,
    //   data.verifySignType = "sha1",
    //   data.verifyTimestamp = jwParams.timestamp+"",
    //   data.verifyNonceStr = jwParams.nonceStr,
    //   data.verifySignature = jwParams.signature,
    //   data.verifyCorpid = jwParams.corpid,
    //   // data.verifyAgentid = jwParams.agentid,
    //   data;
      // JSON.stringify(data);
  }

  var func_list, route_list;
  func_list = {
    config: 'config',
    setTitle: 'setTitle',
    onMenuShareTimeline:"menu:share:timeline",
    onMenuShareWechat:"menu:share:wechat"
  };

  route_list = function(){
    var key, routes = {};
    for(key in func_list)
      routes[func_list[key]]=key;
    return routes;
  }();

  var jw = jw || {
    callback: callback,
    connectJoywokMobileApp: function( callback ){
      if (window.JoywokMobileApp) {
        callback(JoywokMobileApp)
      } else {
        // 全局注册方法 JoywokMobileAppReady
        document.addEventListener(
          'JoywokMobileAppReady'
          , function() {
            callback(JoywokMobileApp)
          },
          false
        );
      }
    },
    config: function( params ){
      var newObj = defaultParams;
      for(var i in params){
        newObj[i] = params[i];
      }
      jwParams = jw.configs =  newObj;
      var a = navigator.userAgent;
      var self = this;
      if(/iPhone|iPad|iPod/i.test(a)){
        function setupWebViewJavascriptBridge(callback) {
          if (window.WebViewJavascriptBridge){ 
            return callback(WebViewJavascriptBridge); 
          }
          if (window.WVJBCallbacks){
           return window.WVJBCallbacks.push(callback); 
          }
          window.WVJBCallbacks = [callback];
          var WVJBIframe = document.createElement('iframe');
          WVJBIframe.style.display = 'none';
          WVJBIframe.src = 'https://__bridge_loaded__';
          document.documentElement.appendChild(WVJBIframe);
          setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
        }
        setupWebViewJavascriptBridge(function(bridge) {
          // alert('ios初始化完了么')
          Bridge = bridge
          jw.ready && jw.ready();
          self.listen(bridge)
        })
      }else{
        jw.connectJoywokMobileApp(function(bridge) {
          // alert('config 2')
          bridge.init(function(message, responseCallback) {
            // alert('message,zhailei')
            var data = {
              'Javascript Responds': '测试中文!'
            };
            jw.ready && jw.ready(data);
            Bridge = bridge;
            self.listen(bridge)
            responseCallback(data);
          });
          // 注册 ready/error等一些函数
          /*bridge.registerHandler("functionInJs", function(data, responseCallback) {
            document.getElementById("show").innerHTML = ("data from Java: = " + data);
            var responseData = "Javascript Says Right back aka!";
            responseCallback(responseData);
          });*/
        });
      }
    },
    listen:function(bridge){
      bridge.registerHandler("onFilter", function(data, responseCallback) {
        if( typeof window.onFilter == 'function' ) window.onFilter(data);
      });
      bridge.registerHandler("onSelectTab", function(data, responseCallback) {
        if( typeof window.onJwSelectTab == 'function' ) window.onJwSelectTab(data);
      });
      bridge.registerHandler("onShowAppMore", function(data, responseCallback) {
        if( typeof window.onShowAppMore == 'function' ) window.onShowAppMore(data);
      });
      // 用户点击右上角功能按钮
      bridge.registerHandler("onNavBtnClick", function(data, responseCallback) {
        if( typeof window.onJwNavBtnClick == 'function' ) window.onJwNavBtnClick(data);
      });
    },
    setTitle: function(origindata ){
      var data = {title: origindata.title};
      JWBridge( 'setTitle', data, origindata );
    },
    checkJsApi: function( origindata ){
      JWBridge( 'checkJsApi', { "jsApiList": origindata.jsApiList }, origindata );
    },
    getInfo: function( origindata ){
      JWBridge( 'getInfo', {}, origindata );
    },
    pushWebView: function( origindata ){
      var data = {url: origindata };
      JWBridge( 'pushWebView', data, origindata );
    },
    newWebView: function( origindata ){
      var data = {url: origindata };
      JWBridge( 'newWebView', data, origindata );
    },
    closeWebView: function( origindata ){
      JWBridge( 'closeWebView', {}, origindata );
    },
    // type: 0:filter; 1: 系统More按钮; 2: 应用More按钮;
    setFuncBtns: function( origindata ){
      /*var data = {type: origindata.type };
      origindata.text && (data.text = origindata.text);
      origindata.logo && (data.logo = origindata.logo);*/
      var data = {buttons: origindata};
      JWBridge( 'setFuncBtns', data, origindata );
    },
    setFuncBtnStatus: function( origindata ){
      var data = origindata;
      JWBridge( 'setFuncBtnStatus', data, origindata );
    },
    showTabs: function( origindata){
      var data = {tabs: origindata.tabs, selector: origindata.selector, style: origindata.style, style: origindata.style };
      JWBridge( 'showTabs', data, origindata );
    },
    hideTabs: function(origindata){
      JWBridge( 'hideTabs', {}, origindata );
    },
    mailto: function( origindata ){
      var data = {email: origindata.email };
      JWBridge( 'mailto', data, origindata );
    },
    back: function( origindata ){
      JWBridge( 'back', {}, origindata );
    },
    onSelectTab: function( index ){
      // alert('onSelectTab ['+index+']');
      if( typeof window.onJwSelectTab == 'function' ) window.onJwSelectTab(data);
    },
    onNavBtnClick: function( data ){
      if( typeof window.onJwNavBtnClick == 'function' ) window.onJwNavBtnClick(data);
    },
    getAuthCode:function(data,origindata){
      JWBridge('AuthCode',data,origindata);
    },
    onAuthCode: function( data ){
      if( typeof window.onJwAuthCode == 'function' ) window.onJwAuthCode(data);
    },
    getLocation:function(data,origindata){
      JWBridge('getLocation',data,origindata);
    },
    openLocation:function(data){
      JWBridge('openLocation',data);
    },
    previewImages:function(data){
      JWBridge('previewImages',data);
    },
    choseFile:function(data,origindata){
      JWBridge('choseFile',data,origindata);
    },
    uploadFile:function(data,origindata){
      JWBridge('uploadFile',data,origindata);
    },
    downloadFile:function(data,origindata){
      JWBridge('downloadFile',data,origindata);
    },
    scanQRCode:function(data,origindata){
      JWBridge('scanQRCode',data,origindata);
    },
    openImages:function(origindata){
      // {
      //  id:''图片的Id，需要改造
      // }
      JWBridge('OpenImages',{},origindata);
    }
    /*,
    onFilter: function(){
      alert('onFilter')
    },
    onAdd:function(){
      alert('onAdd')
    },
    onSchedule: function(){
      alert('onSchedule');
    }*/
  };

  return jw;
}));
