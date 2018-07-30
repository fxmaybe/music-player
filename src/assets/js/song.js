import {getLyric} from '@/api/song';
import {CODE_OK} from '@/api/config';
import {Base64} from 'js-base64';

export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id;
    this.mid = mid;
    this.singer = singer;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.image = image;
    this.url = url;
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric);
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === CODE_OK) {
          this.lyric = Base64.decode(res.lyric);
          resolve(this.lyric);
        } else {
          reject('no lyric');
        }
      });
    });
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400000jF0b70x9gDf.m4a?guid=4767731720&vkey=FA97C39BBAE5220AC85A5064C4D7C52CE8AD2DC6CD5A251566D19A89514F20DA511DE8962EE32FD5F42CF1B7CF9528EA14905C82712907E0&uin=0&fromtag=38&r=${new Date().getTime()}`
  });
}

function filterSinger(singer) {
  let ret = [];

  if (!singer) {
    return '';
  }

  singer.forEach((s) => {
    ret.push(s.name);
  });

  return ret.join('/');
}

