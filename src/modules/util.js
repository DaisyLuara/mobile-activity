export { getParamsMap , getParameter , setParameter , Cookies} ;

function getParamsMap(url) {
  if (!url) {
    url = location.href;
  }
  let params = {},
    param_start = url.indexOf('?');

  if (param_start > 0) {
    let search = url.substr(param_start + 1);

    let params_array = search.split('&');
    if (params_array.length > 0) {
      for (let i = 0, l = params_array.length; i < l; i++) {
        let param = params_array[i];
        if (typeof param === "string" && param !== '') {
          let parts = param.split('=');
          if (parts.length > 0) {
            params[parts[0]] = parts[1];
          }
        }
      }
    }
  }
  return params;
}

function getParameter(key, url) {
  if (!key) {
    return url;
  }

  if (!url) {
    url = location.href;
  }

  let params = getParamsMap(url);

  return params[key];

}

function setParameter(key, value, url) {
  if (!key) {
    return url;
  }

  if (!url) {
    url = location.href;
  }

  let result = url,
    params;

  let param_start = url.indexOf('?');
  if (param_start > 0) {
    params = getParamsMap(url);
    result = url.substr(0, param_start);
  } else {
    params = {};
  }

  params[key] = value;

  result = getUrl(result, params);

  return result;
}

function getUrl(base_url, params) {
  let result = base_url,
    query_array = [];

  for (let key in params) {
    query_array.push(key + "=" + params[key]);
  }

  if (query_array.length > 0) {
    result = result + "?" + query_array.join('&');
  }

  return result;
}

export function is_weixin(){
  return (/micromessenger/i).test(navigator.userAgent);
}

const Cookies = {
  get: function (sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  set: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};
