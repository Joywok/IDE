/**
 * Joywok jssdk.js
 */
(function(root, factory) {
  if (typeof module !== 'undefined' && typeof exports === 'object') {
    var _ = require('underscore');
    var $ = require('jQuery');
    module.exports = factory(root, $, _);
  } else if (typeof define === 'function' && (define.amd || define.cmd)) {
    define(['underscore','jQuery'], function(_) {
      return (root.jw = factory(root, $, _));
    });
  } else {
    root.jw = factory(root, root.jQuery, root._ );
  }
}(this, function(root, $, _ ) {
  var jwParams = defaultParams = {
    debug: false,   // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appid: '',      // 必填，公众号的唯一标识
    timestamp: 0,   // 必填，生成签名的时间戳
    nonceStr: '',   // 必填，生成签名的随机串
    signature: '',  // 必填，签名，见附录1
    jsApiList: [],   // 必填，需要使用的JS接口列表，所有JS接口列表见附录2,
    url:'',
    corpid:''
  };

  function JWBridge( func_name, data, origindata ){
    root.JoywokMobileApp ? JoywokMobileApp.callHandler(
        func_name
        , combineData(data)
        , function(resp) {
          jw.callback( func_name, resp, origindata );
        }
    ) : innerInvoke( func_name, origindata ) ;
  }

  /**
   * func_name 方法名
   * resp 返回报文
   * cb 回调函数
   * status: {"checkResult":{"setTitle":true},"status":"checkJsApi:ok"}
   */
  function callback( func_name, resp, cb ){
    // alert('callback['+func_name+']['+typeof resp+']['+JSON.stringify(resp)+']');
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
    return data = data||{},
      data.appId = jwParams.appid,
      data.verifyAppId = jwParams.appid,
      data.verifySignType = "sha1",
      data.verifyTimestamp = jwParams.timestamp+"",
      data.verifyNonceStr = jwParams.nonceStr,
      data.verifySignature = jwParams.signature,
      data;
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
      jwParams = jw.configs = _.extend( defaultParams, params );
      // alert('config 1')
      jw.connectJoywokMobileApp(function(bridge) {
        // alert('config 2')
        bridge.init(function(message, responseCallback) {
          /*console.log('JS got a message', message);
          setTimeout(function(){
            alert(message);
          },1000)*/
          var data = {
            'Javascript Responds': '测试中文!'
          };
          responseCallback(data);
        });
        // 注册 ready/error等一些函数
        /*bridge.registerHandler("functionInJs", function(data, responseCallback) {
          document.getElementById("show").innerHTML = ("data from Java: = " + data);
          var responseData = "Javascript Says Right back aka!";
          responseCallback(responseData);
        });*/
        bridge.registerHandler("onFilter", function(data, responseCallback) {
          alert('onFilter');
        });
        bridge.registerHandler("onSelectTab", function(data, responseCallback) {
          if( typeof onJwSelectTab == 'function' ) onJwSelectTab(data);
        });
        bridge.registerHandler("onShowAppMore", function(data, responseCallback) {
          alert('onShowAppMore');
        });
        // 用户点击右上角功能按钮
        bridge.registerHandler("onNavBtnClick", function(data, responseCallback) {
          // alert('onNavBtnClick');
          if( typeof onJwNavBtnClick == 'function' ) onJwNavBtnClick(data);
        });
      });
    },
    setTitle: function( origindata ){
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
    getAuthCode:function(origindata){
      JWBridge('AuthCode',{},origindata);
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