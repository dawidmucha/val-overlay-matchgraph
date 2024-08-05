<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

import moment from 'moment';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const matches = ref('')
const data = ref({
  labels: [],
  datasets: [{
    data: [],
  }]
})

const options = ref({
  elements: {
    point: {
      radius: 2
    },
    line: {
      borderColor: 'black'
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
})

const route = useRoute()

const getRecentMatches = async () => {
  axios.get(`https://api.henrikdev.xyz/valorant/v1/mmr-history/${route.params.region}/${route.params.name}/${route.params.tag}?api_key=${process.env.VUE_APP_VALAPI}`).then((res) => {
    matches.value = res.data 
    const eloHistory = res.data.data.map(match => match.elo)
    const dateHistory = res.data.data.map(match => {
      console.log(moment.unix(match.date_raw).fromNow())
      return moment.unix(match.date_raw).fromNow()
    })

    data.value = {
      labels: dateHistory.reverse(),
      datasets: [{
        data: eloHistory.reverse()
      }]
    }
  })
}

const eloToRankShort = (elo) => {
  
}

onMounted(() => {
  getRecentMatches()
})
</script>

<template>
  <div>
    overlay {{ $route.params.name }} {{ $route.params.tag }} {{ $route.params.region }}
    <hr />
    <div class="lineChart">
      <Line :data="data" :options="options" />
    </div>
    <hr />
    <div v-for="match in matches.data" :key="match" style="border: 1px solid black">
      <div>Date: {{ match.date_raw }}</div>
      <div>Elo: {{ match.elo }}</div>
      <div>LP: {{ match.elo % 100 }}</div>
      <div>Elo change: {{ match.mmr_change_to_last_game }}</div>
      <div>{{ match.currenttier }} {{ match.currenttierpatched }}</div>
      <div>Current rank: {{ match.currenttierpatched }} {{ match.elo % 100 }}LP</div>
      <img :src="match.images.small" alt="rank icon" />
    </div>
    
  </div>
</template>

<style scoped>
.lineChart {
  width: 1000px;
}
</style>