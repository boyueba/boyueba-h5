<template>
  <div class="story-page">
    <div class="app-wrapper" @click="handlePage">
      <div class="app-scroll" ref="appScroll">
        <article v-show="info.content">
          <p class="story-title">{{info.title}}</p>
          <p v-html="info.content"></p>
          <div class="btn-footer" flex="box:last">
            <mt-button @click.prevent="upPage">
              <i class="iconfont iconprevious"></i>
              上一章
            </mt-button>
            <mt-button class="mlr-md">
              <i class="iconfont iconmulu"></i>
              目录
            </mt-button>
            <mt-button type="primary" class="btn-next" @click.prevent="nextPage">
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
             @click.stop="$router.go(count)">
          <i class="iconfont iconback"></i>
          <span>返回</span>
        </div>
        <div class="header-btn" flex="main:center cross:center">
          <i class="iconfont iconmy"></i>
        </div>
      </div>
      <div class="setting-section" flex="dir:top main:center cross:center"
           @click.stop.prevent="handleCatalog">
        <i class="iconfont iconmulu1"></i>
        <span>目录</span>
      </div>
      <div class="setting-footer">
        <ul flex="box:mean">
          <li flex="dir:top cross:center main:center"
              v-for="(item, index) in settingFooter" :key="index"
              @click.stop.prevent="handleFooterBar(index)">
            <i :class="`iconfont ${item.icon}`"></i>
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="page-type" v-if="showPage">
      <ul v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="80">
        <li v-for="item in list" class="page-type-li"
            @click="handleSinglePage(item)">{{ item.sectionTitle }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
	export default {
		name: 'story-storyPage',
		data() {
			return {
				showPage: false,
				info: {},
				sectionInfo: [],
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
				],
				loading: false,
				list: [],
        sectionParams: {
	        novelId: this.$route.query.novelId,
	        pageNum: 0,
	        pageSize: 20
        },
        count: -1
			}
		},
		watch: {
			$route() {
				this.showPage = false;
				console.log(--this.count)
				this.setting = false;
				this.initData();
			}
		},
		created: function () {
			this.initData();
		},
		methods: {
			// 初始化页面
			initData() {
				this.initContent();
			},
			// 获取正文及其它信息
			initContent() {
				this.$store.dispatch('getContent', this.$route.query).then(res => {
					const {content, sectionInfo} = res;
					content.title = sectionInfo[1].sectionTitle;
					this.info = content;
					this.sectionInfo = sectionInfo;
					const appScroll = this.$refs.appScroll;
					if (appScroll.scrollTop !== 0) {
						appScroll.scrollTop = 0;
					}
				})
			},
			// footer bar 点击信息
			handleFooterBar: function (index) {
				switch (index) {
					case 0:
						this.upPage();
						break;
					case 4:
						this.nextPage();
						break;
				}
			},
			// 上一章
			upPage: function () {
				const con = this.sectionInfo[0];
				if (con.sort !== 0) {
					const obj = {
						novelId: this.$route.query.novelId,
						sectionId: con.sectionId,
						sort: con.sort
					};
					this.$router.push(`/story-page?${this.$utils.changeObjToStr(obj)}`)
				} else {
					this.$toast("没有上一章")
				}
			},
			// 下一章
			nextPage: function () {
				const con = this.sectionInfo[2];
				if (con.sort !== 0) {
					const obj = {
						novelId: this.$route.query.novelId,
						sectionId: con.sectionId,
						sort: con.sort
					};
					this.$router.push(`/story-page?${this.$utils.changeObjToStr(obj)}`)
				} else {
					this.$toast("没有下一章")
				}
			},
			// 全屏点击
			handlePage(e) {
				const windowHeight = window.innerHeight;
				const positionY = e.y;
				const rangeUp = windowHeight * 0.3;
				const rangeBottom = windowHeight * 0.7;
				if (positionY < rangeUp) {
					// 触发屏幕上
					console.log('上')
				} else if (positionY > rangeBottom) {
					// 触发屏幕下
					console.log('下')
				} else {
					// 触发屏幕中间
					console.log('中间')
					this.setting = true;
				}
			},
			// 显示目录
			handleCatalog() {
				this.showPage = true;
			},
			// 分页切换
			loadMore() {
				this.loading = true;
				this.sectionParams.pageNum += 1;
				const parmas = this.sectionParams;
				this.$store.dispatch('getForm', {
					url: this.$api.novelSection,
          data: parmas
        }).then(res => {
					const {list} = res;
					console.log(res, 'novelSection')
          const arr = this.list.concat(list);
          this.list = arr
					this.loading = false;
				})
			},
      // 分页跳转单个页面
      handleSinglePage(item) {
	      this.$router.push(`/story-page?novelId=${this.$route.query.novelId}&sectionId=${item.sectionId}&sort=${item.sort}`)
      }
		}
	}
</script>
<style lang="scss" scoped>
  .story-page {
    position: relative;
    font-size: 0.4rem;
    width: 100%;
    height: 100%;
    color: #2e343f;
    line-height: 1.6;
    box-sizing: border-box;
    background: url("../../assets/images/bg_ypz.png");
    .story-title {
      font-weight: bold;
      text-align: center;
      padding: 0.2rem 0;
    }
    article {
      padding: 0 0.3rem;
    }
    .btn-footer {
      padding: 0.1rem 0 1.2rem;
    }
    .btn-next {
      width: 2.5rem;
    }
    .setting-page {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 2;
      color: #fff;
      font-size: 0.28rem;
      .setting-header {
        left: 0;
        right: 0;
        height: 1rem;
        position: absolute;
        background: #333;
      }
      .setting-section {
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
      .header-btn {
        width: 1.2rem;
      }
      .setting-footer {
        height: 1rem;
        line-height: 0.28rem;
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
        background: #333;
        ul {
          height: 100%;
        }
      }
    }
    .page-type {
      position: absolute;
      z-index: 3;
      bottom: -1px;
      left: 0;
      right: 0;
      top: 1rem;
      background-color: #FFFFFF;
      overflow-y: auto;
      .page-type-li{
        line-height: 1rem;
        padding: 0 0.3rem;
      }
    }
  }
</style>