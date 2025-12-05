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

    const form = document.querySelector('.create-edit-member-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            handleSubmit(e)
            closeModal(modal);
        });
    }
}

const closeModal = (modal) => {
    modal.style.display = 'none';
}

const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data)

    const newMember = {
        name: data.firstName + ' ' + data.lastName,
        email: data.email,
        birthdate: data.birthdate,
        matrialStatus: data.matrialStatus,
        phone: data.phone,
        government: data.government,
        partTime: data.partTime === 'on' ? true : false,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
    }

    let members = localStorage.getItem('members') || '[]';
    members = JSON.parse(members);

    members.push(newMember);
    localStorage.setItem('members', JSON.stringify(members));

    createMemberRow(newMember);
}


export const modalOutsideClick = (modal) => {
    window.addEventListener('click', e => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
}