/**
 * 初始对象
 */
var count=2;
var jsonPath='./static/live2d3.0/file/H5test3/export_example_PNG.model3.json';
var Model = function () {
    this.Moc = "Moc";
    this.TEXTURES = "Textures";
    this.PHYSICS = "Physics";
    this.MOTION= "Motion";
};
 /**
  * 初始化页面加载
  * pathing json文件
  */
Model.prototype.loadModel = function (pageSize) {
     
  if(pageSize<4){
    //清除缓存
    //---------------------------------
    PIXI.utils.destroyTextureCache();
    //---------------------------------
    document.getElementById("div1").style.visibility="visible"; 
    count=pageSize;
    //创建PIXI.loader
    var modelLoader = PIXI.loader;
    modelLoader.resources={};
    console.log(modelLoader);
    var acc=this.manageLoader(jsonPath,modelLoader);
    }
    else{
    document.getElementById("div1").style.visibility="hidden"; 
    }
};

/**
 * Model.prototype.loadModelJson
 */
Model.prototype.manageLoader = function (pathing,loader) {
    var thisRef = this;
    //解析json文件
    this.loadModelJson(pathing, function (data) {
        var path = thisRef.getPath(pathing);
        //获取贴图
        var textures = thisRef.getFiles(thisRef.TEXTURES);
        thisRef.manageJson(loader, textures);
        thisRef.init(loader,textures);
     })
}
/**
 * 初始化
 */
Model.prototype.init=function(loader,textures){
    var thisRef=this;
        //moc
        loader.load(function (loader, resources) {
           //---------------------------------
          textures.forEach(element => {
             PIXI.Texture.removeFromCache(resources[element.file].texture)
          });
          // //---------------------------------
            var app = new PIXI.Application(640, 360,{backgroundColor:0x000000,transparent:true,antialias:true,resolution:2});
            console.log(document.getElementById('myCanvas'));
          if(document.getElementById('myCanvas')!=null&&document.getElementById('myCanvas')!=undefined)
          {
            //document.body.removeChild(document.getElementById('myCanvas'));
            document.getElementById('div1').removeChild(document.getElementById('myCanvas'));
          }
            //document.body.appendChild(app.view);
            document.getElementById('div1').appendChild(app.view);
            var moc = LIVE2DCUBISMCORE.Moc.fromArrayBuffer(resources['moc'].data);
            var resourceList=thisRef.manageTexture(resources,textures);
            var model = new LIVE2DCUBISMPIXI.ModelBuilder()
                .setMoc(moc)
                .setTimeScale(1)
                .addTextures(resourceList)
                // .setPhysics3Json(resources['physics'].data)
                .addAnimatorLayer("Motion", LIVE2DCUBISMFRAMEWORK.BuiltinAnimationBlenders.OVERRIDE, 1)
                .build();
            app.stage.addChild(model);
            app.stage.addChild(model.masks);
            var animation = LIVE2DCUBISMFRAMEWORK.Animation.fromMotion3Json(resources['motion'].data);
             model.animator
                .getLayer("Motion")
                .play(animation);
            app.ticker.add(function (deltaTime) {
                model.update(deltaTime);
                model.masks.update(app.renderer);
             });
            //计算页面的大小
            var onResize = function (event) {
                if (event === void 0) { event = null; }
                // var width = 100;
                // var height = 150;
                // app.view.style.width = width + "px";
                // app.view.style.height = height + "px";
                var width = 75;
                var height = 100;
                app.view.style.width = width + "%";
                app.view.style.height = height + "%";
                app.view.id ='myCanvas';
                app.renderer.resize(width, height);
                model.position = new PIXI.Point((width * 0.4), (height * 0.4));
                model.scale = new PIXI.Point((model.position.x * 2), (model.position.x * 2));
                model.masks.resize(app.view.width, app.view.height);
            };
            onResize();
        });


}
/**
 * 贴图处理
 */
Model.prototype.manageTexture=function(resources,datas){
    var resourceList=new Array();
    datas.forEach(element => {
         resourceList.push(resources[element.file].texture);
    });
    return resourceList;
}
/** path json文件路径 callback 回调函数*/
Model.prototype.loadBytes = function (path/*String*/, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", path, true);
    request.responseType = "arraybuffer";
    request.onload = function () {
        switch (request.status) {
            case 200:
                callback(request.response);
                break;
            default:
                console.error("Failed to load (" + request.status + ") : " + path);
                break;
        }
    }
    request.send(null);

}

/**
 * 处理贴图
 */
Model.prototype.manageJson = function (loader, textures) { 
    //获取多层目录
    var path = this.getPath(jsonPath);
    textures.forEach(element => {
        loader.add(element.file, path + element.path);
    });
     //moc
    loader.add(this.Moc.toLowerCase(),path+this.getFiles(this.Moc), { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER });
    //PHYSICS
    //loader.add(this.PHYSICS.toLowerCase(),path+this.getFiles(this.PHYSICS), { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON });
    //motion
    loader.add(this.MOTION.toLowerCase(),path+(this.getFiles(this.MOTION))[this.MOTION+count], { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON })
}

/**json 解析 */
Model.prototype.loadModelJson = function (path, callback) {
    var thisRef = this;
    thisRef.loadBytes(path, function (buf) {
        var str = String.fromCharCode.apply(null, new Uint8Array(buf));
        //Json格式
        thisRef.json = JSON.parse(str);
        callback(thisRef.json);
    });
};

/**获取文件路径 key 属性*/
Model.prototype.getFiles = function (key) {
    console.log(this.json.FileReferences[key]);
    return this.json.FileReferences[key];
};


/**获取贴图路径  n 下标 key 属性*/
Model.prototype.getFile = function (n, key) {
    if (this.json.FileReferences[key] == null || this.json.FileReferences[key][n] == null)
        return null;

    return this.json.FileReferences[key][n];
}


/**获取贴图长度 key属性 */
Model.prototype.getFileLength = function (key) {
    if (this.json.FileReferences[key] == null) return 0;

    return this.json.FileReferences[key].length;
}


/**
 * 获取文件目录
 * @param {文件路径} path 
 */
Model.prototype.getPath = function (path) {
   return path.substring(0, path.lastIndexOf("/") + 1);
}
module.exports=Model;

