const loaderList = document.querySelector('#loaderList')
const messageInital = document.querySelector('.messageInitial')
const addTaskBtn = document.querySelector('#add-task');
const taskList = document.querySelector('#todo-list');

const imgDelete = './assets/trash.ico'
const imgDropdownButton = './assets/dropdown.ico'
const imgAdd = './assets/add.ico'


//Objetos de funções, validações e atributos de elementos
const validations = {
    checkEmpty: (title) => {
        if (!title.trim()) throw new Error('Digite algo no campo!')
    },
    checkMinLength: (title) => {
        if (title.length < 4) throw new Error('Digite algo válido');
    },
    checkMaxLength: (title) => {
        if (title.length > 50) throw new Error('Limite de caracteres atingido');
    },
    checkForScripts: (title) => {
        const pattern = /^[a-zA-Z0-9\s]+$/;
        if (!pattern.test(title)) throw new Error('Entrada inválida');
    }
};

const taskActions = {
    '.add-child': createSubTask,
    '.confirm-name-btn': subTasks,
    'input[type="checkbox"]': checkBox,
    '.dropdown-btn': dropdown
};

const subTaskConfigs = {
    input: {
        type: 'text',
        placeholder: 'Adicione o conteúdo',
        class: 'task-name-input'
    },
    button: {
        text: 'Adicionar',
        class: 'confirm-name-btn'
    },
    imgDelete: {
        src: imgDelete,
        class: 'delete-task'
    },
    childList: {
        class: 'child-list'
    }
};

const subTaskElements = {
    dropdownBtn: {
        type: 'img',
        src: imgDropdownButton,
        class: 'dropdown-btn'
    },
    checkbox: {
        type: 'checkbox'
    },
    taskDate: {
        title: '',
        class: 'date',
        onClick: 'showPopover()'
    },
    taskName: {
        type: 'text',
        text: '',
        class: 'text'
    },
    addChildBtn: {
        type: 'img',
        src: imgAdd,
        class: 'add-child',
    },
    deleteTaskBtn: {
        type: 'img',
        src: imgDelete,
        class: 'delete-task'
    },
    childList: {
        class: 'child-list'
    },
};


//Elementos Pais
function task() {

    function addTitleTask() {
        const taskText = document.querySelector('#task-input').value;

        validateAndAddTask(taskText)
        document.querySelector('#task-input').value = ''
    };

    async function validateAndAddTask(title) {
        const resultValidate = await validateTaskTitle(title);

        if (!resultValidate) {
            taskList.style.display = 'none'
            loaderList.style.display = 'flex'

            const translateTitle = titleize(title);
            createElements(translateTitle);
        };
    };

    function createElements(title) {
        const childTask = document.createElement('li');
        childTask.classList.add('child-item');

        addTaskToDOM(childTask, title);

        taskList.style.display = 'block'
        loaderList.style.display = 'none'

        return setItemsLocalStorage();
    };

    function addTaskToDOM(childTask, title) {
        const date = getDate();

        childTask.appendChild(createElement('img', subTaskElements.dropdownBtn));
        childTask.appendChild(createElement('input', subTaskElements.checkbox));
        childTask.appendChild(createElement('span', subTaskElements.taskName, title));
        childTask.appendChild(createElement('img', subTaskElements.addChildBtn));
        childTask.appendChild(createElement('img', subTaskElements.deleteTaskBtn));
        childTask.appendChild(createElement('span', subTaskElements.taskDate, date));
        childTask.appendChild(createElement('ul', subTaskElements.childList));

        return taskList.appendChild(childTask);
    };

    addTitleTask();
};


//Variavel global de referência aos elementos que serão substituidos
let referenceChild;

//Elementos filhos
function subTasks(e) {

    function addTitleTask() {
        const parentTask = e.target.parentElement;

        const taskName = parentTask.querySelector('.task-name-input').value;

        validateSubTaskTitle(taskName, parentTask);
    };

    async function validateSubTaskTitle(title, parentTask) {
        const resultValidate = await validateTaskTitle(title);

        if (!resultValidate) {
            taskList.style.display = 'none'
            loaderList.style.display = 'flex'

            removeElementsToConfirm(parentTask);

            const translateTitle = titleize(title);
            createElements(translateTitle);
        };
    };

    function removeElementsToConfirm(parentTask) {
        Array.from(parentTask.querySelectorAll('.task-name-input, .confirm-name-btn, .delete-task')).forEach(element => element.remove());

        return;
    };

    function createElements(title) {
        addTaskToDOM(title);

        taskList.style.display = 'block'
        loaderList.style.display = 'none'

        return setItemsLocalStorage();
    };

    function addTaskToDOM(title) {
        const date = getDate();

        referenceChild.appendChild(createElement('img', subTaskElements.dropdownBtn));
        referenceChild.appendChild(createElement('input', subTaskElements.checkbox));
        referenceChild.appendChild(createElement('span', subTaskElements.taskName, title));
        referenceChild.appendChild(createElement('img', subTaskElements.addChildBtn));
        referenceChild.appendChild(createElement('img', subTaskElements.deleteTaskBtn));
        referenceChild.appendChild(createElement('span', subTaskElements.taskDate, date));
        referenceChild.appendChild(createElement('ul', subTaskElements.childList));

        loaderList.style.display = 'flex'
        return referenceChild = null;
    };

    addTitleTask();
};


