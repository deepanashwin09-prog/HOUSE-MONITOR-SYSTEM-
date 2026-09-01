const bridgeURL = "https://house-monitor-bridge-api.vercel.app";

async function toggleLED() {
    const status = document.getElementById("ledStatus");
    const button = document.getElementById("ledButton");

    const isOff = status.textContent.trim() === "OFF";
    const state = isOff ? "1" : "0";

    button.disabled = true;
    button.textContent = "WAITING...";
    status.textContent = "WAITING...";

    try {
        const response = await fetch(
            ${bridgeURL}/api/led?state=${state}
        );

        const data = await response.json();

        console.log("Bridge response:", data);

        if (!data.success) {
            throw new Error(data.error || "API failed");
        }

        if (state === "1") {
            status.textContent = "ON";
            button.textContent = "TURN OFF";
        } else {
            status.textContent = "OFF";
            button.textContent = "TURN ON";
        }

    } catch (error) {
        console.error(error);

        status.textContent = "ERROR";
        button.textContent = "TRY AGAIN";

    } finally {
        button.disabled = false;
    }
}
        .finally(() => {
            button.disabled = false;
        });
}
