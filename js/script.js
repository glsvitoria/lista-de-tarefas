// 1) Temos que referenciar o input
let input = document.querySelector('input[name=tarefa]')

// 2) Temos que referenciar o button
let btn = document.querySelector('#botao')

// 3) Temos que referenciar a lista
let lista = document.querySelector('#lista')

// 4) Card
let card = document.querySelector('.card')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []

function renderizarTarefas(){
   // Limpando a lista de tarefas para que não apareça na tela duplicado os elementos
   lista.innerHTML = ''

   for(tarefa of tarefas){
      // Criar o item da lista
      let itemLista = document.createElement('li')

      // Adicionando as classes no item
      itemLista.setAttribute('class', 'list-group-item list-group-item-action d-flex justify-content-between')

      // Adicionar evento de clique no item da lista
      itemLista.ondblclick = function(){
         deletarTarefa(this)
      }

      // Texto da tarefa
      let itemTexto = document.createElement('p')
      itemTexto.innerText = tarefa
      itemTexto.setAttribute('class', 'mb-0')

      // Div com os icones de check e x
      let divIcon = document.createElement('div')
      divIcon.setAttribute('class', 'icons')

      // Icone de check
      let iconC = document.createElement('i')
      iconC.setAttribute('class', 'icon-check mr-3')

      // Colocando todos eles em seus lugares
      divIcon.appendChild(iconC)

      itemLista.appendChild(itemTexto)
      itemLista.appendChild(divIcon)

      lista.appendChild(itemLista)
   }
}

// Executando a função para renderizar as tarefas
renderizarTarefas()

/*
<li class="list-group-item list-group-item-action d-flex justify-content-between">
   <p class="mb-0">Jogar GTA5</p>
   <div class="icons">
      <i class="icon-check mr-3"></i>
      <i class="icon-x"></i>
   </div>
</li>
*/

// 1) Precisamos escutar o evento de clique no botão
btn.onclick = function(){
   // 2) Precisamos capturar o valor digitado pelo usuário no input
   let novaTarefa  = input.value

   if(novaTarefa !== ""){
      // 3) Precisamos atualizar a nova tarefa na lista (array) de tarefas e renderizar a tela novamente
      tarefas.push(novaTarefa)

      // Executando a função para renderizar as tarefas
      renderizarTarefas()

      // Limpar o input
      input.value = ''

      // Limpar mensagens de erro (spans)
      removerSpans()

      // Salva os novos dados no banco de dados
      salvarDadosNoStorage()

   } else {
      // Limpar mensagens de erro (spans)
      removerSpans()

      let span = document.createElement('span')
      span.setAttribute('class', 'alert alert-warning mb-0')

      let msg = document.createTextNode('Você precisa informar a tarefa!')

      span.append(msg)

      card.appendChild(span)
   }

   
}

function removerSpans(){
   let spans = document.querySelectorAll('span')

   for(let i = 0; i < spans.length; i++){
      card.removeChild(spans[i])
   }
}

function deletarTarefa(tar){
   // Remove a tarefa
   tarefas.splice(tarefas.indexOf(tar), 1)

   // Renderiza novamente a tela
   renderizarTarefas()

   // Salva os novos dados no banco de dados
   salvarDadosNoStorage()
}

function salvarDadosNoStorage(){
   // Todo navegador web possui esta capacidade

   // Converter em strings para armazenar
   localStorage.setItem('tarefas', JSON.stringify(tarefas)) 
}