<script setup>
import Rzecz from './Rzecz.vue';
const props = defineProps({
    lista: Object
})
const emit = defineEmits(['usun', 'zrobione', 'mount'])
function usun(rzecz){
    emit("usun", rzecz)
}
</script>

<template>
  <ol>
    <li v-if="lista.length === 0" class="empty">Brak przedmiotów na liście</li>
    <li v-for="rzecz in lista" :key="rzecz.id" draggable="true" :data-id="rzecz.id">
      <Rzecz :przedmiot="rzecz" @usun="emit('usun', rzecz)" @zrobione="(rzecz) => emit('zrobione', rzecz)" @mount="(e)=>{emit('mount', e)}"></Rzecz>
    </li>
  </ol>
</template>

<style scoped>
ol{
    min-width: 20rem;
    max-width: 100vw;
    width: 20rem;
    display: flex;
    flex-direction: column;
    padding: 0;
    overflow: hidden;
    resize: horizontal;
    border: solid 1px black;
    border-top: none;
}
li{
    display: flex;
    padding: 1rem;
    border-top: solid 1px black;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    position: relative;
    order: 1;
}
.empty{
    color: #808080;
    justify-content: center;
    background-color: #eeeeee;
}
li:has(.zrobione){
    background-color: #f7f7f7;
    order:2;
}
</style>