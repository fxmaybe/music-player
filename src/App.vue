<template>
  <div id="app" @touchmove.prevent>
    <c-header></c-header>
    <c-tab></c-tab>
    <router-view />
    <c-player></c-player>
  </div>
</template>

<script>
  import CHeader from '@/components/layout/CHeader';
  import CTab from '@/components/layout/CTab';
  import CPlayer from '@/components/player/CPlayer';

  export default {
    name: 'App',
    components: {
      CHeader,
      CTab,
      CPlayer
    }
  }
</script>

<style>
</style>
