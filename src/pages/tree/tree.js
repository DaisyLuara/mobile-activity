
// 从后台接口获取数据
//公用方法，获取URL里面的参数
function getUrl(parameter){
    var search=location.search.substr(1),
        incision=search.split("&");
    for(var i=0;i<incision.length;i++){
        var equal=incision[i].split("=");
        if(parameter==equal[0]){
            return equal[1]
        }
    }       
};
num="1"
        switch(num){
                case '1':
                    this.ashow=true;
                    this.bshow=false;
                    this.locked1=false;
                    break;
                case '2':
                    this.ashow=false;
                    this.bshow=true;
                    this.locked1=false;
                    this.locked2=false;
                    break;
                case '3':
                    this.ashow=false;
                    this.bshow=false;
                    this.locked1=false;
                    this.locked2=false;
                    this.locked3=false;
                    this.locked4=false;
                    this.giftUrl=this.placeUrl[position];
                    this.tagshow=true;
                    break;
            }
/*$.ajax({
    url:"http://exelook.com/client/goodsxsd/?id="+getUrl("id")+"&mobile="+getUrl("mobile")+"&api=json",
    dataType:'json',
    success:function(msg){
        if(msg.state==1){
            num=msg.results.parms.split("&")[0].split("=")[-1];
            position=msg.results.parms.split("&")[-1].split("=")[-1];
            console.log(msg.results);
            // switch(num){
            //     case '1':
            //         $("#tip1").show();
            //         $("#tip2").hide();
            //     break;
            //     case '2':
            //         $("#tip1").hide();
            //         $("#tip2").show();
            //         $("#step2").parent().removeClass("locked");
            //     break;
            //     case '3':
            //         $("#tip1").hide();
            //         $("#tip2").hide();
            //         $("#step2").parent().removeClass("locked");
            //         $("#step3").parent().removeClass("locked");
            //         $(".agift").removeClass("locked").attr("href",placeUrl.position);
            //         $(".tag").show();
            //     break;
            // }
            
        }else{
            alert("网络错误，请稍后重试");
        }
    },
    error:function(){
        alert("网络错误，请稍后重试");
    }
});
//canvas
// var width=$("#treeDiv").width();
// var height=$("#treeDiv").height();
// var winWidth=$(window).width();
// var winHeight=$(window).height();
// $(window).resize(function(){
// 	width=$("#treeDiv").width();
// 	height=$("#treeDiv").height();
//     winWidth=$(window).width();
//     winHeight=$(window).height();
// });
*/
function init() {
    var renderer = new PIXI.CanvasRenderer(this.width, this.height);
    document.getElementById("treeDiv").appendChild(renderer.view);
    var stage = new PIXI.Container();
     PIXI.loader.add('spineCharacter', 'http://p22vy0aug.bkt.clouddn.com/spine/greenlife/treeH5.json')
                .load(function (loader, resources) {
                    var animation = new PIXI.spine.Spine(resources.spineCharacter.spineData);
                    stage.addChild(animation);
                    animation.state.addAnimationByName(0, num, true, 0);

                    animation.x = this.width/2+5;
                    animation.y = this.height*7/8;
                    animation.scale.x = this.winWidth*0.9/750;
                    animation.scale.y = this.winWidth*0.9/750;
                    animate();

                    function animate() {
                        requestAnimationFrame(animate);
                        renderer.render(stage);
                    }
     });

}

init();

