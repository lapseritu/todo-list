<script setup>
import { ref, onMounted } from 'vue';
import ListaRzeczy from './components/ListaRzeczy.vue'
import { elementy, start, observe } from './script'

const nowy = ref('')
const storage = localStorage
const id = (storage.getItem('id')) ? ref(JSON.parse(storage.getItem('id'))) : ref(0) 
const width = storage.getItem('listWidth') ? ref(storage.getItem('listWidth')) : ref(320)
const listaRzeczy = ref([])
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

function onMountingItem(){
  start(elementy(), listaRzeczy, storage, width)
  storage.setItem('lista-rzeczy', JSON.stringify(listaRzeczy.value))
}
</script>

<template>
  <div id="pojemnik">
    <form @submit.prevent="dodaj">
      <input type="text" placeholder="Dodaj..." v-model="nowy" id="nazwa-rzeczy">
      <button type="submit">Dodaj</button>
    </form>
    <ListaRzeczy :lista="listaRzeczy" :width="width" @usun="usun" @zrobione="zrobione" @mount="onMountingItem"></ListaRzeczy>
  </div>
</template>

<style scoped>
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

input{
  outline: none;
}
</style>
