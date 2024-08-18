<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import moment from 'moment'


const eloToRankShort = (elo, index) => {
    const rr = elo > 2100 ? elo - 2100 : elo % 100; // for correct RR in radiant
    const rankNumber = (elo - rr) / 100
    console.log("elo", elo)
    let rankName
    switch(true) {
      case rankNumber ===  0: rankName = "I1"; break;
      case rankNumber ===  1: rankName = "I2"; break;
      case rankNumber ===  2: rankName = "I3"; break;
      case rankNumber ===  3: rankName = "B1"; break;
      case rankNumber ===  4: rankName = "B2"; break;
      case rankNumber ===  5: rankName = "B3"; break;
      case rankNumber ===  6: rankName = "S1"; break;
      case rankNumber ===  7: rankName = "S2"; break;
      case rankNumber ===  8: rankName = "S3"; break;
      case rankNumber ===  9: rankName = "G1"; break;
      case rankNumber === 10: rankName = "G2"; break;
      case rankNumber === 11: rankName = "G3"; break;
      case rankNumber === 12: rankName = "P1"; break;
      case rankNumber === 13: rankName = "P2"; break;
      case rankNumber === 14: rankName = "P3"; break;
      case rankNumber === 15: rankName = "D1"; break;
      case rankNumber === 16: rankName = "D2"; break;
      case rankNumber === 17: rankName = "D3"; break;
      case rankNumber === 18: rankName = "A1"; break;
      case rankNumber === 19: rankName = "A2"; break;
      case rankNumber === 20: rankName = "A3"; break; // https://support-valorant.riotgames.com/hc/en-us/articles/4405964120339-Rank-Rating-RR-for-Immortal-and-Radiant-Ranks
      case rankNumber === 21: rankName = "I1"; break;
      case rankNumber === 22: rankName = "I2"; break;
      case rankNumber === 23: rankName = "I3"; break;
      case rankNumber  >= 24: rankName = "Radiant"; break;
      default: rankName = ""; break;
    }

    const rankShort = rankName + " " + rr + "RR"
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
    height: 100,
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
  xaxis: {
    labels: {
      show: false
    }
  },
  yaxis: {
    stepSize: 25,
    forceNiceScale: true,
    opposite: true,
    labels: {
      formatter: function (v, i) {
        return eloToRankShort(v, i)
      }
    }
  },
  markers: {
    size: 3,
    colors: '#000000'
  },
  stroke: {
    show: true,
    width: 2
  }
})
const series = ref([])

const route = useRoute()

const getRecentMatches = async () => {
  axios.get(`https://api.henrikdev.xyz/valorant/v1/mmr-history/${route.params.region}/${route.params.name}/${route.params.tag}?api_key=${process.env.VUE_APP_VALAPI}`).then((res) => {
    console.log(res.data)
    matches.value = res.data 
    const eloHistory = res.data.data.map(match => match.elo)
    const dateHistory = res.data.data.map(match => {
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
    <div class="embed">
      <div class="lineChart">
        <apexchart type="line" :options="options" :series="series" width="600px" height="200px" />
      </div>
      <div class="sidePanel">
        <div><b>Current rank:</b></div>
        <div v-if="matches.data">{{ matches.data[0].currenttierpatched}} {{ matches.data[0].elo % 100 }}RR</div>
        <div v-if="matches.data"><img :src="matches.data[0].images.small" alt="rank icon" /></div>
        <div><b>RR Change: </b>
          <span v-if="matches.data"><span v-if="(matches.data[0].elo - matches.data[matches.data.length-1].elo) > 0">+</span>{{ matches.data[0].elo - matches.data[matches.data.length-1].elo }}</span>
        </div>
      </div>
    </div>
    
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Space+Mono&display=swap');

.embed {
  display: flex;

  font-family: 'Roboto', sans-serif;
}

.sidePanel {
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
}
</style>