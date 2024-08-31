// document.addEventListener('DOMContentLoaded', () => {
//     const createUserForm = document.getElementById('createUserForm');
//     const usersList = document.getElementById('usersList');

//     createUserForm.addEventListener('submit', async (event) => {
//         event.preventDefault();
        
//         const name = document.getElementById('name').value;
//         const email = document.getElementById('email').value;

//         try {
//             const response = await fetch('/users', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ name, email })
//             });

//             const newUser = await response.json();
//             addUserToList(newUser);
//         } catch (error) {
//             console.error('Error creating user:', error);
//         }
//     });

//     async function loadUsers() {
//         try {
//             const response = await fetch('/users');
//             const users = await response.json();
//             users.forEach(addUserToList);
//         } catch (error) {
//             console.error('Error loading users:', error);
//         }
//     }

//     function addUserToList(user) {
//         const li = document.createElement('li');
//         li.textContent = `${user.name} (${user.email})`;
//         usersList.appendChild(li);
//     }

//     loadUsers();
// });


document.addEventListener('DOMContentLoaded', () => {
    const createUserForm = document.getElementById('createUserForm');
    const usersList = document.getElementById('usersList');
    let editId = null;

    createUserForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        if (editId) {
            try {
                const response = await fetch(`/users/${editId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email })
                });

                const updatedUser = await response.json();
                updateUserInList(updatedUser);
                editId = null;
            } catch (error) {
                console.error('Error updating user:', error);
            }
        } else {
            try {
                const response = await fetch('/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email })
                });

                const newUser = await response.json();
                addUserToList(newUser);
            } catch (error) {
                console.error('Error creating user:', error);
            }
        }

        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
    });

    async function loadUsers() {
        try {
            const response = await fetch('/users');
            const users = await response.json();
            users.forEach(addUserToList);
        } catch (error) {
            console.error('Error loading users:', error);
        }
    }

    function addUserToList(user) {
        const li = document.createElement('li');
        li.id = `user-${user._id}`;
        li.innerHTML = `
            ${user.name} (${user.email})
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        `;

        // Add event listeners for edit and delete buttons
        li.querySelector('.edit').addEventListener('click', () => {
            editUser(user._id, user.name, user.email);
        });
        li.querySelector('.delete').addEventListener('click', () => {
            deleteUser(user._id);
        });

        usersList.appendChild(li);
    }

    function updateUserInList(user) {
        const li = document.getElementById(`user-${user._id}`);
        if (li) {
            li.innerHTML = `
                ${user.name} (${user.email})
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            `;

            // Add event listeners for edit and delete buttons
            li.querySelector('.edit').addEventListener('click', () => {
                editUser(user._id, user.name, user.email);
            });
            li.querySelector('.delete').addEventListener('click', () => {
                deleteUser(user._id);
            });
        }
    }

    async function deleteUser(id) {
        console.log(`Deleting user with ID: ${id}`); // Debug log
        try {
            const response = await fetch(`/users/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            const li = document.getElementById(`user-${id}`);
            if (li) {
                li.remove();
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    window.editUser = function(id, name, email) {
        document.getElementById('name').value = name;
        document.getElementById('email').value = email;
        editId = id;
    };

    loadUsers();
});
