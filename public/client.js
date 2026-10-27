const socket = io();

const form = document.getElementById('form');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('input');
const messages = document.getElementById('messages');

function getRandomHexColor() {
    const hex = Math.floor(
        Math.random() * 0xffffff
    ).toString(16);

    return `#${hex.padStart(6, '0')}`;
}


// Send a message when the form is submitted.
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const message = messageInput.value.trim();

    if (username !== '' && message !== '') {
        socket.emit('message', {
            username: username,
            message: message
        });

        // Clear the message field but keep the username.
        messageInput.value = '';
    }
});

// Display messages received from the server.
socket.on('message', (msg) => {
    const li = document.createElement('li');
    const usernameSpan = document.createElement('span');

    usernameSpan.className = 'username';
    usernameSpan.style.color = getRandomHexColor();
    usernameSpan.textContent = msg.username;

    li.append(
        usernameSpan,
        document.createTextNode(`: ${msg.message}`)
    );

    messages.appendChild(li);
});