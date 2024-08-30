<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import moment from 'moment'

const opacity = ref(0.5)
const fillColorList = [
  '#afafaf','#888888','#4e4e4e',//iron
  '#c0a78c','#a17c54','#723b01',//bronze
  '#cccccc','#b3b3b3','#8e8e8e',//silver
  '#f8ff8c','#f5ff54','#f0ff01',//gold
  '#8cdee3','#54cdd5','#01b5c0',//platinum
  '#da8ce8','#c854dd','#ad01cc',//diamond
  '#8cdd8e','#54cc57','#01b305',//ascendant
]
const rankShort = [
  'iron 1', 'iron 2', 'iron 3',
  'brnz 1', 'brnz 2', 'brnz 3',
  'slvr 1', 'slvr 2', 'slvr 3',
  'gold 1', 'gold 2', 'gold 3',
  'plat 1', 'plat 2', 'plat 3',
  'dia 1', 'dia 2', 'dia 3',
  'asc 1', 'asc 2', 'asc 3',
]

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
const topOffset = ref(0)
const errMsg = ref('')

const matches = ref('')
const data = ref({
  labels: [],
  datasets: [{
    data: [],
  }]
})
const peakElo = ref(0)

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
    show: false,
    borderColor: "white",
  },
  tooltip: {
    enabled: false
  },
  annotations: {
    opacity: 1,
    yaxis: Array.from(fillColorList, (color) => {
      return {
        y: fillColorList.indexOf(color) * 100,
        y2: (fillColorList.indexOf(color) * 100) + 100,
        fillColor: color,
        opacity: opacity.value,
        label: {
          text: rankShort[fillColorList.indexOf(color)],
          textAnchor: 'start',
          position: 'left',
          offsetX: 15,
          offsetY: 15,
          style: {
            cssClass: 'y-axis-annotation-label',
            color: "green",
            fontFamily: "Mulish",
            padding: {
              top: 3,
              bottom: 3,
              left: 0,
              right: 0,
            }
          }
        }
      }
    })
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
      show: false,
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
const options2 = ref({
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
    show: false,
    borderColor: "white",
  },
  tooltip: {
    enabled: false
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
      show: false,
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
    colors: '#000'
  }
})


const series = ref([])

const route = useRoute()

const autoRefresh = () => {
  getRecentMatches()

  setTimeout(() => {
    autoRefresh()
    console.log('bumpin that')
  }, 300000) // 5 mins
}

const getRecentMatches = async () => {
  axios.get(`https://api.henrikdev.xyz/valorant/v1/mmr-history/${route.params.region}/${route.params.name}/${route.params.tag}?api_key=${process.env.VUE_APP_VALAPI}`).then((res) => {
    console.log(`https://api.henrikdev.xyz/valorant/v1/mmr-history/${route.params.region}/${route.params.name}/${route.params.tag}?api_key=${process.env.VUE_APP_VALAPI}`)
    matches.value = res.data 
    const eloHistory = res.data.data.map(match => match.elo)
    const dateHistory = res.data.data.map(match => {
     return moment.unix(match.date_raw).fromNow()
    })
    peakElo.value = Math.max(...eloHistory)

    series.value = [{
      name: "elo",
      data: eloHistory.reverse()
      // data: [0, 500, 1000, 1500, 2000, 2300]
    }]
  }).catch(err => {
    errMsg.value = "Look's like the nickname might be wrong. Try again with a correct one. \nError code: " + err
  })
}



