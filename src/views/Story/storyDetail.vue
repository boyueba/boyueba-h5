<template>
  <div>
    <header flex="box:justify">
      <div class="header-icon" flex="cross:center main:center"
           @click="$router.back()">
        <i class="iconfont iconback"></i>
        <span>返回</span>
      </div>
      <span class="title">本书详情</span>
      <div class="header-icon" flex="cross:center main:center">
        <i class="iconfont iconzhuzhuang"></i>
        <span>书架</span>
      </div>
    </header>
    <article>
      <div class="story-item" flex="box:first">
        <img src="https://www.biqugemm.com/files/article/image/2/2131/2131s.jpg" class="item-img" alt="">
        <div class="item-info">
          <p class="info-title">{{storyInfo.novelName}}</p>
          <p class="info-desc">
            <span>作者：</span>
            <span>{{storyInfo.authorName}}</span>
          </p>
          <p class="info-desc">
            <span>分类：</span>
            <span>{{storyInfo.novelType}}</span>
          </p>
          <p class="info-desc">
            <span>状态：</span>
            <span>{{$utils.getConst('storyState', storyInfo.isOver)}}</span>
          </p>
        </div>
      </div>
      <div class="btn-read">
        <mt-button type="danger" @click="btnRead">立即阅读</mt-button>
      </div>
    </article>
  </div>
</template>
<script>
	export default {
		name: 'story-storyDetail',
    data() {
			return {
				storyInfo: {}
      }
    },
    created() {
			this.initData();
    },
    mounted() {
			console.log(this.$route.fullPath)
      sessionStorage.upPageUrl = this.$route.fullPath
    },
    methods: {
			initData: function () {
				const {novelId} = this.$route.params;
				const params = {novelId};
				this.$store.dispatch('getForm', {
					url: this.$api.novelInfo,
					data: params
				}).then(res => {
					console.log('novelInfo', res);
					this.storyInfo = res;
				})
			},
	    btnRead: function () {
				const {novelId, sectionId, sort} = this.storyInfo;
				const obj = {novelId, sectionId, sort};
		    this.$router.push(`/story-page?${this.$utils.changeObjToStr(obj)}`);
	    }
    }
	}
</script>
<style lang="scss" scoped>
  header{
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #333333;
    color: #ffffff;
    .title{
      font-size: 18px;
    }
    .iconfont{
      font-size: 20px;
    }
    .header-icon{
      height: 100%;
      width: 72px;
      font-size: 14px;
    }
  }
  .story-item{
    padding: 0.2rem;
    background-color: #fff;
    .item-img{
      height:100px;
      width: 75px;
    }
    .item-info{
      padding-left: 10px;
      color: #303030;
      line-height: 20px;
    }
    .info-title{
      font-size: 16px;
    }
    .info-desc{
      height: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      span:first-of-type{
        color: #787878;
      }
    }
  }
  .btn-read{
    margin: 0 10px;
    button{
      width: 100%;
    }
  }
</style>