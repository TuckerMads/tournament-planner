"use strict";
function loadUsers() {
    fetch('/api/users')
        .then(res => res.json())
        .then((data) => {
        const list = document.getElementById('user-list');
        list.innerHTML = '';
        data.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.name} (Age: ${user.age}, Born: ${user.birthYear})`;
            list.appendChild(li);
        });
    });
}
window.addEventListener('DOMContentLoaded', () => {
    const listButton = document.getElementById('load-users');
    const form = document.getElementById('user-form');
    listButton.addEventListener('click', loadUsers);
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('name');
        const birthYearInput = document.getElementById('birth_ear');
        const name = nameInput.value;
        const birthYear = parseInt(birthYearInput.value, 10);
        await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, birthYear })
        });
        form.reset();
        loadUsers();
    });
});
