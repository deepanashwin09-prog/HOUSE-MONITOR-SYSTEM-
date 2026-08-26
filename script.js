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
