export const elementy = () => { return document.querySelectorAll('li:not(.started)') }
export const start = (e, listaRzeczy, storage) => {e.forEach((i) => { draggable(i, listaRzeczy, storage) })}
export const observe = (elements, storage) => {
    const observer = new ResizeObserver((elements) => { elements.forEach((e) => {storage.setItem('listWidth', e.contentRect.width)})});
    [elements].flat().forEach((e) => {
        observer.observe(e)
    })
}
const elementyWszystkie = () => { return document.querySelectorAll('li') }
let source
function draggable(element, listaRzeczy, storage){
    function dragStart(e){
        source = this
        let flaga = false
        document.querySelectorAll('li:has(.zrobione)').forEach((i) => { if(i===this){flaga = true} })
        if(flaga) return
        element.classList.add('active-drag')
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/html', this.innerHTML)
    }
    function dragEnd(e){
        element.classList.remove('active-drag')
        elementyWszystkie().forEach((i) => {i.classList.remove('drag-over')})
    }
    function dragOver(e){
        e.preventDefault()
        return false
    }
    function dragEnter(e){
        let flaga = false
        document.querySelectorAll('li:has(.zrobione)').forEach((i) => { if(i===source){flaga = true} })
        if(flaga) return
        this.classList.add('drag-over')
    }
    function dragLeave(e){
        this.classList.remove('drag-over')
    }
    function drop(e){
        let flaga = false
        document.querySelectorAll('li:has(.zrobione)').forEach((i) => { if(i===this || i===source){flaga = true} })
        if(flaga) return
        const index1 = listaRzeczy.value.findIndex((e) => e.id == source.attributes['data-id'].value)
        const index2 = listaRzeczy.value.findIndex((e) => e.id == this.attributes['data-id'].value)
        const zapas = listaRzeczy.value[index1]
        listaRzeczy.value[index1] = listaRzeczy.value[index2]
        listaRzeczy.value[index2] = zapas
        storage.setItem('lista-rzeczy', JSON.stringify(listaRzeczy.value))
        elementyWszystkie().forEach((i) => { i.classList.remove('drag-over')})
        e.stopPropagation()
        return false
    }
    element.addEventListener('dragstart', dragStart)
    element.addEventListener('dragend', dragEnd)
    element.addEventListener('dragenter', dragEnter)
    element.addEventListener('dragover', dragOver)
    element.addEventListener('dragleave', dragLeave)
    element.addEventListener('drop', drop)
    element.classList.add('started')
}


export default start