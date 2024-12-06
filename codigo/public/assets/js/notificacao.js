function fetchNotifications() {
    fetch('/codigo/db/db.json')
        .then(response => response.json())
        .then(data => {
            const messages = data.mensagens;
            displayNotifications(messages);
        })
        .catch(error => {
            console.error('Erro ao carregar o JSON:', error);
        });
}

function displayNotifications(messages) {
    const notificationList = document.getElementById('notificationList');
    const noNotification = document.getElementById('noNotification');

    noNotification.style.display = "none";

    messages.forEach(message => {
        const notification = document.createElement('div');
        notification.className = "notification";
        notification.textContent = message.mensagem;
        notificationList.appendChild(notification);
    });
}

function clearNotifications() {
    const notificationList = document.getElementById('notificationList');
    const noNotification = document.getElementById('noNotification');

    notificationList.innerHTML = "";
    noNotification.style.display = "block";
}

setTimeout(fetchNotifications, 10000);
