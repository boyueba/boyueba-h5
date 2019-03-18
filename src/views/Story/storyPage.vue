<template>
  <div class="story-page">
    <div class="app-wrapper" @click="handlePage">
      <div class="app-scroll">
        <article>
          <p class="story-title">{{novelTitle}}</p>
          <p v-html="novelContent"></p>
          <div class="btn-footer" flex="box:last">
            <mt-button>
              <i class="iconfont iconprevious"></i>
              上一章
            </mt-button>
            <mt-button class="mlr-md">
              <i class="iconfont iconmulu"></i>
              目录
            </mt-button>
            <mt-button type="primary" class="btn-next">
              <i class="iconfont iconnext"></i>
              <span>下一章</span>
            </mt-button>
          </div>
        </article>
      </div>
    </div>
    <div class="setting-page" v-show="setting" @click="setting = false">
      <div class="setting-header" flex="main:justify">
        <div class="header-btn" flex="main:center cross:center"
             @click.prevent="$router.back()">
          <i class="iconfont iconback"></i>
          <span>返回</span>
        </div>
        <div class="header-btn" flex="main:center cross:center">
          <i class="iconfont iconmy"></i>
        </div>
      </div>
      <div class="setting-section" flex="dir:top main:center cross:center">
        <i class="iconfont iconmulu1"></i>
        <span>目录</span>
      </div>
      <div class="setting-footer">
        <ul flex="box:mean">
          <li flex="dir:top cross:center main:center"
              v-for="(item, index) in settingFooter" :key="index">
            <i :class="`iconfont ${item.icon}`"></i>
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
	export default {
		name: 'story-storyPage',
    data() {
			return {
        novelContent: '',
        novelTitle: '',
				setting: false,
        settingFooter: [
          {
          	name: '上一章',
            icon: 'iconprevious'
          },
	        {
		        name: '字体',
		        icon: 'iconfont-size'
	        },
	        {
		        name: '夜间',
		        icon: 'iconyejianmoshi'
	        },
	        {
		        name: '背景',
		        icon: 'iconbeijingtupian'
	        },
	        {
		        name: '下一章',
		        icon: 'iconnext'
	        }
        ]
      }
    },
		computed: mapState(['novelId']),
    created: function () {
			// this.initSection();
      this.initData();
    },
    methods: {
	    async initData() {
				const {novelId, sectionId} = this.$route.query;
				if(!this.novelId) await this.$store.dispatch('initNovel', {novelId})
        this.initContent(sectionId);
			},
      initContent(sectionId) {
	      this.$store.dispatch('getContent', {sectionId}).then(res => {
          const {title, content} = res;
		      this.novelContent = content;
		      this.novelTitle = title;
	      })
      },
      // 全屏点击
	    handlePage(e) {
	    	const windowHeight = window.innerHeight;
	    	const positionY = e.y;
	    	const rangeUp = windowHeight * 0.3;
	    	const rangeBottom = windowHeight * 0.7;
	    	if(positionY < rangeUp){
			    // 触发屏幕上
			    console.log('上')
        } else if(positionY > rangeBottom) {
          // 触发屏幕下
			    console.log('下')
        } else {
			    // 触发屏幕中间
			    console.log('中间')
          this.setting = true;
        }
      }
    }
	}
</script>
<style lang="scss" scoped>
  .story-page{
    position: relative;
    font-size: 0.4rem;
    width: 100%;
    height: 100%;
    color: #2e343f;
    line-height: 1.6;
    box-sizing: border-box;
    background: url("../../assets/images/bg_ypz.png");
    .story-title{
      font-weight: bold;
      text-align: center;
      padding: 0.2rem 0;
    }
    article{
      padding: 0 0.3rem;
    }
    .btn-footer{
      padding: 0.1rem 0 1.2rem;
    }
    .btn-next{
      width: 2.5rem;
    }
    .setting-page{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 2;
      color: #fff;
      font-size: 0.28rem;
      .setting-header{
        left: 0;
        right: 0;
        height: 1rem;
        position: absolute;
        background: #333;
      }
      .setting-section{
        top: 50%;
        left: 0;
        width: 0.8rem;
        height: 1.2rem;
        margin-top: -0.6rem;
        position: absolute;
        border-top-right-radius: 0.2rem;
        border-bottom-right-radius: 0.2rem;
        -webkit-box-shadow: 0 0 1px #000;
        background-color: rgba(51, 51, 51, 0.8);
      }
      .header-btn{
        width: 1.2rem;
      }
      .setting-footer{
        height: 1rem;
        line-height: 0.28rem;
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
        background: #333;
        ul{
          height: 100%;
        }
      }
    }
  }
</style>