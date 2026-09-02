const bridgeURL = "https://house-monitor-bridge-api.vercel.app";

let ledState = 0;

async function toggleLED() {
    const status = document.getElementById("ledStatus");
    const button = document.getElementById("ledButton");

    const newState = ledState === 0 ? 1 : 0;

    status.innerText = "WAITING...";
    button.disabled = true;

    try {
        const response = await fetch(
            ${bridgeURL}/api/led?state=${newState}
        );

        if (!response.ok) {
            throw new Error(HTTP error: ${response.status});
        }

        const data = await response.json();

        if (data.success === true) {
            ledState = newState;

            if (ledState === 1) {
                status.innerText = "ON";
                button.innerText = "TURN OFF";
            } else {
                status.innerText = "OFF";
                button.innerText = "TURN ON";
            }
        } else {
            throw new Error("LED control failed");
        }

    } catch (error) {
        console.error("LED error:", error);
        status.innerText = "ERROR";
    }

    button.disabled = false;
}
