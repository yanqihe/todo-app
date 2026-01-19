document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('todo-input');
    const addButton = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    function addTodo() {
        const taskText = input.value.trim();

        if (taskText !== "") {
            const li = document.createElement('li');
            
            const span = document.createElement('span');
            span.textContent = taskText;
            
            // Toggle completed state on click
            span.addEventListener('click', function() {
                span.classList.toggle('completed');
            });
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.onclick = function() {
                todoList.removeChild(li);
            };

            li.appendChild(span);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);

            input.value = "";
            input.focus();
        }
    }

    addButton.addEventListener('click', addTodo);

    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
});