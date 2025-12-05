import { createMemberRow } from "./index.js";

export const openModal = async (modal, url) => {
    modal.style.display = 'flex';

    const modalContent = modal.querySelector('.modal-content');

    let res = await fetch(url);
    let html = await res.text();
    modalContent.innerHTML = html;

    modalContent.querySelectorAll('.close-modal-btn').forEach(btn => btn.addEventListener('click', () => {
        closeModal(modal);
    }));

    const dateInput = document.querySelector('.birthdate-group input');
    const dateInputIcon = document.querySelector('.birthdate-group i');

    if (dateInput && dateInputIcon) {
        dateInputIcon.addEventListener('click', () => {
            dateInput.showPicker();
        });
    }

}

const closeModal = (modal) => {
    modal.style.display = 'none';
}

export const modalOutsideClick = (modal) => {
    window.addEventListener('click', e => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
}