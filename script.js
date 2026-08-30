// ESP32 IP address
const esp32IP = "10.32.84.169";

function toggleLED() {

    const status = document.getElementById("ledStatus");
    const button = document.getElementById("ledButton");

    if (status.innerText === "OFF") {

        fetch("http://" + esp32IP + "/led/on")
            .then(response => response.text())
            .then(data => {

                status.innerText = "ON";
                button.innerText = "TURN OFF";

            })
            .catch(error => {

                status.innerText = "ESP32 NOT REACHABLE";

            });

    } else {

        fetch("http://" + esp32IP + "/led/off")
            .then(response => response.text())
            .then(data => {

                status.innerText = "OFF";
                button.innerText = "TURN ON";

            })
            .catch(error => {

                status.innerText = "ESP32 NOT REACHABLE";

            });

    }
}
