<script setup>
import NavbarComponent from './NavbarComponent.vue';
</script>

<template>
  <NavbarComponent />

  <div class="info">
    <h3>INFORMATION ABOUT PROJECT</h3>
    <ul>
      <li>This is mostly a practice project. I know it looks ugly, if there will be demand I'll improve UI</li>
      <li>This projest uses <a href="https://github.com/Henrik-3/unofficial-valorant-api" target="_blank">Henrik-3's Unofficial Valorant API</a> and <a href="https://apexcharts.com/" target="_blank">ApexCharts.js</a></li>
      <li>The graph shows MMR from games played in the last 2 weeks OR last 20 games, if more were played. This is a limitation on Riot's side</li>
      <li>Becuase of limited spots in a Radiant/Immortal ranks, graph might not be entirely accurate as it assigns rank based only on MMR (current rank tier and RR)</li>
      <li>Graph should auto-refresh every 5 minutes</li> 
    </ul>
  </div>
</template>