<template>
  <article>
    <div class="story-list">
      <ul class="list">
        <li class="list-item" flex="box:first"
            v-for="(item, index) in storyList" v-bind:key="index"
            @click="$router.push(`/story-detail/${item.novelId}`)">
          <img src="https://www.biqugemm.com/files/article/image/2/2131/2131s.jpg" class="list-item-img" alt="">
          <div class="list-item-info">
            <p class="info-title">{{item.novelName}}</p>
            <p class="info-author">作者: {{item.authorName}}</p>
            <p class="info-desc">{{item.info}}</p>
          </div>
        </li>
      </ul>
    </div>
  </article>
</template>
<script>
	export default {
		name: 'storyList',
    data() {
			return {
				storyList: []
      }
    },
    created() {
			this.initData();
    },
    methods: {
			initData: function () {
				console.log(this)
				const params = {
					pageNum: 1,
					pageSize: 10
				};
				this.$store.dispatch('getForm', {
					url: this.$api.novelList,
					data: params
				}).then(res => {
					console.log(res);
					const {list} = res;
					this.storyList = list;
				})
			}
    }
	}
</script>
<style lang="scss" scoped>
  .story-list{
    padding: 0.2rem 0.3rem;
    .list-item{
      border-radius: 4px;
      box-shadow: 0px 0px 8px 0px #d4d4d4;
      padding: 0.2rem;
      .list-item-img{
        height: 2rem;
        width: 1.5rem;
      }
      .list-item-info{
        padding-left: 0.2rem;
        color: #7f9ba8;
        line-height: 0.4rem;
      }
      .info-title{
        font-size: 0.32rem;
        color: #375868;
      }
      .info-desc{
        height: 1.2rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }
  }
</style>