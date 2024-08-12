<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import moment from 'moment'

const eloToRankShort = (elo, index) => {
    const lp = elo % 100;
    const rankNumber = (elo - lp) / 100
    let rankName
    switch(rankNumber) {
      case  0: rankName = "I1"; break;
      case  1: rankName = "I2"; break;
      case  2: rankName = "I3"; break;
      case  3: rankName = "B1"; break;
      case  4: rankName = "B2"; break;
      case  5: rankName = "B3"; break;
      case  6: rankName = "S1"; break;
      case  7: rankName = "S2"; break;
      case  8: rankName = "S3"; break;
      case  9: rankName = "G1"; break;
      case 10: rankName = "G2"; break;
      case 11: rankName = "G3"; break;
      case 12: rankName = "P1"; break;
      case 13: rankName = "P2"; break;
      case 14: rankName = "P3"; break;
      case 15: rankName = "D1"; break;
      case 16: rankName = "D2"; break;
      case 17: rankName = "D3"; break;
      case 18: rankName = "Asc1"; break;
      case 19: rankName = "Asc2"; break;
      case 20: rankName = "Asc3"; break;
      case 21: rankName = "I1"; break;
      case 22: rankName = "I2"; break;
      case 23: rankName = "I3"; break;
      case 24: rankName = "Radiant"; break;
      default: rankName = ""; break;
    }

    const rankShort = rankName + " " + lp + "LP"
    console.log(rankShort)
    return rankShort
}

const matches = ref('')
const data = ref({
  labels: [],
  datasets: [{
    data: [],
  }]
})

const options = ref({
  chart: {
    type: 'line',
    toolbar: {
      show: false
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: true
    },
  },
  annotations: {
    yaxis: [
      {
        y: 0,
        y2: 99,
        fillColor: '#c3c3c5',
      },
      {
        y: 100,
        y2: 199,
        fillColor: '#949495',
      },
      {
        y: 200,
        y2: 299,
        fillColor: '#646464',
      },
      {
        y: 300,
        y2: 399,
        fillColor: '#cab692',
      },
      {
        y: 400,
        y2: 499,
        fillColor: '#a5855d',
      },
      {
        y: 500,
        y2: 599,
        fillColor: '#986c1a',
      },
      {
        y: 600,
        y2: 699,
        fillColor: '#f4fbf8',
      },
      {
        y: 700,
        y2: 799,
        fillColor: '#cdd3d1',
      },
      {
        y: 800,
        y2: 899,
        fillColor: '#9fa4a2',
      },
      {
        y: 900,
        y2: 999,
        fillColor: '#faf6df',
      },
      {
        y: 1000,
        y2: 1099,
        fillColor: '#ecce56',
      },
      {
        y: 1100,
        y2: 1199,
        fillColor: '#d39230',
      },
      {
        y: 1200,
        y2: 1299,
        fillColor: '#54d3e0',
      },
      {
        y: 1300,
        y2: 1399,
        fillColor: '#39a1b2',
      },
      {
        y: 1400,
        y2: 1499,
        fillColor: '#3b717a',
      },
      {
        y: 1500,
        y2: 1599,
        fillColor: '#f0cef7',
      },
      {
        y: 1600,
        y2: 1699,
        fillColor: '#c587f5',
      },
      {
        y: 1700,
        y2: 1799,
        fillColor: '#a770f1',
      },
      {
        y: 1800,
        y2: 1899,
        fillColor: '#b6ffd7',
      },
      {
        y: 1900,
        y2: 1999,
        fillColor: '#3cb67c',
      },
      {
        y: 2000,
        y2: 2099,
        fillColor: '#23a760',
      },
      {
        y: 2100,
        y2: 2199,
        fillColor: '#f4c0ad',
      },
      {
        y: 2200,
        y2: 2299,
        fillColor: '#e3746a',
      },
      {
        y: 2300,
        y2: 2399,
        fillColor: '#b02639',
      },
      {
        y: 2400,
        y2: 5000,
        fillColor: '#ffa42f',
      },
    ]
  },
  yaxis: {
    labels: {
      formatter: function (v, i) {
        return eloToRankShort(v, i)
      }
    }
  }
})
const series = ref([])

const route = useRoute()

const getRecentMatches = async () => {
  axios.get(`https://api.henrikdev.xyz/valorant/v1/mmr-history/${route.params.region}/${route.params.name}/${route.params.tag}?api_key=${process.env.VUE_APP_VALAPI}`).then((res) => {
    matches.value = res.data 
    const eloHistory = res.data.data.map(match => match.elo)
    const dateHistory = res.data.data.map(match => {
      console.log(moment.unix(match.date_raw).fromNow())
      return moment.unix(match.date_raw).fromNow()
    })

    series.value = [{
      name: "elo",
      // data: eloHistory.reverse()
      data: [0, 500, 1000, 1500, 2000, 2300]
    }]
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
    <div class="lineChart">
      <apexchart width="500" type="line" :options="options" :series="series" />
      chart
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