onMounted(() => {
  autoRefresh()
  const endsWithEmbed = /.*embed$/
  topOffset.value = endsWithEmbed.exec(route.path) ? 0 : '317px'

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
        label: {
          text: 'imm 1',
          textAnchor: 'start',
          position: 'left',
          offsetX: 15,
          offsetY: 15,
          style: {
            cssClass: 'y-axis-annotation-label',
            color: "green",
            fontFamily: "DM Sans",
            padding: {
              top: 3,
              bottom: 3,
              left: 0,
              right: 0,
            }
          }
        }
    },
    {
      y: immoRr.value[0],
      y2: immoRr.value[1],
      fillColor: '#ff5454',
      opacity: opacity.value,
        label: {
          text: 'imm 2',
          textAnchor: 'start',
          position: 'left',
          offsetX: 15,
          offsetY: 15,
          style: {
            cssClass: 'y-axis-annotation-label',
            color: "green",
            fontFamily: "DM Sans",
            padding: {
              top: 3,
              bottom: 3,
              left: 0,
              right: 0,
            }
          }
        }
    },
    {
      y: immoRr.value[1],
      y2: immoRr.value[2],
      fillColor: '#ff0101',
      opacity: opacity.value,
        label: {
          text: 'imm 3',
          textAnchor: 'start',
          position: 'left',
          offsetX: 15,
          offsetY: 15,
          style: {
            cssClass: 'y-axis-annotation-label',
            color: "green",
            fontFamily: "DM Sans",
            padding: {
              top: 3,
              bottom: 3,
              left: 0,
              right: 0,
            }
          }
        }
    },
    {
      y: immoRr.value[2],
      y2: 5000,
      fillColor: '#ffd801',
      opacity: opacity.value,
        label: {
          text: 'radiant',
          textAnchor: 'start',
          position: 'left',
          offsetX: 15,
          offsetY: 15,
          style: {
            cssClass: 'y-axis-annotation-label',
            color: "green",
            fontFamily: "DM Sans",
            padding: {
              top: 3,
              bottom: 3,
              left: 0,
              right: 0,
            }
          }
        }
    },
  )

  getRecentMatches()
})
</script>

<template>
  <div>
    <div v-if="errMsg">{{ errMsg }}</div>
    <div class="embed" v-if="!errMsg">
      <div class="lineChart">
        <apexchart type="line" :options="options" :series="series" width="600px" height="200px" />
        <apexchart type="line" :options="options2" :series="series" width="600px" height="200px" class="phantomChart" />
      </div>
      <div class="sidePanel">
        <div class="sidePanelText">
          <div v-if="matches.data">{{ matches.data[0].currenttierpatched}}</div>
          <div v-if="matches.data">
            {{ matches.data[0].ranking_in_tier }}RR
            <span v-if="matches.data" class="sidePanelDelta"><span v-if="matches.data">(<span v-if="(matches.data[0].elo - matches.data[matches.data.length-1].elo) > 0">+</span>{{ matches.data[0].elo - matches.data[matches.data.length-1].elo }})</span></span>
          </div>
          <div v-if="matches.data" class="sidePanelPeak">Peak: {{ eloToRankShort(peakElo) }}</div>
        </div>

        <div v-if="matches.data"><img :src="matches.data[0].images.small" alt="rank icon" style="width: 90px;" /></div>
      </div>
    </div>
  </div>
</template>

<style>
/* Roboto */
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Space+Mono&display=swap');
/* DM Sans */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
/* Mulsih */
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');

.embed {
  display: flex;
  font-family: 'Roboto', sans-serif;
  width: 750px;

  color: white;
  background: linear-gradient(89deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.5) 75%, rgba(255,0,0,0) 100%);
}

.phantomChart {
  position: absolute;
  top: v-bind(topOffset);
}

.sidePanel {
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: space-evenly;
}

.sidePanelDelta {
  font-size: 14px;
}

.sidePanelText {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  text-shadow: #000 0px 0px 4px,   #000 0px 0px 4px,   #000 0px 0px 4px,
             #000 0px 0px 4px,   #000 0px 0px 4px,   #000 0px 0px 4px;
}

.sidePanelPeak {
  padding-top: 4px;
  font-size: 12px;
}

.y-axis-label-letter-spacing {
  letter-spacing: 1px;
}

.y-axis-annotation-label {
  writing-mode: vertical-lr;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
}
</style>