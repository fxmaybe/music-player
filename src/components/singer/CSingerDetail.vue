<template>
  <transition name="slide">
    <c-music-list :title="title" :bg-image="bgImage" :songs="songs"></c-music-list>
  </transition>
</template>

<script>
  import CMusicList from '@/components/music/CMusicList';
  import {getSingerDetail} from '@/api/singer';
  import {CODE_OK} from '@/api/config';
  import {createSong} from '@/assets/js/song';
  import {mapGetters} from 'vuex';

  export default {
    computed: {
      title() {
        return this.singer.name;
      },
      bgImage() {
        return this.singer.avatar;
      },
      ...mapGetters([
        'singer'
        ])
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getSingerDetail();
    },
    methods: {
      _getSingerDetail() {
        if (!this.singer.id) {
          this.$router.push('/singer');
          return;
        }

        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === CODE_OK) {
            this.songs = this.normalizeSongs(res.data.list);
          }
        });
      },
      normalizeSongs(list) {
        let ret = [];
        list.forEach((item) => {
          let {musicData} = item;
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData));
          }
        });
        return ret;
      }
    },
    components: {
      CMusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }
</style>