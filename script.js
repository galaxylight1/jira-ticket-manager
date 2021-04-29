let TC = document.querySelector('.ticket-container');
let allFilters = document.querySelectorAll('.filter');
let modalVisible = false;
let selectedPriority;

for(let i = 0; i < allFilters.length; i++) 
{
    allFilters[i].addEventListener('click', filterHandler);
}

function filterHandler(e) {
    // code
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
            <div class="pink-modal-filter modal-filter active"></div>
            <div class="blue-modal-filter modal-filter"></div>
            <div class="green-modal-filter modal-filter"></div>
            <div class="black-modal-filter modal-filter"></div>
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
            modalFilters[i].addEventListener('click', selectPriority);
        }
    }
}

function selectPriority(e) {
    let activeFilter = document.querySelector('.modal-filter.active');
    activeFilter.classList.remove('active');
    
    // update selectedPriority
    selectedPriority = e.currentTarget.classList[0].split('-')[0]; // classList Arr's 0th idx, then split by - and get 0th idx
    
    e.currentTarget.classList.add('active');
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
        
        TC.appendChild(ticket);
    }
}