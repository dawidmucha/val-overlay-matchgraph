<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import NavbarComponent from './NavbarComponent.vue';
import OverlayWidget from '@/components/OverlayWidget.vue'

const route = useRoute()
const copied = ref('')

const onCopy = () => { 
  copied.value = 'copied!' 

  navigator.clipboard.writeText("https://dawidmucha.github.io/val-overlay-matchgraph/#/" + route.path + '/embed')
}
</script>

<template>
  <NavbarComponent />
  <h1>Graph for {{route.params.name}}#{{route.params.tag}} ({{route.params.region.toUpperCase()}})</h1>
  <div>
    <OverlayWidget />
    <button @click="onCopy">Get Embeddable link</button>
    <div>{{ copied }}</div>
  </div>
</template>

<style>
button {
  margin: 20px;
  padding: 10px;
  font-size: 20px;
}
</style>