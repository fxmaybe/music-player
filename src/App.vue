<template>
  <div id="app" @touchmove.prevent>
    <c-top-bar></c-top-bar>
    <c-tab></c-tab>
    <router-view />
    <c-player></c-player>
  </div>
</template>

<script>
  import CTopBar from '@/components/layout/CTopBar';
  import CTab from '@/components/layout/CTab';
  import CPlayer from '@/components/player/CPlayer';

  export default {
    name: 'App',
    components: {
      CTopBar,
      CTab,
      CPlayer
    }
  }
</script>

<style>
</style>
