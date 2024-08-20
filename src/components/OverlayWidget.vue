<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import moment from 'moment'

const eloToRankShort = (elo, index) => {
  const isImmoOrAbove = elo > 2100 ? true : false
  const region = route.params.region
  let rr, rankName

  if(isImmoOrAbove) {
    rr = elo - 2100

    switch(region) {
      case "latam": case "kr":
        if(rr >= 200) rankName = "Radiant"
        else if(rr >= 150) rankName = "Immo3"
        else if(rr >= 90) rankName = "Immo2"
        else rankName = "Immo1"; break
      case "eu":
        if(rr >= 550) rankName = "Radiant"
        else if(rr >= 200) rankName = "Immo3"
        else if(rr >= 100) rankName = "Immo2"
        else rankName = "Immo1"; break
      case "na":
        if(rr >= 450) rankName = "Radiant"
        else if(rr >= 200) rankName = "Immo3"
        else if(rr >= 90) rankName = "Immo2"
        else rankName = "Immo1"; break
      case "br":
        if(rr >= 340) rankName = "Radiant"
        else if(rr >= 230) rankName = "Immo3"
        else if(rr >= 100) rankName = "Immo2"
        else rankName = "Immo1"; break
      case "ap":
        if(rr >= 400) rankName = "Radiant"
        else if(rr >= 200) rankName = "Immo3"
        else if(rr >= 80) rankName = "Immo2"
        else rankName = "Immo1"; break
    }
  } else {
    rr = elo % 100
    const rankNumber = (elo - rr) / 100

    if(elo === 2100) return "Immo1 0RR" // edge case for a3-immo1

    switch(rankNumber) {
      case  0: rankName = "I1"; break
      case  1: rankName = "I2"; break
      case  2: rankName = "I3"; break
      case  3: rankName = "B1"; break
      case  4: rankName = "B2"; break
      case  5: rankName = "B3"; break
      case  6: rankName = "S1"; break
      case  7: rankName = "S2"; break
      case  8: rankName = "S3"; break
      case  9: rankName = "G1"; break
      case 10: rankName = "G2"; break
      case 11: rankName = "G3"; break
      case 12: rankName = "P1"; break
      case 13: rankName = "P2"; break
      case 14: rankName = "P3"; break
      case 15: rankName = "D1"; break
      case 16: rankName = "D2"; break
      case 17: rankName = "D3"; break
      case 18: rankName = "A1"; break
      case 19: rankName = "A2"; break
      case 20: rankName = "A3"; break 
      default: rankName = "#ERROR!";
    }
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

const immoRr = ref([2200, 2300, 2400])

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
  annotations: { // TODO: adjust backgrounds for immo/radiant based on the region
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
  switch(route.params.region) {
    case "latam": case "kr": immoRr.value = [2190, 2250, 2300]; break
    case "br": immoRr.value = [2200, 2330, 2440]; break
    case "na": immoRr.value = [2190, 2300, 2550]; break
    case "apc": immoRr.value = [2180, 2300, 2500]; break
    case "eu": immoRr.value = [2200, 2250, 2650]; break
  }

  options.value.annotations.yaxis.push(
    {
      y: 2100,
      y2: immoRr.value[0],
      fillColor: '#ff8c8c',
    },
    {
      y: immoRr.value[0],
      y2: immoRr.value[1],
      fillColor: '#ff5454',
    },
    {
      y: immoRr.value[1],
      y2: immoRr.value[2],
      fillColor: '#ff0101',
    },
    {
      y: immoRr.value[2],
      y2: 5000,
      fillColor: '#ffd801',
    },
  )

  getRecentMatches()
})
</script>

<template>
  <div>
    overlay {{ $route.params.name }} {{ $route.params.tag }} {{ $route.params.region }}
    <hr />
    {{ immoRr }}
    <div class="embed">
      <div class="lineChart">
        <apexchart type="line" :options="options" :series="series" width="600px" height="200px" />
      </div>
      <div class="sidePanel">
        <div><b>Current rank:</b></div>
        <div v-if="matches.data">{{ matches.data[0].currenttierpatched}} {{ matches.data[0].ranking_in_tier }}RR</div>
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