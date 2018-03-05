
(function() {
  
  var routerName = window.location.hash.split('/')[2];
  if(routerName === 'spm'){
    var metaTag=document.createElement('meta');
    metaTag.name = "viewport"
    metaTag.content = "width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=0.5, minimum-scale=0.5"
    document.getElementsByTagName('head')[0].appendChild(metaTag);
  }
}());