//Adiciona ao DOM, elementos para confirmações de valores
function createSubTask(e) {

    function referenceTask() {
        const parentTask = e.target.parentElement;

        createElements(parentTask);
    };

    function createElements(parentTask) {
        const checkForButton = document.querySelectorAll('.confirm-name-btn')

        if (checkForButton.length) {
            return
        }

        dropdownOnCreate(e)

        const childList = parentTask.querySelector('.child-list');
        const childTask = document.createElement('li');
        childTask.classList.add('child-item');

        addTaskToDOM(childTask, childList);

        return referenceChild = childTask;
    };

    function dropdownOnCreate() {
        const dropdownElement = e.target.parentElement.querySelector('.dropdown-btn');
        
        if(dropdownElement.classList.contains('show-children')) {
            dropdown(e);
        };

        return;
    };

    function addTaskToDOM(childTask, childList) {
        childTask.appendChild(createElement('input', subTaskConfigs.input));
        childTask.appendChild(createElement('button', subTaskConfigs.button));
        childTask.appendChild(createElement('img', subTaskConfigs.imgDelete));

        return childList.appendChild(childTask);
    };

    referenceTask();
};


//Funções complementares
function dropdown(e) {
    const childList = e.target.parentElement.querySelector('.child-list');
    childList.classList.toggle('show-children');

    const children = childList.querySelectorAll('li');

    for (let i = 0; i < children.length; i++) {
        children[i].classList.toggle('show-children');
    };

    const dropdown = e.target.parentElement.querySelector('.dropdown-btn');
    dropdown.classList.toggle('show-children');
};

function checkBox(e) {

    function checkBoxReference() {
        const currentCheckbox = e.target;
        const currentTask = currentCheckbox.closest("li");
        const isChecked = currentCheckbox.checked;

        checkChildCheckboxes(currentTask, isChecked);
        updateParentCheckbox(currentTask, isChecked);
    };

    function checkChildCheckboxes(task, checked) {
        const childCheckboxes = task.querySelectorAll("li input[type='checkbox']");
        childCheckboxes.forEach(checkbox => checkbox.checked = checked);
    };

    function updateParentCheckbox(task, checked) {
        const parentTask = task.parentElement.closest("li");

        if (parentTask) {
            const parentCheckbox = parentTask.querySelector("input[type='checkbox']");
            const childTasks = parentTask.querySelectorAll("li");
            let allChecked = false;
            let someChecked = false;

            for (const childTask of childTasks) {
                const childCheckbox = childTask.querySelector("input[type='checkbox']");
                if (childCheckbox.checked) {
                    someChecked = true;
                }

                allChecked = false;
            };


            updateParentCheckboxIfs(allChecked, someChecked, checked, parentCheckbox);
        };
    };

    const updateParentCheckboxIfs = (allChecked, someChecked, checked, parentCheckbox) => {
        if (allChecked) {
            parentCheckbox.indeterminate = false;
            parentCheckbox.checked = checked;
        };

        if (someChecked) {
            parentCheckbox.indeterminate = true;
            parentCheckbox.checked = false;
        }

        if (!allChecked && !someChecked) {
            parentCheckbox.indeterminate = false;
            parentCheckbox.checked = false;
        }
    };

    checkBoxReference();
}


//Realização de validações, configurações de criações e inserção de dados no localStorage
function createElement(type, config, title) {
    const element = document.createElement(type);
    if (config.class) element.classList.add(config.class);
    if (config.src) element.src = config.src;
    if (config.text) element.textContent = config.text;
    if (title) element.textContent = title;
    if (config.onClick) element.onclick = config.onClick;
    if (config.type) element.type = config.type;
    if (config.placeholder) element.placeholder = config.placeholder;

    return element;
};

const getDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `Adicionado em: ${day}/${month}/${year}`;
};

function titleize(text) {
    let wordsArray = text.trim().toLowerCase().split(" ");

    let words = wordsArray.map((word) => {
        if (word.length === 1) {
            return word.toUpperCase() + ".";
        };

        if (word.length === 2) {
            return word;
        };

        return word[0].toUpperCase() + word.slice(1);
    });

    return words.join(" ");
};

const validateTaskTitle = (title) => {
    try {
        runValidations(title);
    } catch (err) {
        showErrorMessage(err.message);
        setTimeout(hideErrorMessage, 2000);
        return err
    };
};

const runValidations = (title) => {
    Object.keys(validations).forEach((key) => {
        validations[key](title);
    });
};

const setItemsLocalStorage = () => {
    const initalizeElementPopover = taskList.querySelector('.show')

    if (initalizeElementPopover) {
        initalizeElementPopover.classList.remove('show')
    }

    localStorage.setItem('@tasklist:todo-list', JSON.stringify(taskList.innerHTML));
    setMessageInitial()
}


//Manipulando elemento para lista vazia
const setMessageInitial = () => {

    if (taskList.hasChildNodes()) {
        messageInital.style.display = 'none'
        return
    }

    return messageInital.style.display = 'flex'
}


//Dados a serem recuperados do localStorage e enseridos ao DOM
const getItemsLocalStorage = () => {
    taskList.innerHTML = JSON.parse(localStorage.getItem('@tasklist:todo-list'));
}

if (localStorage.getItem("@tasklist:todo-list")) {
    getItemsLocalStorage();
    setMessageInitial()
}


//Monitoramento de ações
addTaskBtn.addEventListener("click", () => {
    task();
});

taskList.addEventListener("click", (e) => {
    Object.entries(taskActions).forEach(([selector, action]) => {
        if (e.target.matches(selector)) {
            action(e);
        };
    });
});

document.addEventListener("keydown", (e) => {
    if (e.key === 'Enter' && document.querySelector('#task-input').value.length) {
        task();
        return
    }
});

taskList.addEventListener("keydown", (e) => {
    if (e.key === 'Enter' && e.target.parentElement.querySelector('.task-name-input').value.length) {
        subTasks(e);
        return
    }
});