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
            <button class="member-action-button view-member" data-member-id="1" title="view member">
                <i class="fa-solid fa-eye"></i>
            </button>
            <button class="member-action-button edit-member" data-member-id="1" title="edit member">
                <i class="fa-solid fa-pen"></i>
            </button>
            <button class="member-action-button delete-member" data-member-id="1" title="delete member">
                <i class="fa-solid fa-trash"></i>
            </button>
        </td>
    `

    tableBody.appendChild(row);
}

let members = localStorage.getItem('members') || '[]';
members = JSON.parse(members);

members.forEach(member => {
    createMemberRow(member);
})