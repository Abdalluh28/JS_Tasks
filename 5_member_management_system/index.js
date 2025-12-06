import { modalOutsideClick, openModal } from "./modal.js";

const modalBtn = document.querySelector('.open-create-member-modal');
const modal = document.querySelector('.modal');

modalBtn.addEventListener('click', () => openModal(modal, './createEditMember/create_edit_member.html'));

modalOutsideClick(modal);



export const createMemberRow = (member) => {
    const tableBody = document.querySelector('.members-body')
    let row = document.createElement('tr');
    row.classList.add('member-row');
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
    `

    tableBody.appendChild(row);
}

let members = localStorage.getItem('members') || '[]';
members = JSON.parse(members);
if (members.length == 0) {
    document.querySelector('.no-members-message').setAttribute('data-visible', 'visible');
    document.querySelector('.table-container').setAttribute('data-visible', 'hidden');
    document.querySelector('.footer').setAttribute('data-visible', 'hidden');
} else {
    document.querySelector('.no-members-message').setAttribute('data-visible', 'hidden');
    document.querySelector('.table-container').setAttribute('data-visible', 'visible');
    document.querySelector('.footer').setAttribute('data-visible', 'visible');
}

members.forEach(member => {
    createMemberRow(member);
})