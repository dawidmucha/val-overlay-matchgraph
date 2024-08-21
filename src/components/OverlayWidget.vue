<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import moment from 'moment'

const opacity = ref(0.7)

const eloToRank = (elo) => {
  const isImmoOrAbove = elo > 2100 ? true : false
  const region = route.params.region

  if(isImmoOrAbove) {
    switch(region) {
      case 'latam': case 'kr':
        switch(elo) {
          case 2190: return "IMMO 2"
          case 2250: return "IMMO 3"
          case 2300: return "RADIANT"
        }
        break;
      case 'br':
        switch(elo) {
          case 2200: return "IMMO 2"
          case 2330: return "IMMO 3"
          case 2440: return "RADIANT"
        }
        break;
      case 'na':
        switch(elo) {
          case 2190: return "IMMO 2"
          case 2300: return "IMMO 3"
          case 2550: return "RADIANT"
        }
        break;
      case 'ap':
        switch(elo) {
          case 2180: return "IMMO 2"
          case 2300: return "IMMO 3"
          case 2500: return "RADIANT"
        }
        break;
      case 'eu':
        switch(elo) {
          case 2200: return "IMMO 2"
          case 2300: return "IMMO 3"
          case 2650: return "RADIANT"
        }
        break;
    }
  } else {
    switch(elo) {
      case    0: return "IRON 1"
      case  100: return "IRON 2"
      case  200: return "IRON 3"
      case  300: return "BRNZ 1"
      case  400: return "BRNZ 2"
      case  500: return "BRNZ 3"
      case  600: return "SILV 1"
      case  700: return "SILV 2"
      case  800: return "SILV 3"
      case  900: return "GOLD 1"
      case 1000: return "GOLD 2"
      case 1100: return "GOLD 3"
      case 1200: return "PLAT 1"
      case 1300: return "PLAT 2"
      case 1400: return "PLAT 3"
      case 1500: return "DIA 1"
      case 1600: return "DIA 2"
      case 1700: return "DIA 3"
      case 1800: return "ASC 1"
      case 1900: return "ASC 2"
      case 2000: return "ASC 3"
      case 2100: return "IMMO 1"
    }
  }

  return elo //fallback, if doesn't match any rank
}
const eloToRankShort = (elo, index) => { // turns Y axis value (e.g. 1710) into shortened rank name (e.g. D3 10RR)
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
      enabled: false,
      enabledOnSeries: false
    },
  },
  grid: {
    show: true,
    borderColor: "white",
  },
  annotations: {
    opacity: 0,
    yaxis: [
      {
        y: 0,
        y2: 100,
        fillColor: '#afafaf', //i1
        opacity: opacity.value,
      },
      {
        y: 100,
        y2: 200,
        fillColor: '#888888', //i2
        opacity: opacity.value,
      },
      {
        y: 200,
        y2: 300,
        fillColor: '#4e4e4e', //i3
        opacity: opacity.value,
      },
      {
        y: 300,
        y2: 400,
        fillColor: '#c0a78c', //b1
        opacity: opacity.value,
      },
      {
        y: 400,
        y2: 500,
        fillColor: '#a17c54', //b2
        opacity: opacity.value,
      },
      {
        y: 500,
        y2: 600,
        fillColor: '#723b01', //b3
        opacity: opacity.value,
      },
      {
        y: 600,
        y2: 700,
        fillColor: '#cccccc', //s1
        opacity: opacity.value,
      },
      {
        y: 700,
        y2: 800,
        fillColor: '#b3b3b3', //s2
        opacity: opacity.value,
      },
      {
        y: 800,
        y2: 900,
        fillColor: '#8e8e8e', //s3
        opacity: opacity.value,
      },
      {
        y: 900,
        y2: 1000,
        fillColor: '#f8ff8c', //g1
        opacity: opacity.value,
      },
      {
        y: 1000,
        y2: 1100,
        fillColor: '#f5ff54', //g2
        opacity: opacity.value,
      },
      {
        y: 1100,
        y2: 1200,
        fillColor: '#f0ff01', //g3
        opacity: opacity.value,
      },
      {
        y: 1200,
        y2: 1300,
        fillColor: '#8cdee3', //p1
        opacity: opacity.value,
      },
      {
        y: 1300,
        y2: 1400,
        fillColor: '#54cdd5', //p2
        opacity: opacity.value,
      },
      {
        y: 1400,
        y2: 1500,
        fillColor: '#01b5c0', //p3
        opacity: opacity.value,
      },
      {
        y: 1500,
        y2: 1600,
        fillColor: '#da8ce8', //d1
        opacity: opacity.value,
      },
      {
        y: 1600,
        y2: 1700,
        fillColor: '#c854dd', //d2
        opacity: opacity.value,
      },
      {
        y: 1700,
        y2: 1800,
        fillColor: '#ad01cc', //d3
        opacity: opacity.value,
      },
      {
        y: 1800,
        y2: 1900,
        fillColor: '#8cdd8e', //a1
        opacity: opacity.value,
      },
      {
        y: 1900,
        y2: 2000,
        fillColor: '#54cc57', //a2
        opacity: opacity.value,
      },
      {
        y: 2000,
        y2: 2100,
        fillColor: '#01b305', //a3
        opacity: opacity.value,
      },
    ]
  },
  xaxis: {
    labels: {
      show: false
    }
  },
  yaxis: {
    stepSize: 100,
    forceNiceScale: true,
    opposite: true,
    labels: {
      show: true,
      align: 'right',
      rotate: 90,
      style: {
        fontSize: '14px',
        fontFamily: 'DM Sans',
        fontWeight: 600,
        colors: 'white',
        cssClass: 'y-axis-label-letter-spacing'
      },
      formatter: function (v) {
        return eloToRank(v)
      }
    }
  },
  markers: {
    size: 0,
    colors: 'white',
    strokeWidth: 0,
    lineCap: 'round'
  },
  stroke: {
    show: true,
    width: 4,
    colors: 'white'
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
      opacity: opacity.value,
    },
    {
      y: immoRr.value[0],
      y2: immoRr.value[1],
      fillColor: '#ff5454',
      opacity: opacity.value,
    },
    {
      y: immoRr.value[1],
      y2: immoRr.value[2],
      fillColor: '#ff0101',
      opacity: opacity.value,
    },
    {
      y: immoRr.value[2],
      y2: 5000,
      fillColor: '#ffd801',
      opacity: opacity.value,
    },
  )

  getRecentMatches()
})
</script>

