<template>
  <div class="app-page" flex="dir:top box:first">
    <header>
      <div class="story-header" flex="main:center">
        <div class="story-bar" flex="box:mean cross:center main:center">
          <div :class="{active: index === sexIndex}"
               v-for="(item, index) in sexList" :key="index"
               @click="handleSex(index)">{{item.name}}</div>
        </div>
      </div>
      <article v-if="typeVisible" @click="handleType()">
        <div class="story-type-cover"></div>
        <ul class="story-type">
          <li v-for="(item, index) in typeList" :key="index">{{item.typeText}}</li>
        </ul>
      </article>
    </header>
    <div class="app-container">
      <StoryList></StoryList>
    </div>
  </div>
</template>
<script>
  import StoryList from '../../components/story/storyList.vue'
	export default {
		name: 'story-storyList',
    components: {
	    StoryList
    },
    data() {
			return {
				typeVisible: false,
				sexList: [{name: '男生', channel: 1}, {name: '女生', channel: 2}],
        sexIndex: 0,
        typeList: [],
				storyList: []
      }
    },
    created: function () {
      this.getNovelType(this.sexList[0].channel);
    },
    methods: {
			// 性别类型切换
      handleSex(index) {
      	this.typeList = []; // 处理大分类切换时，有之前的数据影像
        this.sexIndex = index;
        this.getNovelType(this.sexList[index].channel);
	      this.typeVisible = true;
      },
      // 分类选择
	    handleType: function (index) {
		    this.typeVisible = false;
	    },
      // 获取分类
      getNovelType: function (channel) {
	      const params = {
		      channel
	      };
	      this.$store.dispatch('getForm', {
		      url: this.$api.novelType,
		      data: params
	      }).then(res => {
		      this.typeList = res;

	      })
      }
    }
	}
</script>
<style lang="scss" scoped>
  .app-page{
    height: 100%;
    width: 100%;
  }
  .app-container{
    overflow-y: auto;
  }
  .story-header{
    height: 1rem;
    border-bottom: 1px solid #e9e9e9;
    background-color: #ffffff;
    .story-bar{
      width: 2.2rem;
      height: 0.7rem;
      margin: 0.15rem 0;
      border: 1px solid #ed424b;
      color: #ed424b;
      box-sizing: border-box;
      border-radius: 4px;
      text-align: center;
      .active{
        background-color: #ed424b;
        color: #ffffff;
        line-height: 0.7rem;
      }
    }
  }
  .story-type-cover{
    position: fixed;
    top: calc(1rem + 1px);
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .story-type{
    line-height: 0.8rem;
    border-bottom: 1px solid #e9e9e9;
    background-color: #fff;
    position: fixed;
    top: calc(1rem + 1px);
    left: 0;
    right: 0;
    li{
      position: relative;
      display: inline-block;
      width: 20%;
      box-sizing: border-box;
      height: 0.8rem;
      text-align: center;
      border-bottom: 1px solid #e9e9e9;
      bottom: -1px;
      &:not(:nth-child(5n)):after{
        content: '';
        width: 1px;
        height: 0.4rem;
        position: absolute;
        right: 0;
        top: 0.2rem;
        border-right: 1px solid #e9e9e9;
      }
    }
  }

</style>