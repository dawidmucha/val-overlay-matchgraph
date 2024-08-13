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
        y2: 100,
        fillColor: '#afafaf',
      },
      {
        y: 100,
        y2: 200,
        fillColor: '#888888',
      },
      {
        y: 200,
        y2: 300,
        fillColor: '#4e4e4e',
      },
      {
        y: 300,
        y2: 400,
        fillColor: '#c0a78c',
      },
      {
        y: 400,
        y2: 500,
        fillColor: '#a17c54',
      },
      {
        y: 500,
        y2: 600,
        fillColor: '#723b01',
      },
      {
        y: 600,
        y2: 700,
        fillColor: '#cccccc',
      },
      {
        y: 700,
        y2: 800,
        fillColor: '#b3b3b3',
      },
      {
        y: 800,
        y2: 900,
        fillColor: '#8e8e8e',
      },
      {
        y: 900,
        y2: 1000,
        fillColor: '#f8ff8c',
      },
      {
        y: 1000,
        y2: 1100,
        fillColor: '#f5ff54',
      },
      {
        y: 1100,
        y2: 1200,
        fillColor: '#f0ff01',
      },
      {
        y: 1200,
        y2: 1300,
        fillColor: '#8cdee3',
      },
      {
        y: 1300,
        y2: 1400,
        fillColor: '#54cdd5',
      },
      {
        y: 1400,
        y2: 1500,
        fillColor: '#01b5c0',
      },
      {
        y: 1500,
        y2: 1600,
        fillColor: '#da8ce8',
      },
      {
        y: 1600,
        y2: 1700,
        fillColor: '#c854dd',
      },
      {
        y: 1700,
        y2: 1800,
        fillColor: '#ad01cc',
      },
      {
        y: 1800,
        y2: 1900,
        fillColor: '#8cdd8e',
      },
      {
        y: 1900,
        y2: 2000,
        fillColor: '#54cc57',
      },
      {
        y: 2000,
        y2: 2100,
        fillColor: '#01b305',
      },
      {
        y: 2100,
        y2: 2200,
        fillColor: '#ff8c8c',
      },
      {
        y: 2200,
        y2: 2300,
        fillColor: '#ff5454',
      },
      {
        y: 2300,
        y2: 2400,
        fillColor: '#ff0101',
      },
      {
        y: 2400,
        y2: 5000,
        fillColor: '#ffd801',
      },
    ]
  },
  yaxis: {
    stepSize: 25,
    forceNiceScale: true,
    labels: {
      formatter: function (v, i) {
        return eloToRankShort(v, i)
      }
    }
  },
  xaxis: {
    labels: {
      show: false
    }
  },
  markers: {
    size: 4,
    colors: '#000000'
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
      data: eloHistory.reverse()
      // data: [0, 500, 1000, 1500, 2000, 2300]
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