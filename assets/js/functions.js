/**
 * Função para Trazer a lista de tarefas que esta quardada no localStorage ou um array vazio.
 * @returns {[]}
 */
function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || []
}
/**
 * Função para carregar a lista de tasks no html, carrega um li para cada task, caso lista esteja vazia,
 * adiciona um paragrafo e a class empty para formatar o conteudo do paragrafo
 * @param {array} tasks 
 * @returns 
 */
function loadTasksToView(tasks) {
    const ulTasks = document.querySelector('#taskList')
    ulTasks.innerHTML = ''
    if (tasks.length === 0) {
        ulTasks.classList.add('empty')
        ulTasks.innerHTML = '<p>Lista de Tarefas vazia.</p>'
        return
    }
    if (ulTasks.classList.contains('empty')) {
        ulTasks.classList.remove('empty')
    }
    tasks.forEach((item, i) => {
        const li = makeItem(item, i)
        ulTasks.appendChild(li)
    })
}
/**
 * Função para montar o li com os dados da task, recebe o item e o indice do item
 * @param {Object} item 
 * @param {Number} i 
 * @returns 
 */
function makeItem(item, i) {
    const liItem = createElementTasks('li')
    const pItem = createElementTasks('p')
    const imgItemCheck = createElementTasks('img', 'check')
    const imgItemDelete = createElementTasks('img', 'delete')
    const imgItemEditar = createElementTasks('img', 'edit')

    imgItemDelete.setAttribute('onclick', `confirmExclusão('${item.description}', ${i})`)
    imgItemDelete.setAttribute('title', 'Deletar Item')
    imgItemEditar.setAttribute('onclick', `editarItem(${i})`)
    imgItemEditar.setAttribute('title', 'Editar Item')
    pItem.setAttribute('onclick', `markAsDone(${i})`)
    pItem.setAttribute('title', 'Marcar Tarefa como Concluida')
    imgItemCheck.setAttribute('title', 'Marcar Tarefa como Concluida')
    imgItemCheck.setAttribute('onclick', `markAsDone(${i})`)
    if (item.isDone) {
        pItem.classList.add('done')
        pItem.setAttribute('title', 'Desmarcar Tarefa')
        imgItemCheck.setAttribute('src', 'assets/img/done.svg')
        imgItemCheck.setAttribute('title', 'Desmarcar Tarefa')
    }
    pItem.innerHTML = item.description
    liItem.appendChild(imgItemCheck)
    liItem.appendChild(pItem)
    liItem.appendChild(imgItemEditar)
    liItem.appendChild(imgItemDelete)
    return liItem
}
/**
 * Função para editar um item, recebe a posição do item no array de tasks, remove o item do array e inseri o texto no input para ser editado.
 * @param {Number} id 
 * @returns 
 */
function editarItem(id) {
    if (document.querySelector('#task').getAttribute('editando')) {
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
/**
 * Função para deletar um item do array de tasks, recebe a posição do item no array, e remove o item e salva o array novamente
 * @param {Number} id 
 * @returns 
 */
function confirmExclusão(description, id){
    let alert = `<div class="confirm">
                <p>Deseja Realmente excluir a tarefa "${description}"?</p>
                <div class="btns">
                    <button id="cancel" onclick="return false">Cancelar</button>
                    <button id="confirm" onclick="return true">Sim</button>
                </div>
            </div>`
    let overlay = document.querySelector('.overlay')
    overlay.style = 'display: flex;'
    overlay.innerHTML = alert
    let btnCancelar = document.querySelector('#cancel')
    let btnConfirm = document.querySelector('#confirm')
    btnCancelar.addEventListener('click', ()=>{
        clearMensage(overlay)
        return false
    })
    btnConfirm.addEventListener('click', ()=> {
        clearMensage(overlay)
        deleteItem(id)
    })
}
function clearMensage(obj){
    obj.style = 'display: none;'
    obj.innerHTML = ''
}
function deleteItem(id) {
    if (document.querySelector('#task').getAttribute('editando')) {
        showAlert('Termine de editar o item antes de fazer outra ação.', 'error')
        document.querySelector('#task').focus()
        return
    }
    const tasks = getTasks()
    tasks.splice(id, 1)
    saveTasks(tasks)
    loadTasksToView(getTasks())
    showAlert('Tarefa deletada com sucesso.', 'success', 3000)
}
/**
 * Função para marcar como concluido ou desmarcar, recebe a posição do item no array muda o atributo isDone e salva novamente.
 * @param {Number} id 
 */
function markAsDone(id) {    
    if(document.querySelector('.barra')) return
    const tasks = getTasks()
    if (tasks[id].isDone) {
        tasks[id].isDone = false
        showAlert('Marcada como "Não Concluida".', 'success', 3000)
    } else {
        tasks[id].isDone = true
        showAlert('Marcada como "Concluida".', 'success', 3000)
    }
    saveTasks(tasks)
    loadTasksToView(getTasks())
}
/**
 * Função para criar um elemento, recebe dois parametros o primeiro é o nome da tag o segundo é opcional que é o nome da class,
 * caso seja uma tag img a imagem precisa tem o mesmo nome da classe e deve estar na pasta assets/img/{nomedaimag}.svg, e a extenção deve ser svg.
 * @param {string} tag 
 * @param {string} classElement 
 * @returns 
 */
function createElementTasks(tag, classElement = '') {
    const element = document.createElement(tag)
    if (classElement == '') {
        return element
    }
    if (tag == 'img') {
        element.setAttribute('src', `assets/img/${classElement}.svg`)
    }
    element.classList.add(classElement)
    return element
}
/**
 * Função para adicionar uma task a lista de tasks e salvar, recebe um objeto por parametro.
 * @param {Object} task 
 */
function insertTask(task) {
    const tasks = getTasks()
    tasks.push(task)
    saveTasks(tasks)
}
/**
 * Função para salvar um array de tasks no localStorage.
 * @param {array} tasks 
 */
function saveTasks(tasks = []) {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
/**
 * Função para mostrar alertas na tela, recebe a mensagem, o nome da class CSS a ser aplicada e opcionalmente o tempo para parar o alerta.
 * @param {string} message 
 * @param {string} classMessage 
 * @param {Number} time 
 */

function showAlert(message, classMessage = 'success', time = 5000) {    
    // para não sobrepor mensagens
    if(document.querySelector('.barra')) return
    document.querySelector('.overlay').style.display = 'flex'
    const divAlert = document.querySelector('#alert')
    const progress = document.createElement('div')
    const pMessage = document.createElement('p')
    
    progress.classList.add('barra')
    progress.style = `animation-duration: ${(time / 1000) + 0.5 }s;`
    divAlert.classList.add(classMessage)
    if (message === '') {
        message = 'Erro: Algum erro ocorreu.'
    }
    pMessage.innerText = message
    divAlert.appendChild(pMessage)
    divAlert.appendChild(progress)
    setTimeout(function () {
        document.querySelector('.overlay').style.display = 'none'
        divAlert.classList.remove(classMessage)
        divAlert.innerHTML = ''
    }, time)
}