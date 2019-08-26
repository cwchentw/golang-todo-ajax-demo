let baseURL = 'http://localhost:8080';

document.addEventListener('DOMContentLoaded', function () {
    superagent
        .get(`${baseURL}/todos/`)
        .set('accept', 'json')
        .then(function (res) {
            let todoList = document.getElementById('todos');

            let ts = res.body.todos;

            console.log(ts);

            for (let i = 0; i < ts.length; i++) {
                let label = document.createElement('label');

                label.classList.add('col-form-label');
                label.innerText = ts[i].item;

                label.addEventListener('click', function () {
                    loadItem(i);
                });

                let input = document.createElement('input');

                input.name = 'index';
                input.setAttribute('value', ts[i].index);
                input.setAttribute('hidden', true);

                let row = document.createElement('div');

                row.classList.add('offset-lg-1');
                row.classList.add('col-lg-8');
                row.classList.add('offset-md-1');
                row.classList.add('col-md-7');
                row.classList.add('todo');

                row.style.marginTop = '5pt';
                row.style.marginBottom = '5pt';

                row.appendChild(label);
                row.appendChild(input);

                let btnUpdate = document.createElement('button');

                btnUpdate.innerText = 'Update';
                btnUpdate.type = 'submit';
                btnUpdate.name = '_method';
                btnUpdate.value = 'update';
                btnUpdate.onclick = function (event) {
                    updateTODO(event);
                };

                btnUpdate.classList.add('btn');
                btnUpdate.classList.add('btn-secondary');

                let btnDelete = document.createElement('button');

                btnDelete.innerText = 'Delete';
                btnDelete.type = 'submit';
                btnDelete.name = '_method';
                btnDelete.value = 'delete';
                btnDelete.onclick = function (event) {
                    deleteTODO(event);
                };

                btnDelete.classList.add('btn');
                btnDelete.classList.add('btn-info');

                let rowButtons = document.createElement('div');

                rowButtons.classList.add('col-lg-3');
                rowButtons.classList.add('col-md-4');

                rowButtons.appendChild(btnUpdate);
                rowButtons.appendChild(btnDelete);

                let form = document.createElement('form');

                form.action = '/todo/';
                form.method = 'POST';

                let div = document.createElement('div');

                div.classList.add('row');

                div.appendChild(row);
                div.appendChild(rowButtons);

                form.appendChild(div);

                todoList.appendChild(form);
            }
        })
        .catch(function (err) {
            if (err.reponse) {
                let div = document.createElement('div');

                div.classList.add('alert');
                div.classList.add('alert-warning');
                div.setAttribute('role', 'alert');

                div.innerText = err.response.message;

                let message = document.getElementById('message');

                message.innerHTML = '';
                message.appendChild(div);
            }
        });

    document.addEventListener('keydown', function (event) {
        if (event.which === 27) {
            let todos = document.getElementsByClassName('todo');

            for (let i = 0; i < todos.length; i++) {
                let label = todos[i].querySelector('label');

                if (!label) {
                    let input = todos[i].querySelector('input');

                    let text = input.value;

                    let label = document.createElement('label');

                    label.classList.add('col-form-label');
                    label.innerText = text;

                    label.addEventListener('click', function () {
                        loadItem(i);
                    });

                    let index = todos[i].querySelector('[name="index"]').getAttribute('value');

                    let inputIndex = document.createElement('input');

                    inputIndex.setAttribute('value', index);
                    inputIndex.name = 'index'
                    inputIndex.setAttribute('hidden', true);

                    todos[i].innerHTML = '';
                    todos[i].appendChild(label);
                    todos[i].appendChild(inputIndex);
                }
            }
        }
    })
});

function loadItem(index) {
    let todos = document.getElementsByClassName('todo');

    for (let i = 0; i < todos.length; i++) {
        let label = todos[i].querySelector('label');

        if (i === index) {
            if (label) {
                let text = label.innerText;

                let input = document.createElement('input');

                input.classList.add('form-control');
                input.name = 'todo';
                input.value = text;

                let index = todos[i].querySelector('[name="index"]').getAttribute('value');

                console.log(todos[i].querySelector('[name="index"]'));
                console.log(`index: ${index}`);

                let inputIndex = document.createElement('input');

                inputIndex.setAttribute('value', index);
                inputIndex.name = 'index'
                inputIndex.setAttribute('hidden', true);

                todos[i].innerHTML = '';
                todos[i].appendChild(input);
                todos[i].appendChild(inputIndex);
            }
        } else {
            if (!label) {
                let input = todos[i].querySelector('input');

                let text = input.value;

                let label = document.createElement('label');

                label.classList.add('col-form-label');
                label.innerText = text;

                label.addEventListener('click', function () {
                    loadItem(i);
                });

                let index = todos[i].querySelector('[name="index"]').getAttribute('value');

                let inputIndex = document.createElement('input');

                inputIndex.setAttribute('value', index);
                inputIndex.name = 'index'
                inputIndex.setAttribute('hidden', true);

                todos[i].innerHTML = '';
                todos[i].appendChild(label);
                todos[i].appendChild(inputIndex);
            }
        }
    }
}

function updateTODO(event) {
    let form = event.target.parentNode.parentNode.parentNode;

    let todo = form.querySelector('.todo');

    let label = todo.querySelector('label');

    if (label) {
        let text = label.innerText;

        let input = document.createElement('input');

        input.classList.add('form-control');
        input.name = 'todo';
        input.value = text;

        let index = todo.querySelector('[name="index"]').getAttribute('value');

        console.log(todo.querySelector('[name="index"]'));
        console.log(`index: ${index}`);

        let inputIndex = document.createElement('input');

        inputIndex.setAttribute('value', index);
        inputIndex.name = 'index'
        inputIndex.setAttribute('hidden', true);

        todo.innerHTML = '';
        todo.appendChild(input);
        todo.appendChild(inputIndex);
    }

    form.setAttribute('_method', 'update');
    form.submit();
}

function deleteTODO(event) {
    let form = event.target.parentNode.parentNode.parentNode;

    let todo = form.querySelector('.todo');

    let label = todo.querySelector('label');

    if (label) {
        let text = label.innerText;

        let input = document.createElement('input');

        input.classList.add('form-control');
        input.name = 'todo';
        input.value = text;

        let index = todo.querySelector('[name="index"]').getAttribute('value');

        console.log(todo.querySelector('[name="index"]'));
        console.log(`index: ${index}`);

        let inputIndex = document.createElement('input');

        inputIndex.setAttribute('value', index);
        inputIndex.name = 'index'
        inputIndex.setAttribute('hidden', true);

        todo.innerHTML = '';
        todo.appendChild(input);
        todo.appendChild(inputIndex);
    }

    form.setAttribute('_method', 'delete');
    form.submit();
}