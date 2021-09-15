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
        const imgItemEditar = createElementTasks('img', 'edit')
        imgItemDelete.setAttribute('onclick', `deleteItem(${i})`)
        imgItemDelete.setAttribute('title', 'Deletar Item')
        imgItemEditar.setAttribute('onclick', `editarItem(${i})`)
        imgItemEditar.setAttribute('title', 'Editar Item')
        pItem.setAttribute('onclick', `markAsDone(${i})`)
        pItem.setAttribute('title', 'Marcar tarefa')
        imgItemCheck.setAttribute('onclick', `markAsDone(${i})`)
        if(item.isDone) {
            pItem.classList.add('done')
            imgItemCheck.setAttribute('src', 'assets/img/done.svg')
        }
        pItem.innerHTML = item.description
        liItem.appendChild(imgItemCheck)
        liItem.appendChild(pItem)
        liItem.appendChild(imgItemEditar)
        liItem.appendChild(imgItemDelete)
        ulTasks.appendChild(liItem)
    })
}
function editarItem(id){
    if (document.querySelector('#task').getAttribute('editando')){
        showAlert('Termine de editar o item antes de fazer outra ação.', 'error')
        document.querySelector('#task').focus()
        return
    }
    const tasks = getTasks()
    item = tasks[id]
    const inputTask = document.querySelector('#task')
    inputTask.value = item.description
    inputTask.focus()
    inputTask.setAttribute('editando', true)
    tasks.splice(id, 1)
    saveTasks(tasks)
    loadTasksToView(getTasks())
}
function deleteItem(id){
    if (document.querySelector('#task').getAttribute('editando')){
        showAlert('Termine de editar o item antes de fazer outra ação.', 'error')
        document.querySelector('#task').focus()
        return
    }
    const tasks = getTasks()
    tasks.splice(id, 1)
    saveTasks(tasks)
    loadTasksToView(getTasks())
}
function markAsDone(id){
    const tasks = getTasks()
    if(tasks[id].isDone) {
        tasks[id].isDone = false
        showAlert('Não Concluida.', 'success', 5000)
    } else {        
        tasks[id].isDone = true
        showAlert('Concluida.', 'success', 5000)
    }
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