import jsonp from '@/assets/js/jsonp';
import {commonParams, options} from '@/api/config';
import axios from 'axios';

export function getRecommends() {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';

  let data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  });

  return jsonp(url, data, options);
}

export function getRecommendList() {
  let url = '/api/getDiscList';

  let data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  });

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function getSongList(disstid) {
  let url = '/api/getCdInfo';

  let data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    onlysong: 0,
    format: 'jsonp',
    platform: 'yqq',
    notice: 0,
    hostUin: 0,
    needNewCode: 0
  });

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  })
}
