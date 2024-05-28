const socket = io();

socket.on('temperatureData', (data) => {
    document.getElementById('temperature').innerText = `Temperature: ${data.temperature}°C`;
});