<template>
  <div>
    <div class="embed">
      <div class="lineChart">
        <apexchart type="line" :options="options" :series="series" width="600px" height="200px" style="padd" />
      </div>
      <div class="sidePanel">
        <div class="sidePanelText">
          <div v-if="matches.data">{{ matches.data[0].currenttierpatched}}</div>
          <div v-if="matches.data">{{ matches.data[0].ranking_in_tier }}RR</div>
          <div><span v-if="matches.data">(<span v-if="(matches.data[0].elo - matches.data[matches.data.length-1].elo) > 0">+</span>{{ matches.data[0].elo - matches.data[matches.data.length-1].elo }})</span></div>
        </div>

        <div v-if="matches.data"><img :src="matches.data[0].images.small" alt="rank icon" style="width: 100px;" /></div>
      </div>
    </div>
    
  </div>
</template>

<style>
/* Roboto */
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Space+Mono&display=swap');
/* DM Sans */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');

.embed {
  display: flex;
  font-family: 'Roboto', sans-serif;
  width: 750px;

  color: white;
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(2,0,36,0.8016340325192577) 0%, rgba(0,0,0,0.7960317916228992) 75%, rgba(255,0,0,0) 100%);
}

.sidePanel {
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: space-evenly;
}

.sidePanelText {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  filter: drop-shadow(0 0 0.5rem black);
}

.y-axis-label-letter-spacing {
  letter-spacing: 1px;
}
</style>