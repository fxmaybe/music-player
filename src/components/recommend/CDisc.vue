<template>
  <transition name="slide">
    <c-music-list :title="title" :bg-image="bgImage" :songs="songs"></c-music-list>
  </transition>
</template>

<script>
  import CMusicList from '@/components/music/CmusicList';
  import {getSongList} from '@/api/recommend';
  import {CODE_OK} from '@/api/config';
  import {mapGetters} from 'vuex';
  import {createSong} from '@/assets/js/song';

  export default {
    computed: {
      title() {
        return this.disc.dissname;
      },
      bgImage() {
        return this.disc.imgurl;
      },
      ...mapGetters([
        'disc'
        ])
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getSongList();
    },
    methods: {
      _getSongList() {
        if (!this.disc.dissid) {
          this.$router.push('/recommend');
          return;
        }
        getSongList(this.disc.dissid).then((res) => {
          if (res.code === CODE_OK) {
            this.songs = this.normalizeSongs(res.cdlist[0].songlist);
          }
        });
      },
      normalizeSongs(list) {
        let ret = [];
        list.forEach((musicData) => {
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
    transition: all 0.3s;
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>