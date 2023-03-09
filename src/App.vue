<script setup>
import { ref, onMounted } from 'vue';
import ListaRzeczy from './components/ListaRzeczy.vue'
import { elementy, start, observe } from './script'

const nowy = ref('')
const storage = localStorage
const id = (storage.getItem('id')) ? ref(JSON.parse(storage.getItem('id'))) : ref(0) 
const width = storage.getItem('listWidth') ? ref(storage.getItem('listWidth')) : ref(320)
const listaRzeczy = ref([])
const darkMode = storage.getItem('isdarkmode') ? ref(storage.getItem('isdarkmode')) : ref(false)
darkMode.value = (darkMode.value === 'true' || darkMode.value === true)
if(!storage.getItem('lista-rzeczy')){
  listaRzeczy.value = [
    {text: 'Przykładowy przedmiot', id: id.value++, zrobione: false},
    {text: 'Przykładowy zrobiony przedmiot', id: id.value++, zrobione: true}
  ]
}
else{
  listaRzeczy.value = JSON.parse(storage.getItem('lista-rzeczy'))
}
function dodaj(){
  width.value = storage.getItem('listWidth')
  document.getElementById('nazwa-rzeczy').value = ""
  if(nowy.value!='')
    listaRzeczy.value.push({text: nowy.value, id: id.value++, zrobione: false})
  nowy.value = ''
  storage.setItem('lista-rzeczy', JSON.stringify(listaRzeczy.value))
  storage.setItem('id', JSON.stringify(id.value))
}
function usun(e){
  width.value = storage.getItem('listWidth')
  listaRzeczy.value = listaRzeczy.value.filter((i) => i !== e)
  storage.setItem('lista-rzeczy', JSON.stringify(listaRzeczy.value))
}
function zrobione(rzecz){
  width.value = storage.getItem('listWidth')
  listaRzeczy.value = listaRzeczy.value.map((e) =>{
    if(e == rzecz) e.zrobione = !e.zrobione
    return e
  })
  storage.setItem('lista-rzeczy', JSON.stringify(listaRzeczy.value))
  start(elementy(), listaRzeczy, storage, width)
}

onMounted(() => {
  start(elementy(), listaRzeczy, storage, width)
  observe(document.querySelector('ol'), storage)
})
function darkModeClick(e){
  darkMode.value=!darkMode.value
  storage.setItem('isdarkmode', darkMode.value)
}
function onMountingItem(){
  start(elementy(), listaRzeczy, storage, width)
  storage.setItem('lista-rzeczy', JSON.stringify(listaRzeczy.value))
}
</script>

<template>
  <div id="pojemnik">
    <div id="pojemnik-mode">
      <label>
        <i :class="{ 'fa-solid': true, 'fa-moon': !darkMode, 'fa-sun': darkMode }" id="ikona"></i>
        <input type="checkbox" id="mode" placeholder="zmiana motywu" @click="darkModeClick" :checked="darkMode">
      </label>
    </div>
    <form @submit.prevent="dodaj">
      <label>
        <div class="label">Nowy przedmiot</div>
        <input type="text" placeholder="Dodaj..." v-model="nowy" id="nazwa-rzeczy">
      </label>
      <button type="submit">Dodaj</button>
    </form>
    <ListaRzeczy :lista="listaRzeczy" :width="width" @usun="usun" @zrobione="zrobione" @mount="onMountingItem"></ListaRzeczy>
  </div>
</template>

<style scoped>
#pojemnik-mode{
  position: fixed;
  top: 1rem;
  left: 100%;
  transform: translateX(calc(-100% - 1rem));
}
#mode{
  position: absolute;
  display: none;
}
#pojemnik{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
form{
  display: flex;
  justify-content: space-around;
  width: 20rem;
}
form label{
  display: flex;
  position: relative;
}
form label .label{
  font-size: .9rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: calc(.5rem + 1px);
  pointer-events: none;
  transition: .5s;
  color: gray;
}
input{
  padding-left: .5rem;
  padding-top: calc(.7rem + .1rem);
  outline: none;
  border-radius: 0;
  border: 1px var(--border-color) solid;
  background-color: var(--background-color);
  color: var(--color);
}
input::placeholder{
  color: transparent;
}
form label:has(:focus) .label, form label:has(input:not(:placeholder-shown)) .label{
  top: .5rem;
  font-size: .7rem;
  color: var(--label-focus-color);
}
</style>
