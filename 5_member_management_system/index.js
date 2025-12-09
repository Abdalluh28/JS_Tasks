import { modalOutsideClick, openModal } from "./modal.js";

const modalBtn = document.querySelector('.open-create-member-modal');
const modal = document.querySelector('.modal');
const tableBody = document.querySelector('.members-body');
const partTimeBtn = document.querySelector('#part-time-filter-button');
const partTimeCheckbox = document.querySelector('.part-time-filter');

// open create member modal
modalBtn.addEventListener('click', () => {
    openModal(modal, './createEditMember/create_edit_member.html');
});

// close modal
modalOutsideClick(modal);


// create member row function
export const createMemberRow = (member) => {
    const row = document.createElement('tr');
    row.classList.add('member-row');
    row.setAttribute('data-member-id', member.id);

    row.innerHTML = `
        <td class="member-name">${member.name}</td>
        <td class="member-phone">${member.phone}</td>
        <td class="member-government">${member.government}</td>
        <td class="member-created-at">${member.createdAt}</td>
        <td class="member-updated-at">${member.updatedAt}</td>
        <td class="member-actions">
            <button class="member-action-button view-member" data-member-id=${member.id} title="view member">
                <i class="fa-solid fa-eye"></i>
            </button>
            <button class="member-action-button edit-member" data-member-id=${member.id} title="edit member">
                <i class="fa-solid fa-pen"></i>
            </button>
            <button class="member-action-button delete-member" data-member-id=${member.id} title="delete member">
                <i class="fa-solid fa-trash"></i>
            </button>
        </td>
    `;

    tableBody.appendChild(row);
};


// initialize members from local storage
let members = JSON.parse(localStorage.getItem('members') || '[]');

if (members.length === 0) {
    document.querySelector('.no-members-message').setAttribute('data-visible', 'visible');
    document.querySelector('.table-container').setAttribute('data-visible', 'hidden');
    document.querySelector('.footer').setAttribute('data-visible', 'hidden');
} else {
    document.querySelector('.no-members-message').setAttribute('data-visible', 'hidden');
    document.querySelector('.table-container').setAttribute('data-visible', 'visible');
    document.querySelector('.footer').setAttribute('data-visible', 'visible');
}


// render existing members
members.forEach(member => createMemberRow(member));


// delete member toggle
tableBody.addEventListener('click', (e) => {
    const btn = e.target.closest('.delete-member');
    if (!btn) return;

    const id = btn.getAttribute('data-member-id');
    openModal(modal, './deleteMember/delete_member.html', id);
});


// part-time filter, click anywhere in the button to toggle
partTimeBtn.addEventListener('click', (e) => {
    // Avoid double toggle when clicking directly on checkbox
    if (e.target !== partTimeCheckbox) partTimeCheckbox.checked = !partTimeCheckbox.checked;

    // Dispatch change event in case other listeners rely on it
    partTimeCheckbox.dispatchEvent(new Event('change'));
});
