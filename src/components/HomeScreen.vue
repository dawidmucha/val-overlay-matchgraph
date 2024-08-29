<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const nickname = ref('')
const region = ref('')

const onNicknameChange = (e) => {
  nickname.value = e.target.value
}
const onRegionChange = (e) => {
  region.value = e.target.value
} 

const onSubmit = () => {
  const n = nickname.value.split('#')

  router.push({ path: `/${n[0]}/${n[1]}/${region.value}`})
}
</script>

<template>
  <h1 @click="router.push('/')" id="logo">VALORANT Rank Graph</h1>

  <form @submit.prevent="onSubmit">
    <div class="formNick">
      <div>Nickname (with tag):</div>
      <div><input type="text" name="nickname" id="nickname" placeholder="nickname#1234" @change="onNicknameChange($event)" /></div>
    </div>
    <div class="formRegion">
      <select name="region" id="region" @change="onRegionChange($event)">
        <option value="" disabled selected>Choose region</option>
        <option value="latam">LATAM (Latin America)</option>
        <option value="kr">KR (Korea)</option>
        <option value="br">BR (Brazil)</option>
        <option value="na">NA (North America)</option>
        <option value="apc">APC (Asia-Pacific)</option>
        <option value="eu">EU (Europe)</option>
      </select>
    </div>
    <div class="formSubmit">
      <input type="submit"  value="Submit" />
    </div>
  </form>
</template>

<style>
/* Roboto */
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Space+Mono&display=swap');

#logo {
  cursor: pointer;
  -webkit-user-select: none; /* Safari */        
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

body {
  background-color: #B19859;
  font-family: 'Roboto', sans-serif;
  text-align: center;
}

h1 {
  font-size: 50px;
}

form {
  display: flex;
  flex-direction: column;
  font-size: 18px;
}

.formNick, .formRegion {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>