
self.onnotificationclick = function(event) {
//   console.log('On notification click: ', event.notification.tag);
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url === '/' && 'focus' in client)
        return client.focus();
    }
    if (clients.openWindow) {
      return clients.openWindow('/' + event.action);
    }
  }));
};

self.addEventListener('push', function(event) {
  showPushNotification()
  if (event.data) {
    console.log('Push event!! ', event.data.text())
  } else {
    console.log('Push event but no data')
  }
})

function showPushNotification() {
    self.registration.showNotification("You received a Push Notif :)", {
      body: "some PN textual body..."
    })
}
