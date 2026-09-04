const bridgeURL = "https://house-monitor-bridge-api.vercel.app";

async function updateDashboard() {
    try {
        const response = await fetch(`${bridgeURL}/api/status`);

        if (!response.ok) {
            throw new Error("Status API error");
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error("Invalid status data");
        }

        // Temperature
        document.querySelector(".card:nth-child(2) .value").innerText =
            `${data.temperature}°C`;

        // Humidity
        document.querySelector(".card:nth-child(3) .value").innerText =
            `${data.humidity}%`;

        // LED
        const ledStatus = document.getElementById("ledStatus");
        const ledButton = document.getElementById("ledButton");

        if (data.led === 1) {
            ledStatus.innerText = "ON";
            ledButton.innerText = "TURN OFF";
        } else {
            ledStatus.innerText = "OFF";
            ledButton.innerText = "TURN ON";
        }

        // ESP32 status
        document.getElementById("espStatus").innerText = "ONLINE";
        document.getElementById("espIndicator").className =
            "indicator online";

        document.getElementById("lastUpdate").innerText =
            "Last update: " + new Date().toLocaleTimeString();

    } catch (error) {
        console.error("Dashboard error:", error);

        document.getElementById("espStatus").innerText = "OFFLINE";
        document.getElementById("espIndicator").className =
            "indicator offline";
    }
}


// LED CONTROL

async function toggleLED() {
    const status = document.getElementById("ledStatus");
    const button = document.getElementById("ledButton");

    const currentState =
        status.innerText === "ON" ? 1 : 0;

    const newState = currentState === 1 ? 0 : 1;

    status.innerText = "WAITING...";
    button.disabled = true;

    try {
        const response = await fetch(
            `${bridgeURL}/api/led?state=${newState}`
        );

        if (!response.ok) {
            throw new Error("LED API error");
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error("LED control failed");
        }

        if (newState === 1) {
            status.innerText = "ON";
            button.innerText = "TURN OFF";
        } else {
            status.innerText = "OFF";
            button.innerText = "TURN ON";
        }

    } catch (error) {
        console.error("LED error:", error);
        status.innerText = "ERROR";
    }

    button.disabled = false;
}


// Update values immediately
updateDashboard();

// Update every 2 seconds
setInterval(updateDashboard, 2000);
