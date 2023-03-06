<script setup>
import { onMounted } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
library.add(faMinus)

const props = defineProps({
    przedmiot: Object
})
const emit = defineEmits(['usun', 'zrobione', 'mount'])
onMounted(()=>{
    emit('mount', 'mount')
})
</script>

<template>
    <label :class="{'tekst-przedmiotu': true, 'zrobione': przedmiot.zrobione}">
        <input class="czy-zrobione" type="checkbox" @click="emit('zrobione', przedmiot)" :checked="przedmiot.zrobione">
        {{ przedmiot.text }}
    </label>
    <div>
        <button @click="(e) => emit('usun', '')" class="przycisk-usun"><font-awesome-icon icon="fa-solid fa-minus" /></button>
    </div>
</template>

<style scoped>
.tekst-przedmiotu{
    overflow-wrap: anywhere;
    font-weight: 600;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}
.zrobione{
    text-decoration: line-through;
    font-weight: 100;
}
label{
    display: flex;
}
.czy-zrobione{
    margin-right: .5rem;
}

label::after{
    width: 100%;
    height: 100%;
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    cursor: pointer;
}
.przycisk-usun{
    z-index: 2;
    position: relative;
}
</style>