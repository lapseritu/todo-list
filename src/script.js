export const elementy = () => { return document.querySelectorAll('li') }
export const start = (e, listaRzeczy, storage) => {e.forEach((i) => { draggable(i, listaRzeczy, storage) })}
let source
function draggable(element, listaRzeczy, storage){
    function dragStart(e){
        element.classList.add('active-drag')
        source = this
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/html', this.innerHTML)
    }
    function dragEnd(e){
        element.classList.remove('active-drag')
        elementy().forEach((i) => {i.classList.remove('drag-over')})
    }
    function dragOver(e){
        e.preventDefault()
        return false
    }
    function dragEnter(e){
        this.classList.add('drag-over')
    }
    function dragLeave(e){
        this.classList.remove('drag-over')
    }
    function drop(e){
        e.stopPropagation()
        const index1 = listaRzeczy.value.findIndex((e) => e.id == source.attributes['data-id'].value)
        const index2 = listaRzeczy.value.findIndex((e) => e.id == this.attributes['data-id'].value)
        const zapas = listaRzeczy.value[index1]
        listaRzeczy.value[index1] = listaRzeczy.value[index2]
        listaRzeczy.value[index2] = zapas
        storage.setItem('lista-rzeczy', JSON.stringify(listaRzeczy.value))
        return false
    }
    element.addEventListener('dragstart', dragStart)
    element.addEventListener('dragend', dragEnd)
    element.addEventListener('dragenter', dragEnter)
    element.addEventListener('dragover', dragOver)
    element.addEventListener('dragleave', dragLeave)
    element.addEventListener('drop', drop)
}

export default start