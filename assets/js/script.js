// classe ul quando sem tarefas "empty"

const tasks = getTasks();

loadTasksToView(tasks)

let formTask = document.querySelector('#formToDo')

formTask.addEventListener('submit', function(event){
    event.preventDefault()
    const inputTask = document.querySelector('#task')
    inputTask.classList.contains('cleared')
    inputTask.classList.remove('cleared')
    if(!inputTask.value){
        showAlert('Você não adicionou uma descrição.', 'error', 5000)
        inputTask.classList.add('cleared')
        inputTask.focus()
        return
    }
    if(inputTask.getAttribute('editando')) inputTask.removeAttribute('editando')
    const task = {
        description: inputTask.value,
        isDone: false 
    }
    insertTask(task)
    showAlert('Tarefa salva com Sucesso.')
    inputTask.value = ''
    inputTask.focus()
    loadTasksToView(getTasks())
})