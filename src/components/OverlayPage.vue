<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import NavbarComponent from './NavbarComponent.vue';
import OverlayWidget from '@/components/OverlayWidget.vue'

const route = useRoute()
const copied = ref('')

const onCopy = () => { 
  copied.value = 'copied!' 

  navigator.clipboard.writeText("https://dawidmucha.github.io/val-overlay-matchgraph/#" + route.path + '/embed')

  setTimeout(() => {
    copied.value = ''
  }, 5000)
}
</script>

<template>
  <NavbarComponent />

  <div class="flex flex-col">
    <h1 class="text-3xl text-center p-3 m-1">Graph for {{route.params.name}}#{{route.params.tag}} ({{route.params.region.toUpperCase()}})</h1>
    <OverlayWidget />
    <div class="text-center flex flex-row justify-center items-center">
      <div class="text-black/0 select-none">{{ copied }}</div> <!-- invisible text for centering purposes -->
      <button @click="onCopy" class="bg-green-800 rounded p-3 m-3 text-gray-100 text-center font-bold uppercase items-center">Get Embeddable link</button>
      <div>{{ copied }}</div>
    </div>
  </div>
</template>

<style>
button {
  margin: 20px;
  padding: 10px;
  font-size: 20px;
}
</style>