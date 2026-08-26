let lightOn = false;

function toggleLight() {

    lightOn = !lightOn;

    const lightStatus = document.getElementById("lightStatus");
    const lightButton = document.getElementById("lightButton");

    if (lightOn) {
        lightStatus.textContent = "ON";
        lightStatus.style.color = "green";
        lightButton.textContent = "Turn OFF";
    } else {
        lightStatus.textContent = "OFF";
        lightStatus.style.color = "";
        lightButton.textContent = "Turn ON";
    }
}
// ESP32 STATUS

let esp32Online = true;

function updateESP32Status() {

    const indicator = document.getElementById("espIndicator");
    const status = document.getElementById("espStatus");
    const lastUpdate = document.getElementById("lastUpdate");

    if (esp32Online) {

        indicator.className = "indicator online";
        status.textContent = "ONLINE";

        lastUpdate.textContent =
            "Last update: " + new Date().toLocaleTimeString();

    } else {

        indicator.className = "indicator offline";
        status.textContent = "OFFLINE";

        lastUpdate.textContent = "ESP32 not connected";
    }
}

updateESP32Status();
