<template>
  <div class="singer" ref="singer">
    <b-list-view :data="singers" @select="selectSinger" ref="list"></b-list-view>
    <router-view></router-view> 
  </div>
</template>

<script>
  import BListView from '@/base/BListView'
  import {getSingerList} from '@/api/singer';
  import Singer from '@/assets/js/singer';
  import {CODE_OK} from '@/api/config';
  import {mapMutations} from 'vuex';
  import {playlistMixin} from '@/assets/js/mixin'

  const HOT_SINGER_LEN = 10;
  const HOT_TITTLE  = '热门';

  export default {
    mixins: [playlistMixin],
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList();
    },
    methods: {
      _getSingerList() {
        getSingerList().then(res => {
          if(res.code === CODE_OK) {
            this.singers = this.normalizeSinger(res.data.list);
          }
        }).catch(ex => {

        });
      },
      normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_TITTLE,
            items: []
          }
        };

        let hot = [];
        let ret = [];

        list.forEach((item, index) => {
          if(index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }));
          }

          let k = item.Findex;

          if(!map[k]) {
            map[k] = {
              title: k,
              items: []
            }
          }

          map[k].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }));
        });

        for(let key in map) {
          if(/[a-zA-Z]/.test(map[key].title)) {
            ret.push(map[key]);
          } else if(map[key].title === HOT_TITTLE ) {
            hot.push(map[key]);
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0);
        });

        return hot.concat(ret);
      },
      handlePlaylist(playlist) {
        let bottom = playlist.length > 0 ? '60px' : '';
        this.$refs.singer.style.bottom = bottom;
        this.$refs.list.refresh();
      },
      selectSinger(singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        });

        this.setSinger(singer);
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      BListView
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer {
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;
  }

</style>