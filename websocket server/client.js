const socket = new WebSocket('ws://192.168.43.250:3000');

socket.addEventListener('open', (event) => {
    console.log('Connected to WebSocket server');
    socket.send('day la tu browser');
});

socket.addEventListener('message', (event) => {
    console.log('Received message from server:', event.data);
    // Xử lý tin nhắn từ server
    // khi nhận được tin từ Server sẽ thay đổi trạng thái của checkbox
    const message=event.data;
    const values=message.split('/')
    if (message === "led_on") {
      checkbox1.checked = true;
  } else if (message === "led_off") {
      checkbox1.checked = false;
  } else if (message === "servo_on") {
      checkbox2.checked = true;
  } else if (message === "servo_off") {
      checkbox2.checked = false;
  } else if (message === "horn_on") {
      checkbox3.checked = true;
  } else if (message === "horn_off") {
      checkbox3.checked = false;
  }else if(values.length === 2 && !isNaN(values[0]) && !isNaN(values[1])){
    document.getElementById("temperature-value").textContent=values[0]
    document.getElementById("humidity-value").textContent=values[1]
  }

    
    // Hiển thị tin nhắn trên trang HTML
    // const messagesDiv = document.getElementById('messages');
    // messagesDiv.innerHTML += '<p>' + event.data + '</p>';
});

socket.addEventListener('close', (event) => {
    console.log('Connection closed');
});

socket.addEventListener('error', (event) => {
    console.error('WebSocket error:', event);
});
// socket.onopen=function(){
//     document.getElementById('status').innerHTML='connected';
    
// }
var checkbox1 = document.getElementById("light");
checkbox1.addEventListener("change", function() {
  if (checkbox1.checked) {
    console.log("led_on");
    socket.send("led_on");
  } else {
    console.log("led_off");
    socket.send("led_off");
  }
});
var checkbox2 = document.getElementById("servo");
checkbox2.addEventListener("change", function() {
  if (checkbox2.checked) {
    console.log("servo_on");
    socket.send("servo_on");
  } else {
    console.log("servo_off");
    socket.send("servo_off");
  }
});
var checkbox3 = document.getElementById("horn");
checkbox3.addEventListener("change", function() {
  if (checkbox3.checked) {
    console.log("horn_on");
    socket.send("horn_on");
  } else {
    console.log("horn_off");
    socket.send("horn_off");
  }
});
