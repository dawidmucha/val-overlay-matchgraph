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
  <div class="bg-yellow-200/50 flex flex-col items-center">
    <h1 @click="router.push('/')" class="text-3xl p-3">VALORANT Rank Graph</h1>

    <form @submit.prevent="onSubmit" class="flex flex-col items-center">
      <div class="p-3">
        <div class="p-1 pb-0">Nickname (with tag):</div>
        <div class="p-1">
          <input class="p-1 border-2 border-gray-500/30 rounded" type="text" name="nickname" id="nickname" placeholder="nickname#1234" @change="onNicknameChange($event)" />
        </div>

        <div class="m-2">
          <select name="region" id="region" @change="onRegionChange($event)" class="p-0.5 self-stretch bg-gray-300" style="width: 100%;">
            <option value="" disabled selected>Choose region</option>
            <option value="na">NA (North America)</option>
            <option value="eu">EU (Europe)</option>
            <option value="latam">LATAM (Latin America)</option>
            <option value="br">BR (Brazil)</option>
            <option value="apc">APC (Asia-Pacific)</option>
            <option value="kr">KR (Korea)</option>
          </select>
        </div>
      </div>

      <div class="bg-green-700 rounded p-2 m-2 text-center font-semibold text-gray-200">
        <input type="submit" value="Submit" class="uppercase" />
      </div>
    </form>
  </div>
</template>

<style>

</style>