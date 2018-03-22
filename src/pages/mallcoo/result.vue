<template>
	<div class="mallcoo-content" >
		<div class="quanMsg" @click="getCoupon" >
			点击领取：
			<ul v-for="item in quanMsg">
				<li>{{ item }}</li>
			</ul>
		</div>
		<wx-share :WxShareInfo="wxShareInfo"></wx-share>
	</div>
</template>
<script>
const REQ_URL = 'http://120.27.144.62:1337/parse/classes/';
import marketService from 'services/marketing';
import WxShare from 'modules/wxShare';
import wxService from 'services/wx';
import parseService from 'modules/parseServer';
import { customTrack } from 'modules/customTrack';

export default {
	components: {
		WxShare,
	},
	data(){
		return {
			userMsg:'',
			mallMsg:'',
			quanMsg:{
				CouponDesc:null,
				CouponName:null,
				CouponRuleNo:null,
				MallID:null,
				MallName:null,
			},
			pic_mid:null,
			user_open_id:null,
			coupon_num:0,
			//授权链接
			authorize_url:'http://sapi.newgls.cn/api/mallcoo/user/oauth?redirect_url=',
			open_user_id:null,
			coupon_url:'http://sapi.newgls.cn/api/mallcoo/coupon',
			//微信分享信息
			wxShareInfoValue: {
				title:'马里奥2.0',
				desc:'猫酷平台获取券',
				imgUrl:'',
			},
			originUrl:null,
		};
	},
	beforeCreate(){
		document.title = '马里奥2.0';
	},
	created(){
		if(this.$route.query.open_user_id){
			this.open_user_id=this.$route.query.open_user_id;
			this.isFirstComeIn();
			//this.getQuanMsg();

		}else{
			this.getAuthorize();
		}
	},
	mounted(){
		$('.mallcoo-content').css('min-height',$(window).height());
		
	},
	methods:{
		//授权跳转
		getAuthorize(){
			let pageUrl=encodeURIComponent(window.location.href);
			this.$http.get(this.authorize_url + pageUrl).then(result => {
				let data=result.data;
				window.location.href=data;
				return;
			})
		},
		//获取券信息
		getQuanMsg(){
			this.$http.get(this.coupon_url).then((res) => {
				//success
				let data=res.data;
				let list=data.data;
				this.quanMsg.CouponDesc  =list[this.coupon_num].CouponDesc;
				this.quanMsg.CouponName  =list[this.coupon_num].CouponName;
				this.quanMsg.CouponRuleNo=list[this.coupon_num].CouponRuleNo;
				this.quanMsg.MallID      =list[this.coupon_num].MallID;
				this.quanMsg.MallName    =list[this.coupon_num].MallName;
				this.pic_mid             =list[this.coupon_num].PICMID;
				console.log(res);
				//console.log(res.data.message)
			},(res) =>{
				//err
			})
		},
		//发券，用户获取券
		getCoupon(){
			this.$http.post(this.coupon_url,{
				'open_user_id':this.open_user_id,
				'pic_mid':this.pic_mid
			}).then((res) => {
				//success
				let data=res.data;
				console.log(res);
				
			},(res) => {
				//err
				
			})
		},
		//存储open_user_id到parseServer,判断用户是否是新用户
		isFirstComeIn(){
			let query={
				open_user_id:this.open_user_id
			}
			parseService.get(this,REQ_URL+'maliao_mall?where=' + JSON.stringify(query)).then(data => {
				console.log(data)

			})
		},
		//跳转操作
		linkToPath(result_url){
			this.$router.push({
				path:result_url,
			})
		},
		saveUserOpenId(){
			
		},

	},
	computed: {
		wxShareInfo() {
			let wxShareInfo = {
				title: this.wxShareInfoValue.title,
				desc: this.wxShareInfoValue.desc,
				imgUrl: this.wxShareInfoValue.imgUrl,
				success: () => {
					customTrack.shareWeChat();
				},
			};
			return wxShareInfo;
		},
	},

};
</script>
<style  lang="less" scoped>
	.mallcoo-content{
		width:100%;
		height:100%;
		overflow: hidden;
		text-align:center;
		font-size: 16px;

		.quanMsg{
			width:90%;
			margin:15px auto;
			text-align:center;
			border:solid 1px red;
			letter-spacing: 2px;
			font-weight:600;
			font-size: 20px;
			line-height: 40px;
			padding:10px;
		}
		.mallMsg{
			font-size: 20px;
			color:red;
			line-height: 30px;
		}
		.userMsg{
			font-size: 24px;
			color:#666;
			line-height: 30px;
		}
	}
</style>