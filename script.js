
// Cookies Code 

let setCookies = (name, value, expireDate) => {
    let date = new Date();
    date.setTime(date.getTime() + (expireDate * 24 * 60 * 60 * 1000));

    let exDate = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${exDate};path=/`;
};

let getCookie = cname => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


let checkCookies = () => {
    if (getCookie('name') === "") {
        let name = prompt('Enter Your Name');
        setCookies('name', name, 365);
        return false;
    }
    else return true;
}



let inputField = document.querySelector("input[type='text']");
let tasksContainer = document.querySelector('.tasks');

window.onload = () => {
    if (!checkCookies()) {
        checkCookies();
        let heading = document.querySelector('h1');
        heading.textContent = `Hello ${getCookie('name')}`
    }
    if (localStorage.counter == "NaN" || localStorage.counter === undefined) {
        localStorage.counter = 0;
        console.log('counter has been made and = ' + localStorage.counter);
    } else {
        console.log('counter exist and equal ' + localStorage.counter);
    }
}

// change the heading of the page 
let heading = document.querySelector('h1');
heading.textContent = `Hello ${getCookie('name')}`
// add the tasks to the html content
for (let index = 0; index < localStorage.counter; index++) {
    if (localStorage[`task${index}`] === undefined) continue;
    createTask(index);
}

document.querySelector('button').onclick = () => {
    // add the new task
    if (inputField.value !== null && inputField.value !== "") {
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
    }else{
        alert("put a task , not empty string dumb ass");
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
        let paragraph = document.querySelectorAll('.task p');
        for (let index = 0; index < tasksContainer.children.length; index++) {
            if (tasksContainer.children[index] === ele.target.parentElement) {
                for (let i = 0; i < localStorage.counter; i++) {
                    if (localStorage[`task${i}`] === undefined || localStorage[`task${i}`] === null) {
                        continue;
                    } else if (localStorage[`task${i}`] === paragraph[index].textContent) {
                        localStorage.removeItem(`task${i}`);
                    }
                }
                console.log(localStorage[`task${index}`]);
            }
        }
        // remove the task
        ele.target.parentElement.remove();
    }
})

