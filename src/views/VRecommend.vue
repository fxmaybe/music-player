<template>
  <div class="recommend" ref="recommend">
    <b-scroll ref="scroll" class="recommend-content" :data="recommendList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
          <b-slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl">
              </a>
            </div>
          </b-slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)" class="item" v-for="(item, index) in recommendList">
              <div class="icon">
                <img width="60" height="60" :src="item.imgurl" alt="" />
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!recommendList.length">
        <b-loading></b-loading>
      </div>		
    </b-scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getRecommends, getRecommendList } from '@/api/recommend';
  import BSlider from '@/base/BSlider';
  import BLoading from '@/base/loading/BLoading';
  import BScroll from '@/base/BScroll';
  import {CODE_OK} from '@/api/config';
  import {mapMutations} from 'vuex';
  import {playlistMixin} from '@/assets/js/mixin';

  export default {
    mixins: [playlistMixin],
    data() {
      return {
        recommends: [],
        recommendList: []
      }
    },
    created() {
      this._getRecommends();
      this._getRecommendList();
    },
    methods: {
      _getRecommends() {
        getRecommends().then(res => {
          if(res.code === CODE_OK) {
            this.recommends = res.data.slider;
          }
        });
      },
      _getRecommendList() {
        getRecommendList().then(res => {
          if(res.code === CODE_OK) {
            this.recommendList = res.data.list;
          }
        });
      },
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true;
          this.$refs.scroll.refresh();
        }
      },
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : '';

        this.$refs.recommend.style.bottom = bottom;
        this.$refs.scroll.refresh();
      },
      selectItem(item) {
        this.$router.push({
          path: `/recommend/${item.dissid}`
        });

        this.setDisc(item);
      },
      ...mapMutations({
        setDisc: 'SET_DISC'
      })
    },
    components: {
      BSlider,
      BScroll,
      BLoading
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable";

  .recommend {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .recommend-content {
      height: 100%;
      overflow: hidden;
      .slider-wrapper {
        position: relative;
        width: 100%;
        overflow: hidden;
      }
      .recommend-list {
        .list-title {
          height: 65px;
          line-height: 65px;
          text-align: center;
          font-size: $font-size-medium;
          color: $color-theme;
        }
        .item {
          display: flex;
          box-sizing: border-box;
          align-items: center;
          padding: 0 20px 20px 20px;
          .icon {
            flex: 0 0 60px;
            width: 60px;
            padding-right: 20px;
          }
          .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            font-size: $font-size-medium;
            .name {
              margin-bottom: 10px;
              color: $color-text;
            }
            .desc {
              color: $color-text-d;
            }
          }
        }
      }
      .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
</style>