function getTasks(){
    return JSON.parse(localStorage.getItem('tasks')) || []
}
function loadTasksToView(tasks){
    const ulTasks = document.querySelector('#taskList')
    ulTasks.innerHTML = ''
    if(tasks.length === 0 ){
        ulTasks.classList.add('empty')
        ulTasks.innerHTML = '<p>Lista de Tarefas vazia.</p>'
        return
    }
    if(ulTasks.classList.contains('empty')){
        ulTasks.classList.remove('empty')
    }
    tasks.forEach((item, i)=>{
        const liItem = createElementTasks('li')
        const pItem = createElementTasks('p')
        const imgItemCheck = createElementTasks('img', 'check')
        const imgItemDelete = createElementTasks('img', 'delete')
        imgItemDelete.setAttribute('onclick', `deleteItem(${i})`)
        pItem.setAttribute('onclick', `markAsDone(${i})`)
        imgItemCheck.setAttribute('onclick', `markAsDone(${i})`)
        if(item.isDone) {
            pItem.classList.add('done')
            imgItemCheck.setAttribute('src', 'assets/img/done.svg')
        }
        pItem.innerHTML = item.description
        liItem.appendChild(imgItemCheck)
        liItem.appendChild(pItem)
        liItem.appendChild(imgItemDelete)
        ulTasks.appendChild(liItem)
    })
}
function deleteItem(id){
    const tasks = getTasks()
    tasks.splice(id, 1)
    saveTasks(tasks)
    loadTasksToView(getTasks())
}
function markAsDone(id){
    const tasks = getTasks()
    tasks[id].isDone = !tasks[id].isDone || false
    saveTasks(tasks)
    loadTasksToView(getTasks())
}
function createElementTasks(tag, classElement = '') {
    const element = document.createElement(tag)
    if(classElement == '') {
        return element
    }
    if(tag == 'img') {
        element.setAttribute('src', `assets/img/${classElement}.svg`)
    }
    element.classList.add(classElement)
    return element
}
function insertTask(task) {
    const tasks = getTasks()
    tasks.push(task)
    saveTasks(tasks)
}
function saveTasks(tasks = []) {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
function showAlert(message, classMessage = 'success', time = 5000) {
    const divAlert = document.querySelector('#alert')
    divAlert.classList.add(classMessage)
    divAlert. innerHTML = message
    setTimeout(function(){
        divAlert.innerHTML = ''
        divAlert.classList.remove(classMessage)
    }, time)    
}