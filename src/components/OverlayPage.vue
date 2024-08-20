<script setup>
import { useRoute } from 'vue-router'
import OverlayWidget from '@/components/OverlayWidget.vue'

const route = useRoute()
</script>

<template>
  <h1>Graph for {{route.params.name}}#{{route.params.tag}} ({{route.params.region.toUpperCase()}})</h1>
  <div>
    <OverlayWidget />
  </div>
</template>