import $ from 'jquery';
import { getParameter, Cookies } from './util'

global.isPC = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) === true;

global.DOMAIN = process.env.DOMAIN;
global.STORE_API=process.env.STORE_API;
global.SAAS_API = process.env.SAAS_API;

//定义jingfree analyse对象以及方法
(function ($, W) {

  window.jfa = {};
  jfa.create = function () {
    // if(Cookies.get("jf_token")){
    $.post(window.STORE_API + '/rest/tracking/', function (result) {});
    // }
  }

})(jQuery, window);

//定义Marketing对象以及方法
(function ($, W) {
  var JFMarketing = {};

  JFMarketing.init = function () {

    var marketing_id = getParameter("marketing_id") || Cookies.get("jf_marketing_id") || window.MARKETING_ID;
    var share_id = getParameter("share_id");

    if (marketing_id) {
      Cookies.set("jf_marketing_id", marketing_id, {
        expires: 2 * 365,
        domain: window.DOMAIN,
        path: "/"
      });
    }
    if (share_id) {
      Cookies.set("jf_share_id", share_id, {
        expires: 2 * 365,
        domain: window.DOMAIN,
        path: "/"
      });
    }


    //trace_id
    var trace_id = getParameter("trace_id");
    if (trace_id) {
      Cookies.set("trace_id", trace_id, {
        expires: 90,
        domain: window.DOMAIN,
        path: "/"
      });
    }

    //utms
    var utm_props = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]
    var utms = [],
      hasUtm = false
    for (var i = 0, l = utm_props.length; i < l; i++) {
      var _value = getParameter(utm_props[i]) || ""
      utms.push(_value)
      if (_value !== "") {
        hasUtm = true
      }
    }
    if (hasUtm) {
      var utm_str = utms.join('|')
      Cookies.set("jf_utm", utm_str, {
        expires: 90,
        domain: window.DOMAIN,
        path: "/"
      });
    } else if (trace_id){
      Cookies.set("jf_utm", '', {
        expires: 90,
        domain: window.DOMAIN,
        path: "/"
      });
    }

  };

  window.JFMarketing = JFMarketing;

})(jQuery, window);

//初始化jf marketing相关方法
JFMarketing.init();

//创建JingFree跟踪器对象
if (jfa) {
  jfa.create();
}
$(window).on('load',(function () {
  //给GrowingIO增加customer_id
  if (_vds && Cookies && Cookies.get("customer_id")) {
    _vds.push(['setCS1', 'customer_id', Cookies.get("customer_id")]);
  }
}));
