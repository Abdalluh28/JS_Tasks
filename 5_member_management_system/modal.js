import { createMemberRow } from "./index.js";

export const openModal = async (modal, url) => {
    modal.style.display = 'flex';
    const modalContent = modal.querySelector('.modal-content');

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to load content');
        const html = await res.text();
        modalContent.innerHTML = html;
    } catch (err) {
        modalContent.innerHTML = `<p class="error">Error loading content</p>`;
    }

    // Close buttons inside modal
    modalContent.querySelectorAll('.close-modal-btn').forEach(btn =>
        btn.addEventListener('click', () => closeModal(modal))
    );

    // Date picker
    const dateInput = modalContent.querySelector('.birthdate-group input');
    const dateInputIcon = modalContent.querySelector('.birthdate-group i');
    if (dateInput && dateInputIcon) {
        dateInputIcon.addEventListener('click', () => dateInput.showPicker());
    }

    // Form submission
    const form = modalContent.querySelector('.create-edit-member-form');
    if (form) {
        form.addEventListener('submit', handleSubmit.bind(null, modal, form));
    }
}

// Close modal
const closeModal = (modal) => {
    modal.style.display = 'none';
}

// Helper to show/hide errors
const showError = (element, message) => {
    element.style.display = 'block';
    element.textContent = message;
}
const hideError = (element) => {
    element.style.display = 'none';
}

// Handle form submission
const handleSubmit = (modal, form, e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const errors = {
        firstName: form.querySelector('.first-name-error'),
        lastName: form.querySelector('.last-name-error'),
        email: form.querySelector('.email-error'),
        birthdate: form.querySelector('.birthdate-error'),
        phone: form.querySelector('.phone-error'),
        government: form.querySelector('.government-error'),
        maritalStatus: form.querySelector('.marital-status-error'),
    }

    // Validation
    if (!data.firstName) return showError(errors.firstName, 'First name is required');
    if (data.firstName.length < 3) return showError(errors.firstName, 'First name must be at least 3 characters');
    if (!/^[a-zA-Z]+$/.test(data.firstName)) return showError(errors.firstName, 'First name must contain only letters');
    hideError(errors.firstName);

    if (!data.lastName) return showError(errors.lastName, 'Last name is required');
    if (data.lastName.length < 3) return showError(errors.lastName, 'Last name must be at least 3 characters');
    if (!/^[a-zA-Z]+$/.test(data.lastName)) return showError(errors.lastName, 'Last name must contain only letters');
    hideError(errors.lastName);

    if (!data.email) return showError(errors.email, 'Email is required');
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) return showError(errors.email, 'Email is invalid');
    hideError(errors.email);

    if (!data.phone) return showError(errors.phone, 'Phone is required');
    if (!/^01[0125][0-9]{8}$/.test(data.phone)) return showError(errors.phone, 'Phone is invalid');
    hideError(errors.phone);

    if (!data.birthdate) return showError(errors.birthdate, 'Birthdate is required');
    hideError(errors.birthdate);

    if (!data.maritalStatus) return showError(errors.maritalStatus, 'Marital status is required');
    hideError(errors.maritalStatus);

    if (!data.government) return showError(errors.government, 'Government is required');
    hideError(errors.government);


    // Create new member object
    const newMember = {
        id: Date.now(),
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        birthdate: data.birthdate,
        maritalStatus: data.maritalStatus,
        phone: data.phone,
        government: data.government,
        partTime: data.partTime === 'on',
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
    }

    // Save to localStorage
    const members = JSON.parse(localStorage.getItem('members') || '[]');
    members.push(newMember);
    localStorage.setItem('members', JSON.stringify(members));

    // Update UI
    createMemberRow(newMember);

    // Reset form and close modal
    form.reset();
    closeModal(modal);
    document.querySelector('.no-members-message').setAttribute('data-visible', 'hidden');
    document.querySelector('.table-container').setAttribute('data-visible', 'visible');
    document.querySelector('.footer').setAttribute('data-visible', 'visible');
}

// Close modal if clicking outside
export const modalOutsideClick = (modal) => {
    window.addEventListener('click', e => {
        if (e.target === modal) closeModal(modal);
    });
}
