// const start = () => document.querySelectorAll('li').forEach((e) => { draggable(e) })

// function draggable(element){
//     let kursorX = 0, kursorY = 0, elementX = 0, elementY = 0, originX = 0, originY = 0
//     element.onmousedown = dragMouseDown
//     function dragMouseDown(e){
//         e = e || window.event
//         e.preventDefault()
//         originX = element.offsetLeft
//         originY = element.offsetTop
//         element.classList.add('dragged')
//         kursorX = e.clientX, kursorY = e.clientY
//         element.onmouseup = stopDrag
//         element.onmouseout = stopDrag
//         element.onmousemove = drag
//         element.style.top = originY + "px"
//         element.style.left = originX + "px"
//         elementX = originX
//         elementY = originY
//         console.log(originX, originY)
//     }
//     function drag(e){
//         e = e || window.event
//         e.preventDefault()
//         elementX = kursorX - e.clientX, elementY = kursorY - e.clientY
//         kursorX = e.clientX, kursorY = e.clientY
//         element.style.top = (element.offsetTop - elementY) + "px"
//         element.style.left = (element.offsetLeft - elementX) + "px"
//     }
//     function stopDrag(e){
//         element.classList.remove('dragged')
//         element.onmouseup = null
//         element.onmousemove = null
//         element.style.top = 0
//         element.style.left = 0
//     }
// }

// export default start