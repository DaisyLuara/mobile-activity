<template>
	<div class="mallcoo-content">
		<div class="quan-img" @click="">
			{{ quanMsg }}
			<img :src="imgUrl" alt=""/>
			}
		</div>
		<div class="mallMsg">{{mallMsg}}</div>
		<div class="userMsg">{{userMsg}}</div>
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
			//微信分享信息
			wxShareInfoValue: {
				title:'马里奥2.0',
				desc:'猫酷平台获取券',
				imgUrl:''
			},
		};
	},
	beforeCreate(){
		document.title = '马里奥2.0';
	},
	created(){

	},
	mounted(){
		$('.mallcoo-content').css('min-height',$(window).height());
	},
	methods:{
		//获取券信息
		getQuanMsg(){

		},
		//获取用户信息
		getUserInfo(){

		},
		//跳转操作
		linkToMall(result_url){
			this.router.push({
				path:result_url,
			})
		},
		saveUserOpenId(){
			if()
		}

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
		}
	}
</style>