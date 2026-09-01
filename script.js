const bridgeURL = "https://house-monitor-bridge-api.vercel.app";

function toggleLED() {
    const status = document.getElementById("ledStatus");
    const button = document.getElementById("ledButton");

    // Decide next state
    const currentState = status.innerText.trim();

    let state;

    if (currentState === "OFF") {
        state = "1";
    } else {
        state = "0";
    }

    status.innerText = "WAITING...";
    button.disabled = true;

    fetch(${bridgeURL}/api/led?state=${state})
        .then(response => {
            if (!response.ok) {
                throw new Error("API error: " + response.status);
            }

            return response.json();
        })
        .then(data => {

            console.log("API response:", data);

            if (data.success === true) {

                if (state === "1") {
                    status.innerText = "ON";
                    button.innerText = "TURN OFF";
                } else {
                    status.innerText = "OFF";
                    button.innerText = "TURN ON";
                }

            } else {
                throw new Error(data.error || "Unknown error");
            }
        })
        .catch(error => {

            console.error("LED ERROR:", error);

            status.innerText = "ERROR";

        })
        .finally(() => {
            button.disabled = false;
        });
}
