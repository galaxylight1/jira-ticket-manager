let TC = document.querySelector('.ticket-container');
let allFilters = document.querySelectorAll('.filter');
let modalVisible = false;

for(let i = 0; i < allFilters.length; i++) 
{
    allFilters[i].addEventListener('click', filterHandler);
}

function filterHandler(e) {

}

let addButton = document.querySelector('.add');

addButton.addEventListener('click', showModal);

function showModal(e) {
    if(!modalVisible) {
        let modal = `<div class="modal">
        <div class="task-to-be-added" contenteditable="true" data-type="false">
            <span class="placeholder">Enter your text here</span>
        </div>
        <div class="priority-list">
            <div class="pink-modal-filter modal-filter"></div>
            <div class="blue-modal-filter modal-filter"></div>
            <div class="green-modal-filter modal-filter"></div>
            <div class="black-modal-filter modal-filter"></div>
        </div>
    </div> `;

        TC.innerHTML = TC.innerHTMl + modal;
        let taskTyper = document.querySelector('.task-to-be-added');
        taskTyper.addEventListener('click', function(e) {
            if(e.currentTarget.getAttribute('data-type') === 'false') {
                e.currentTarget.innerHTML = '';
                e.currentTarget.setAttribute('data-type', 'true');
            }
        });
        taskTyper.addEventListener('keypress', addTicket);
        modalVisible = true;
    }
}

// TODO: select priority

function addTicket(e) {
    if(e.key === 'Enter') {
            let ticket = `<div class="ticket">
            <div class="ticket-color ticket-color-yellow"></div>
            <div class="ticket-id">#abdhjf</div>
            <div class="task">
                fasdsal asdlal asdlk askdl
            </div>
        </div>`;
    }
}