let TC = document.querySelector('.ticket-container');
let allFilters = document.querySelectorAll('.filter');
let modalVisible = false;
let selectedPriority;

function loadTickets(priority) {
    TC.innerHTML = '';

    let allTaskData = localStorage.getItem('allTasks');
    if(allTaskData !== null)
    {
        let data = JSON.parse(allTaskData);

        // if priority is selected
        if(priority)
        {
            // filter the data array accordingly
            data = data.filter(function(ticket) {
                return ticket.selectedPriority === priority;
            });
        }

        for(let i = 0; i < data.length; i++)
        {
            let ticket = generateTicket(data[i].taskId, data[i].task, data[i].selectedPriority);
            TC.appendChild(ticket);
        }
    }
}
loadTickets();

for(let i = 0; i < allFilters.length; i++) 
{
    allFilters[i].addEventListener('click', filterHandler);
}

function filterHandler(e) {
    if(e.currentTarget.classList.contains('active'))
    {
        e.currentTarget.classList.remove('active');
        loadTickets(); // loadTickets func behaves differently based on the arguments passed
    }
    else
    {
        let selectedFilter = document.querySelector('.filter.active');
        if(selectedFilter) // if a filter is already active
        {
            selectedFilter.classList.remove('active'); // deactivate it
        }
        e.currentTarget.classList.add('active');
        loadTickets(e.currentTarget.children[0].classList[0].split('-')[0]); // loadTickets with filter
    }
}

let addButton = document.querySelector('.add');

addButton.addEventListener('click', showModal);

function showModal(e) { 
    if(!modalVisible) {
        let modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `<div class="task-to-be-added" spellcheck="false" contenteditable="true" data-type="false">
            <span class="placeholder">Enter your text here</span>
        </div>
        <div class="priority-list">
            <div class="pink-modal-filter modal-filter active" tabindex="0"></div>
            <div class="blue-modal-filter modal-filter" tabindex="0"></div>
            <div class="green-modal-filter modal-filter" tabindex="0"></div>
            <div class="black-modal-filter modal-filter" tabindex="0"></div>
        </div>`;

        TC.appendChild(modal);
        selectedPriority = 'pink';
        let taskTyper = document.querySelector('.task-to-be-added');
        taskTyper.addEventListener('click', function(e) {
            if(e.currentTarget.getAttribute('data-type') === 'false') {
                e.currentTarget.innerHTML = '';
                e.currentTarget.setAttribute('data-type', 'true');
            }
        });
        
        taskTyper.addEventListener('keypress', addTicket.bind(this, taskTyper)); // when user presses enter
        
        modalVisible = true;

        let modalFilters = document.querySelectorAll('.modal-filter');
        for(let i = 0; i < modalFilters.length; i++)
        {
            modalFilters[i].addEventListener('click', selectPriority.bind(this, taskTyper));
        }
    }
}

function selectPriority(taskTyper, e) {
    let activeFilter = document.querySelector('.modal-filter.active');
    activeFilter.classList.remove('active');
    
    // update selectedPriority
    selectedPriority = e.currentTarget.classList[0].split('-')[0]; // classList Arr's 0th idx, then split by - and get 0th idx
    
    e.currentTarget.classList.add('active');

    e.currentTarget.addEventListener('keypress', function(e2) {
        addTicket(taskTyper, e2);
    });
}

function addTicket(taskTyper, e) {
    if(e.key === 'Enter' && e.shiftKey === false && taskTyper.innerText.trim() !== '')
    {
        let ticket = document.createElement('div');
        ticket.classList.add('ticket');
        let id = uid();
        let task = taskTyper.innerText;
        ticket.innerHTML = `<div class="ticket-color ticket-color-${selectedPriority}"></div>
                    <div class="ticket-id">${id}</div>
                    <div class="task">
                        ${task}
                    </div>`;
        document.querySelector('.modal').remove();
        modalVisible = false;
        ticket.addEventListener('click', function(e) {
            if(e.currentTarget.classList.contains('active'))
            {
                e.currentTarget.classList.remove('active');
            }
            else e.currentTarget.classList.add('active');
        });
        
        TC.appendChild(ticket);

        // Saving Tickets In Local Storage Of Browser
        let allTaskData = localStorage.getItem('allTasks');
        if(allTaskData == null)
        {
            let data = [{'taskId': id, 'task': task, 'selectedPriority': selectedPriority}];
            localStorage.setItem('allTasks', JSON.stringify(data));
        }
        else 
        {
            let data = JSON.parse(allTaskData); // convert to array of objs (json)
            data.push({'taskId': id, 'task': task, 'selectedPriority': selectedPriority});
            localStorage.setItem('allTasks', JSON.stringify(data)); // allTasks -> json string
        }
    }
    else if(e.key === 'Enter' && e.shiftKey == false)
    {
        e.preventDefault();
        alert('Nothing to ticket!');
    }
}

function generateTicket(taskId, task, selectedPriority) {
    let ticket = document.createElement('div');
    ticket.classList.add('ticket');
    ticket.innerHTML = `<div class="ticket-color ticket-color-${selectedPriority}"></div>
        <div class="ticket-id">${taskId}</div>
        <div class="task">
            ${task}
        </div>`;
    ticket.addEventListener('click', function(e) {
        if(e.currentTarget.classList.contains('active'))
        {
            e.currentTarget.classList.remove('active');
        }
        else e.currentTarget.classList.add('active');
    });

    return ticket;
}

let deleteButton = document.querySelector('.delete');

deleteButton.addEventListener('click', function(e) {
    let selectedTickets = document.querySelectorAll('.ticket.active');

    let allTaskData = JSON.parse(localStorage.getItem('allTasks'));
    for(let i = 0; i < selectedTickets.length; i++)
    {
        let id = selectedTickets[i].querySelector('.ticket-id').innerText;
        selectedTickets[i].remove();
        allTaskData = allTaskData.filter(function(ticket) {
            return ticket.taskId !== id;
        });
    }

    localStorage.setItem('allTasks', JSON.stringify(allTaskData));
});