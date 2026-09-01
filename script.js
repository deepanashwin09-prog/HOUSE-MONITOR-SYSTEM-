const bridgeURL = "https://house-monitor-bridge-api.vercel.app";

async function toggleLED() {
    const status = document.getElementById("ledStatus");
    const button = document.getElementById("ledButton");

    // Decide next state
    const currentState = status.innerText.trim();

    const nextState = currentState === "OFF" ? "1" : "0";

    status.innerText = "WAITING...";
    button.disabled = true;

    try {
        const response = await fetch(
            ${bridgeURL}/api/led?state=${nextState}
        );

        if (!response.ok) {
            throw new Error(Server returned ${response.status});
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.error || "LED API error");
        }

        // Update webpage only after API succeeds
        if (nextState === "1") {
            status.innerText = "ON";
            button.innerText = "TURN OFF";
        } else {
            status.innerText = "OFF";
            button.innerText = "TURN ON";
        }

    } catch (error) {
        console.error("LED control error:", error);

        status.innerText = "ERROR";
        button.innerText = "TRY AGAIN";
    }

    button.disabled = false;
}
