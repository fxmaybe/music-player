<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div ref="progressBtn" 
        class="progress-btn-wrapper" 
        @touchstart.prevent="progressTouchStart" 
        @touchmove.prevent="progressTouchMove" 
        @touchend="progressTouchEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {prefixStyle} from '@/assets/js/dom';

  let progressBtnWidth = 16;
  let transform = prefixStyle('transform');

  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    created() {
      this.touch = {};
    },
    methods: {
      progressTouchStart(e) {
        this.touch.initiated = true;
        this.touch.startX = e.touches[0].pageX;
        this.touch.left = this.$refs.progress.clientWidth;
      },
      progressTouchMove(e) {
        if (!this.touch.initiated) {
          return;
        }
        let deltaX = e.touches[0].pageX - this.touch.startX;
        let offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX));
        this.setOffset(offsetWidth);
      },
      progressTouchEnd() {
        this.touch.initiated = false;
        this.triggerPercent();
      },
      progressClick(e) {
        let rect = this.$refs.progressBar.getBoundingClientRect();
        let offsetWidth = e.pageX - rect.left;
        this.setOffset(offsetWidth);
        // 这里当我们点击 progressBtn 的时候，e.offsetX 获取不对
        // this.setOffset(e.offsetX)
        this.triggerPercent();
      },
      triggerPercent() {
        let barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
        let percent = this.$refs.progress.clientWidth / barWidth;
        this.$emit('percentChange', percent);
      },
      setOffset(offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px`;
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
      }
    },
    watch: {
      percent(newPercent) {
        if (newPercent >= 0 && !this.touch.initiated) {
          let barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
          let offsetWidth = newPercent * barWidth;
          this.setOffset(offsetWidth);
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable";

  .progress-bar {
    height: 30px;
    .bar-inner {
      position: relative;
      top: 13px;
      height: 4px;
      background: rgba(0, 0, 0, 0.3);
      .progress {
        position: absolute;
        height: 100%;
        background: $color-theme;
      }
      .progress-btn-wrapper {
        position: absolute;
        left: -8px;
        top: -13px;
        width: 30px;
        height: 30px;
        .progress-btn {
          position: relative;
          top: 7px;
          left: 7px;
          box-sizing: border-box;
          width: 16px;
          height: 16px;
          border: 3px solid $color-text;
          border-radius: 50%;
          background: $color-theme;
        }
      }
    }
  }
</style>