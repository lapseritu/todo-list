<script setup>
import { ref, onMounted, computed } from 'vue';
import Rzecz from './Rzecz.vue';
const props = defineProps({
    lista: Object,
    width: String
})
const emit = defineEmits(['usun', 'zrobione', 'mount'])
function usun(rzecz){
  emit("usun", rzecz)
}

const width2 = computed(()=>parseInt(props.width)+2+"px") //Szerokość + 2 piksele obramowania + px
</script>

<template>
  <ol :style="{ width: width2 }">
    <li v-if="lista.length === 0" class="empty">Brak przedmiotów na liście</li>
    <li v-for="rzecz in lista" :key="rzecz.id" draggable="true" :data-id="rzecz.id">
      <Rzecz :przedmiot="rzecz" @usun="emit('usun', rzecz)" @zrobione="(rzecz) => emit('zrobione', rzecz)" @mount="(e)=>{emit('mount', e)}"></Rzecz>
    </li>
  </ol>
</template>

<style scoped>
ol{
    min-width: 20rem;
    max-width: 20rem;
    width: 20rem;
    display: flex;
    flex-direction: column;
    padding: 0;
    overflow: hidden;
    resize: none;
    border: solid 1px var(--border-color);
    border-top: none;
}
li{
    display: flex;
    padding: 1rem;
    border-top: solid 1px var(--border-color);
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    position: relative;
    order: 1;
}
.empty{
    color: #808080;
    justify-content: center;
    background-color: var(--zrobione);
}
li:has(.zrobione){
    background-color: var(--zrobione);
    order:2;
}
@media screen and (min-width: 700px) {
  ol{
    resize: horizontal;
    max-width: 100%;
  }    
}
</style>