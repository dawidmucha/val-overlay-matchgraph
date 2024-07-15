<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { Line } from 'vue-chartjs'

const matches = ref('')
const data = ref({
  labels: ['a', 'b', 'c'],
  datasets: [
    {
      label: 'testing',
      backgroundColor: '#f87979',
      data: [30, 50, 24]
    }
  ]
})

const route = useRoute()

const getRecentMatches = async () => {
  axios.get(`https://api.henrikdev.xyz/valorant/v1/mmr-history/${route.params.region}/${route.params.name}/${route.params.tag}?api_key=${process.env.VUE_APP_VALAPI}`).then((res) => {
    matches.value = res.data 
  })
}

onMounted(() => {
  getRecentMatches()
})
</script>

<template>
  <div>
    overlay {{ $route.params.name }} {{ $route.params.tag }} {{ $route.params.region }}
    <hr />
    <Line :data="data" />
    <hr />
    <div v-for="match in matches.data" :key="match" style="border: 1px solid black">
      <div>{{ match.date_raw }}</div>
      <div>{{ match.elo }}</div>
      <div>{{ match.mmr_change_to_last_game }}</div>
      <img :src="match.images.small" alt="rank icon" />
    </div>
    
  </div>
</template>