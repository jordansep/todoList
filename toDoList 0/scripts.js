const form = document.querySelector('.toDoForm');
// Creamos un array para guardar los valores
const todos = [];
window.onload = ()=>{
    let itemList = document.querySelector('.tdList');
    const xStorage = localStorage.getItem('Lista').split(',')
    const storageList = xStorage.map(t => `<li>${t}<p>X</p></li>`)
    itemList.innerHTML = storageList.join('');
    render()
    eliminar()
    echo()
}

const render = ()=>{
    let itemList = document.querySelector('.tdList');
    // Recorremos el array con un map
    const todoList = todos.map(t => `<li>${t}<p>X</p></li>` )
    // Le damos el elemento a la Lista con un || join -> Transforma el objeto en un string  
    itemList.innerHTML = todoList.join('');
    localStorage.setItem('Lista', todos)
    eliminar()
    echo()
}

// Marcar como echo un elemento
const echo = ()=>{
    const elementos = document.querySelectorAll('.tdList li')
    elementos.forEach((elemento, i) =>{
        elemento.addEventListener('click', () =>{
            elemento.classList.toggle('itemChecked')
        })
    })
}

// Eliminar elementos de la lista
const eliminar = ()=>{
    const elementos = document.querySelectorAll('.tdList li p')
    elementos.forEach((elemento, i) =>{
        elemento.addEventListener('click', () =>{
            elemento.parentNode.removeChild(elemento)
            todos.splice(i, 1)
            render()
        })
    })
}
        
form.addEventListener('submit', ev =>{ 
    // Prevenimos el envio del formulario
    ev.preventDefault()
    const todo = document.querySelector('#toDoInput');
    // Guardamos el valor introducido en el input
    const todoText = todo.value;
    todo.value = ''
    const regEx = /[a-zA-Z+]( ?)./g
    if(regEx.test(todoText) !== false){
        todos.push(todoText);
    }else{
       const span = document.createElement('span')
        span.innerText = 'Debe contener texto'
    }
    // Metemos el valor en el array 'todos'
    render()
})