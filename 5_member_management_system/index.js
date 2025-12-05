import { modalOutsideClick, openModal } from "./modal.js";

const modalBtn = document.querySelector('.open-create-member-modal');
const modal = document.querySelector('.modal');

modalBtn.addEventListener('click', () => openModal(modal, './createEditMember/create_edit_member.html'));

modalOutsideClick(modal);

