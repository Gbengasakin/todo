const form = document.querySelector('.task-form');
const taskList = document.querySelector('.collection');
const taskInput= document.querySelector('#add-task');
const filter = document.querySelector('#filter')

// load all event listeners
loadEventListener();

//load all event listener
function loadEventListener(){
	//DOM load event 
	document.addEventListener('DOMContentLoaded', getTasks);
	form.addEventListener('submit', addTask);
	taskList.addEventListener('click', removeTask);
	filter.addEventListener('keyup', filterTask)

}
function getTasks(){
	let tasks;
	if (localStorage.getItem('todo') === null) {
		tasks = [];
	}else{
		tasks = JSON.parse(localStorage.getItem('todo'));

	}
	tasks.forEach(function(task){
		const li = document.createElement('li');
	//add class
	li.className = 'list'
	//create text node then append to li
	li.appendChild(document.createTextNode(task));
	const link = document.createElement('a');
	link.className = 'link delete';
	link.innerHTML = '<i class="fa fa-trash"></i>';
	li.appendChild(link);
	taskList.appendChild(li);
	})

}
function addTask(e){
	if (taskInput.value === '') {
		alert("add a task");
	}
	//create li element;
	const li = document.createElement('li');
	//add class
	li.className = 'list'
	//create text node then append to li
	li.appendChild(document.createTextNode(taskInput.value));
	const link = document.createElement('a');
	link.className = 'link delete';
	link.innerHTML = '<i class="fa fa-trash"></i>';
	li.appendChild(link);
	taskList.appendChild(li);
	//store in LS
	storeTaskInLocalStorage(taskInput.value);
		//clear input
	taskInput.value ='';

	e.preventDefault();
	console.log(taskList);
}

function removeTask(e){
	if (e.target.parentElement.classList.contains('fa-trash')) 
	{
	// if (confirm("are you sure")) {
		e.target.parentElement.parentElement.parentElement.remove();
		//remove from local storage
		removeTaskFromLocalStorage(e.target.parentElement.parentElement.parentElement);


	// }
}
}
function removeTaskFromLocalStorage(item){
	let tasks;
	if (localStorage.getItem('todo') === null) {
		tasks = [];
	}else{
		tasks = JSON.parse(localStorage.getItem('todo'));
	}
		tasks.forEach(function(task, index){
				if (item.textContent === task) {
					tasks.splice(index, 1)
				}
			});
			localStorage.setItem('todo', JSON.stringify(tasks));
}


function storeTaskInLocalStorage(task){
	let tasks;
	if (localStorage.getItem('todo') === null) {
		tasks = [];
	}else{
		tasks = JSON.parse(localStorage.getItem('todo'));

	}
	tasks.push(task);
	localStorage.setItem('todo', JSON.stringify(tasks))
}
function filterTask(e){
	const text = e.target.value.toLowerCase();
	document.querySelectorAll('.list').forEach
	(function(task){
		const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = 'flex';
		}else{
			task.style.display = 'none';
		}
	})
}
