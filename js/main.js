// import { Country, State, City }  from '../node_modules/country-state-city';

const user_name = document.querySelector('#name');
const user_email = document.querySelector('#email');
const user_dob = document.querySelector('#dob');
const user_gender = document.querySelector('#gender');
const user_hobby = document.querySelector('#hobby');
const user_country = document.querySelector('#country');
const user_state = document.querySelector('#state');
const user_city = document.querySelector('#city');

const add_btn = document.querySelector('.add-task-button');
const todos_list = document.querySelector('.todos-list');
const table_body = document.querySelector('.table-body');
const alert_message = document.querySelector('.alert-message');
const delete_all_btn = document.querySelector('.delete-all-btn');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

window.addEventListener('DOMContentLoaded', showAllTodos);

//get random unique id
function getRandomId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function addToDo(task_input) {
    let task = {
        id: getRandomId(),
        // task: task_input.value,
        task: {
            name: user_name.value,
            email: user_email.value, 
            dob: user_dob.value,
            gender: user_gender.value,
            hobby : user_hobby.value,
            country: user_country.value,
            state: user_state.value,
            city: user_city.value
        },
        completed: false
    }
    todos.push(task);
    console.log(task.name);
}

user_name.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && user_name.value.length > 0) {
        addToDo(user_name);
        saveToLocalStorage();
        user_name.value = '';
        user_email.value ='';
        user_dob.value = '';
        user_gender.value = '';
        user_hobby.value = '';
        user_country.value ='';
        user_state.value ='';
        user_city.value ='';
        showAllTodos();
    }
});

add_btn.addEventListener('click', () => {
    if (user_name.value === '' || user_email.value === '') {
        showAlertMessage('Please enter a task', 'error');
    } else {
        addToDo(user_name);
        saveToLocalStorage();
        showAllTodos();
        user_name.value = '';
        user_email.value ='';
        user_dob.value = '';
        user_gender.value = '';
        user_hobby.value = '';
        user_country.value ='';
        user_state.value ='';
        user_city.value ='';
        showAlertMessage('Task added successfully', 'success');
    }
});

delete_all_btn.addEventListener('click', clearAllTodos);

//show all todos
function showAllTodos() {
    todos_list.innerHTML = '';
    table_body.innerHTML = '';
    todos.forEach((todo) => {
        // todos_list.innerHTML += `
        //     <li class="todo-item" data-id="${todo.id}">
        //         <p class="task-body">
        //             ${todo.task.name}
        //         </p>
        //         <p class="task-body">
        //             ${todo.task.email}
        //         </p>
        //         <div class="todo-actions">
        //             <button class="btn btn-success" onclick="editTodo('${todo.id}')">
        //                 <i class="bx bx-edit-alt bx-sm"></i>    
        //             </button>
        //             <button class="btn btn-error" onclick="deleteTodo('${todo.id}')">
        //                 <i class="bx bx-trash bx-sm"></i>
        //             </button>
        //         </div>
        //     </li>
        // `;
        table_body.innerHTML += `
            <tr>
                <td style={color: '#4361EE'}>${todo.task.name}</td>
                <td>${todo.task.email}</td>
                <td>${todo.task.dob}</td>
                <td>${todo.task.gender}</td>
                <td>${todo.task.hobby}</td>
                <td>${todo.task.country}</td>
                <td>${todo.task.state}</td>
                <td>${todo.task.city}</td>
                <td>
                    <button class="btn btn-success" onclick="editTodo('${todo.id}')">
                        <i class="bx bx-edit-alt bx-sm"></i>    
                    </button>
                </td>
                <td>
                    <button class="btn btn-error" onclick="deleteTodo('${todo.id}')">
                        <i class="bx bx-trash bx-sm"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}

//save todos to local storage
function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

//show alert message
function showAlertMessage(message, type) {
    let alert_box = `
        <div class="alert alert-${type} shadow-lg mb-5 w-full">
            <div>
                <span>
                    ${message}
                </span>
            </div>
        </div>
    `
    alert_message.innerHTML = alert_box;
    alert_message.classList.remove('hide');
    alert_message.classList.add('show');
    setTimeout(() => {
        alert_message.classList.remove('show');
        alert_message.classList.add('hide');
    }, 3000);
}

//delete todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveToLocalStorage();
    showAlertMessage('Todo deleted successfully', 'success');
    showAllTodos();
}

//edit todo
function editTodo(id) {
    let todo = todos.find(todo => todo.id === id);
    user_name.value = todo.task.name;
    user_email.value = todo.task.email;
    todos = todos.filter(todo => todo.id !== id);
    add_btn.innerHTML = "<i class='bx bx-check bx-sm'></i>";
    saveToLocalStorage();
    add_btn.addEventListener('click', () => {
        add_btn.innerHTML = "<i class='bx bx-plus bx-sm'></i>"; 
        showAlertMessage('Todo updated successfully', 'success');
    });
}

//clear all todos
function clearAllTodos() {
    if(todos.length > 0) {
        todos = [];
        saveToLocalStorage();
        showAlertMessage('All todos cleared successfully', 'success');
        showAllTodos();
    }else{
        showAlertMessage('No todos to clear', 'error');
    }
}

{/* <tr>
<td style={{color: '#4361EE'}}>{order.id}</td>
<td>{order.table}</td>
<td>{order.name}</td>
<td>{type}</td>
<td className='status'>{status}</td>
<td>{payment}</td>
<td>{time}</td>
<td>{view}</td>
</tr> */}