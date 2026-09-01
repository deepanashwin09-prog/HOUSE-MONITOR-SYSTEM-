const bridgeURL = "https://house-monitor-bridge-api.vercel.app";

function toggleLED() {
    const status = document.getElementById("ledStatus");
    const button = document.getElementById("ledButton");

    const action = status.innerText === "OFF" ? "on" : "off";

    status.innerText = "WAITING...";

    fetch(${bridgeURL}/api/led?action=${action})
        .then(response => {
            if (!response.ok) {
                throw new Error("Bridge error");
            }

            return response.text();
        })
        .then(data => {
            status.innerText = data.replace("LED ", "");

            if (action === "on") {
                button.innerText = "TURN OFF";
            } else {
                button.innerText = "TURN ON";
            }
        })
        .catch(error => {
            status.innerText = "ERROR";
            console.log(error);
        });
}
