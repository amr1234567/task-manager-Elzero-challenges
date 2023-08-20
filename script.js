let inputField = document.querySelector("input[type='text']");
let tasksContainer = document.querySelector('.tasks');

// add the tasks to the html content
for (let index = 0; index < localStorage.counter; index++) {
    if (localStorage[`task${index}`] === undefined)continue;
    createTask(index);
}

document.querySelector('button').onclick = () => {
    // add the new task
    localStorage[`task${localStorage.counter}`] = inputField.value;
    localStorage.counter = parseInt(localStorage.counter) + 1;
    inputField.value = '';

    //reset the tasks
    let tasks = document.querySelectorAll('.task');
    tasks.forEach((ele) => { ele.remove() });
    //add the tasks
    for (let index = 0; index < localStorage.counter; index++) {
        if (localStorage[`task${index}`] === undefined) continue;
        createTask(index);
    }
}



function createTask(index) {
    // task container
    let taskContainer = document.createElement('div');
    taskContainer.className = `task`;

    // task value
    let taskParagraph = document.createElement('p');
    let taskContent = document.createTextNode(`${localStorage[`task${index}`]}`);
    taskParagraph.appendChild(taskContent);

    // class delete-button
    let deleteButton = document.createElement('div');
    deleteButton.className = `delete-button`;
    let deleteButtonContent = document.createTextNode(`Delete`);
    deleteButton.appendChild(deleteButtonContent);

    // add divs to task container
    taskContainer.appendChild(taskParagraph);
    taskContainer.appendChild(deleteButton);

    // add the task to the container
    tasksContainer.appendChild(taskContainer);
}


// functionality of delete button
document.addEventListener('click', (ele) => {
    // check if the element id the delete button
    if (ele.target.className === 'delete-button') {
        // remove the task from local storage
        for (let index = 0; index < tasksContainer.children.length; index++) {
            if (tasksContainer.children[index] === ele.target.parentElement) {
                localStorage.removeItem(`task${index}`);
            }
        }
        // remove the task
        ele.target.parentElement.remove();
    }
})