const socket = io();

// Hiển thị danh sách người dùng
socket.on('user list', (users) => {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    users.forEach((user) => {
        const li = document.createElement('li');
        li.textContent = user;
        userList.appendChild(li);
    });
});

// Hiển thị tin nhắn
socket.on('chat message', (msg) => {
    const messageList = document.getElementById('message-list');
    const li = document.createElement('li');
    li.innerHTML = `<strong>${msg.username}:</strong> ${msg.message}`;
    messageList.appendChild(li);
    scrollToBottom();
});

// Khi người dùng nhập tên
const usernameForm = document.getElementById('username-form');
const usernameInput = document.getElementById('username');
const chatWindow = document.getElementById('chat-window');
usernameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    socket.emit('user joined', username);
    usernameForm.style.display = 'none';
    chatWindow.style.display = 'block';
});

// Khi người dùng gửi tin nhắn
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message');
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    socket.emit('chat message', message);
    messageInput.value = '';
});


// Hàm cuộn đến cuối danh sách
function scrollToBottom() {
    const messageList = document.getElementById('message-list');
    messageList.scrollTop = messageList.scrollHeight;
}

