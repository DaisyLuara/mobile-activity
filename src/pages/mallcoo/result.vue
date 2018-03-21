<template>
	<div class="mallcoo-content" >
		<div class="quan-img" @click="">
			{{ quanMsg }}
			<img :src="imgUrl" alt=""/>
		</div>
		<div class="mallMsg">{{mallMsg}}</div>
		<div class="userMsg">{{userMsg}}</div>
		<wx-share :WxShareInfo="wxShareInfo"></wx-share>
	</div>
</template>
<script>
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
			imgUrl:null,
			userMsg:'',
			mallMsg:'',
			quanMsg:'',
			user_open_id:null,
			//授权链接
			authorize_url:'https://m.mallcoo.cn/a/open/User/V2/OAuth/BaseInfo/?AppID=5aa65a593ae74e0fd06d1b64&PublicKey=q4Cfej&CallbackUrl=http%3A%2F%2Fsapi.newgls.cn%2Fapi%2Fs%2FR6q',
			url:'',
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
		window.location.href=ecodeURIComponent(this.authorize_url)+window.location.href;

	},
	mounted(){
		$('.mallcoo-content').css('min-height',$(window).height());
		console.log(decodeURIComponent(this.authorize_url))
	},
	methods:{
		//授权跳转
		getAuthorize(){
			
			
		},
		//获取券信息
		getQuanMsg(){

		},
		//获取用户信息
		getUserInfo(){

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
		font-size: 0;

		.quan-img{
			width:90%;
			margin:0 auto;
			text-align:center;
			border:solid 1px red;
			min-height:200px;
			img{
				width:100%;
				height:auto;
			}
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