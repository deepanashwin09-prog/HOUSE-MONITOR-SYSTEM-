const bridgeURL = "https://house-monitor-bridge-api.vercel.app";

function toggleLED() {
    const status = document.getElementById("ledStatus");
    const button = document.getElementById("ledButton");

    // OFF → turn ON (1)
    // ON → turn OFF (0)
    const state = status.innerText.trim() === "OFF" ? "1" : "0";

    status.innerText = "WAITING...";
    button.disabled = true;

    fetch(${bridgeURL}/api/led?state=${state})
        .then(response => {
            if (!response.ok) {
                throw new Error("Bridge API error");
            }

            return response.json();
        })
        .then(data => {
            if (!data.success) {
                throw new Error(data.error || "Blynk error");
            }

            if (state === "1") {
                status.innerText = "ON";
                button.innerText = "TURN OFF";
            } else {
                status.innerText = "OFF";
                button.innerText = "TURN ON";
            }
        })
        .catch(error => {
            status.innerText = "ERROR";
            console.error("LED error:", error);
        })
        .finally(() => {
            button.disabled = false;
        });
}
}
