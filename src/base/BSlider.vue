<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"></span>
    </div>
  </div>
</template>

<script>
  import {addClass} from '@/assets/js/dom';
  import BScroll from 'better-scroll';

  export default {
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.setSliderWidth();
        this.initDots();
        this.initSlider();

        if(this.autoPlay) {
          this.play();
        }
      });
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return;
        }
        this.setSliderWidth(true);
        this.slider.refresh();
      });
    },
    deactivated() {
      clearTimeout(this.timer);
    },
    beforeDestroy() {
      clearTimeout(this.timer);
    },
    methods: {
      setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children;

        let width = 0,
        sliderWidth = this.$refs.slider.clientWidth;

        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i];
          addClass(child, 'slider-item');

          child.style.width = sliderWidth + 'px';
          width += sliderWidth;
        }

        // resize重置这里的时候 页面上的已经是比真实个数大2了，就不用再加了
        if (this.loop && !isResize) {
          width += 2 * sliderWidth;
        }
        this.$refs.sliderGroup.style.width = width + 'px';
      },
      initDots() {
        this.dots = new Array(this.children.length);
      },
      initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            snapSpeed: 400
          },
          bounce: false,
          stopPropagation: true
        });

        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX;

          console.log(pageIndex);
          this.currentPageIndex = pageIndex;

          if(this.autoPlay) {
            this.play();
          }
        });

        this.slider.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer);
          }
        })
      },
      play() {
        let pageIndex = this.currentPageIndex + 1;

        this.timer = setTimeout(() => {
          this.slider.next();
        }, this.interval);

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable";

  .slider {
    min-height: 1px
    .slider-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider-item {
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
        a {
          display: block;
          width: 100%;
          overflow: hidden;
          text-decoration: none;
        }
        img {
          display: block;
          width: 100%;
        }
      }
    }
    .dots {
      position: absolute;
      right: 0;
      left: 0;
      bottom: 12px;
      text-align: center;
      font-size: 0;
      .dot {
        display: inline-block;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: $color-text-l;
        &.active {
          width: 20px;
          border-radius: 5px;
          background: $color-text-ll;
        }
      }
    }
  }
</style>