<script setup>
import NavbarComponent from './NavbarComponent.vue';
</script>

<template>
  <NavbarComponent />

  <div class="info flex flex-col items-center">
    <h3 class="text-4xl text-center m-6">INFORMATION ABOUT PROJECT</h3>
    <ul class="text-center list-disc list-inside w-full md:w-1/2">
      <li class="m-1">This projest uses <a href="https://github.com/Henrik-3/unofficial-valorant-api" target="_blank">Henrik-3's Unofficial Valorant API</a> and <a href="https://apexcharts.com/" target="_blank">ApexCharts.js</a></li>
      <li class="m-1">The graph shows MMR from games played in the last 2 weeks OR last 20 games, if more were played. This is a limitation on Riot's side</li>
      <li class="m-1">Becuase of limited spots in a Radiant/Immortal ranks, graph might not be entirely accurate as it assigns rank based only on MMR (current rank tier and RR)</li>
      <li class="m-1">Graph should auto-refresh every 5 minutes</li> 
    </ul>
  </div>
</template>