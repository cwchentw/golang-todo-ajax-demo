let baseURL = 'http://localhost:8080';

document.addEventListener('DOMContentLoaded', function () {
    (function () {
        let form = document.querySelector('form');

        let input = form.querySelector('input');

        input.addEventListener('keydown', function (ev) {
            if (ev.which === 13) {
                ev.preventDefault();

                createTODO();
            }
        }, false);

        let btn = form.querySelector('button');

        btn.addEventListener('click', function (ev) {
            ev.preventDefault();

            createTODO();
        }, false);

        function createTODO() {
            let item = input.value;

            superagent
                .post(`${baseURL}/todo/`)
                .send({
                    item: item,
                    index: 0
                })
                .set('accept', 'json')
                .then(function (res) {
                    clearMessage();

                    console.log(res.body);

                    addTODO(res.body);
                    input.value = '';
                })
                .catch(function (err) {
                    if (err.response) {
                        showMessage(err.response.message);
                    }
                });
        }
    })();

    document.addEventListener('keydown', function (event) {
        if (event.which === 27) {
            let todos = document.getElementsByClassName('todo');

            for (let i = 0; i < todos.length; i++) {
                let label = todos[i].querySelector('label');
                let inputTODO = todos[i].querySelector('[name="index"]');
                let indexTODO = inputTODO.value;

                if (!label) {
                    let input = todos[i].querySelector('input');

                    let text = input.value;

                    let label = document.createElement('label');

                    label.classList.add('col-form-label');
                    label.innerText = text;

                    label.addEventListener('click', function () {
                        loadItem(indexTODO);
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
    });

    superagent
        .get(`${baseURL}/todos/`)
        .set('accept', 'json')
        .then(function (res) {
            clearMessage();

            let ts = res.body.todos;

            console.log(ts);

            for (let i = 0; i < ts.length; i++) {
                addTODO(ts[i]);
            }
        })
        .catch(function (err) {
            if (err.reponse) {
                showMessage(err.reponse.message);
            }
        });
});

function addTODO(todo) {
    let item = todo.item;
    let index = todo.index;

    let label = document.createElement('label');

    label.classList.add('col-form-label');
    label.innerText = item;

    label.addEventListener('click', function () {
        loadItem(index);
    });

    let input = document.createElement('input');

    input.name = 'index';
    input.setAttribute('value', index);
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
    btnUpdate.addEventListener('click', function (ev) {
        ev.preventDefault();

        let item;
        let index;

        let form = btnUpdate.parentNode.parentNode.parentNode;

        let todo = form.querySelector('.todo');

        let label = todo.querySelector('label');

        if (label) {
            item = label.innerText;
        } else {
            let _input = todo.querySelector('input');

            item = _input.value;
        }

        index = todo.querySelector('[name="index"]').getAttribute('value');

        console.log({
            item: item,
            index: Number(index)
        });

        superagent
            .put(`${baseURL}/todo/`)
            .send({
                item: item,
                index: Number(index)
            })
            .set('accept', 'json')
            .then(function (res) {
                clearMessage();

                let form = btnUpdate.parentNode.parentNode.parentNode;

                let todo = form.querySelector('.todo');
                let inputTODO = todo.querySelector('[name="index"]');
                let indexTODO = inputTODO.value;

                let item = res.body.item;
                let index = res.body.index;

                let _label = document.createElement('label');

                _label.classList.add('col-form-label');
                _label.innerText = item;

                _label.addEventListener('click', function () {
                    loadItem(indexTODO);
                });

                let inputIndex = document.createElement('input');

                inputIndex.setAttribute('value', index);
                inputIndex.name = 'index'
                inputIndex.setAttribute('hidden', true);

                todo.innerHTML = '';
                todo.appendChild(_label);
                todo.appendChild(inputIndex);
            })
            .catch(function (err) {
                if (err.response) {
                    showMessage(err.response.message);
                }
            });
    }, false);

    btnUpdate.classList.add('btn');
    btnUpdate.classList.add('btn-secondary');

    let btnDelete = document.createElement('button');

    btnDelete.innerText = 'Delete';
    btnDelete.type = 'submit';
    btnDelete.name = '_method';
    btnDelete.value = 'delete';
    btnDelete.addEventListener('click', function (ev) {
        ev.preventDefault();

        let item;
        let index;

        let form = btnUpdate.parentNode.parentNode.parentNode;

        let todo = form.querySelector('.todo');

        let label = todo.querySelector('label');

        if (label) {
            item = label.innerText;
        } else {
            let _input = todo.querySelector('input');

            item = _input.value;
        }

        index = todo.querySelector('[name="index"]').getAttribute('value');

        console.log({
            item: item,
            index: Number(index)
        });

        superagent
            .delete(`${baseURL}/todo/`)
            .send({
                item: item,
                index: Number(index)
            })
            .set('accept', 'json')
            .then(function (res) {
                clearMessage();

                let form = btnUpdate.parentNode.parentNode.parentNode;

                form.parentNode.removeChild(form);
            })
            .catch(function (err) {
                if (err.response) {
                    showMessage(err.response.message);
                }
            });
    }, false);

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

    let todoList = document.getElementById('todos');
    todoList.appendChild(form);
}

function loadItem(index) {
    let todos = document.getElementsByClassName('todo');

    for (let i = 0; i < todos.length; i++) {
        let label = todos[i].querySelector('label');
        let inputTODO = todos[i].querySelector('[name="index"]');
        let indexTODO = inputTODO.value;

        if (Number(indexTODO) === Number(index)) {
            if (label) {
                console.log('Convert label to input');

                let text = label.innerText;

                let input = document.createElement('input');

                input.classList.add('form-control');
                input.name = 'todo';
                input.setAttribute('value', text);

                input.addEventListener('keydown', function (event) {
                    if (event.which === 13 || event.which === 27) {
                        let form = event.target.parentNode.parentNode.parentNode;

                        let todo = form.querySelector('.todo');

                        let _input = todo.querySelector('input');

                        let item = _input.value;
                        let index = todo.querySelector('[name="index"]').getAttribute('value');

                        console.log({
                            item: item,
                            index: Number(index)
                        });

                        superagent
                            .put(`${baseURL}/todo/`)
                            .send({
                                item: item,
                                index: Number(index)
                            })
                            .set('accept', 'json')
                            .then(function (res) {
                                clearMessage();

                                let form = btnUpdate.parentNode.parentNode.parentNode;

                                let _todo = form.querySelector('.todo');
                                let _inputTODO = todo.querySelector('[name="index"]');
                                let _indexTODO = inputTODO.value;

                                let item = res.body.item;
                                let index = res.body.index;

                                let _label = document.createElement('label');

                                _label.classList.add('col-form-label');
                                _label.innerText = item;

                                _label.addEventListener('click', function () {
                                    loadItem(_indexTODO);
                                });

                                let inputIndex = document.createElement('input');

                                inputIndex.setAttribute('value', index);
                                inputIndex.name = 'index'
                                inputIndex.setAttribute('hidden', true);

                                _todo.innerHTML = '';
                                _todo.appendChild(_label);
                                _todo.appendChild(inputIndex);
                            })
                            .catch(function (err) {
                                if (err.response) {
                                    showMessage(err.response.message);
                                }
                            });
                    }
                });

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

                let text = input.getAttribute('value');

                let label = document.createElement('label');
                let inputTODO = todos[i].querySelector('[name="index"]');
                let indexTODO = inputTODO.value;

                label.classList.add('col-form-label');
                label.innerText = text;

                label.addEventListener('click', function () {
                    loadItem(indexTODO);
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

function showMessage(msg) {
    let div = document.createElement('div');

    div.classList.add('alert');
    div.classList.add('alert-warning');
    div.setAttribute('role', 'alert');

    div.innerText = msg;

    let message = document.getElementById('message');

    message.innerHTML = '';
    message.appendChild(div);
}

function clearMessage() {
    let message = document.getElementById('message');

    message.innerHTML = '';
}