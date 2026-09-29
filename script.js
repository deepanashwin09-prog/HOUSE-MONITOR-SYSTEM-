const bridgeURL = "https://house-monitor-bridge-api.vercel.app";


// ================= DASHBOARD STATUS =================

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


        // Last update
        document.getElementById("lastUpdate").innerText =
            "Last update: " + new Date().toLocaleTimeString();


    } catch (error) {

        console.error("Dashboard error:", error);

        document.getElementById("espStatus").innerText = "OFFLINE";

        document.getElementById("espIndicator").className =
            "indicator offline";

    }
}


// ================= LED CONTROL =================

async function toggleLED() {

    const status = document.getElementById("ledStatus");

    const button = document.getElementById("ledButton");


    const currentState =
        status.innerText === "ON" ? 1 : 0;


    const newState =
        currentState === 1 ? 0 : 1;


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


// Update dashboard immediately
updateDashboard();

// Update dashboard every 2 seconds
setInterval(updateDashboard, 2000);



// ================= RAIN STATUS =================

const rainAPI =
    "https://house-monitor-bridge-api.vercel.app/api/rain";


async function updateRainStatus() {

    const rainElement =
        document.getElementById("rainStatus");


    if (!rainElement) {

        console.log("rainStatus element not found");

        return;

    }


    try {

        const response = await fetch(rainAPI, {
            cache: "no-store"
        });


        if (!response.ok) {

            throw new Error(
                "Rain API HTTP error: " + response.status
            );

        }


        const data = await response.json();


        console.log("Rain API:", data);


        if (data.success === true) {

            if (Number(data.rain) === 1) {

                rainElement.textContent =
                    "🌧️ RAIN DETECTED";

            } else {

                rainElement.textContent =
                    "☀️ NO RAIN";

            }

        } else {

            rainElement.textContent =
                "RAIN ERROR";

        }


    } catch (error) {

        console.error(
            "Rain connection error:",
            error
        );

        rainElement.textContent =
            "RAIN OFFLINE";

    }

}


// Update rain immediately
updateRainStatus();

// Update rain every 2 seconds
setInterval(updateRainStatus, 2000);



// ================= VOICE CONTROL =================

function startVoiceControl() {

    const voiceStatus =
        document.getElementById("voiceStatus");


    // Check browser speech recognition support
    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        voiceStatus.innerText =
            "NOT SUPPORTED";

        alert(
            "Speech recognition is not supported in this browser."
        );

        return;

    }


    // Create speech recognition object
    const recognition =
        new SpeechRecognition();


    // Voice language
    recognition.lang = "en-US";


    // Listen for one command
    recognition.continuous = false;


    // Wait for final result
    recognition.interimResults = false;


    // Show listening status
    voiceStatus.innerText =
        "🎤 LISTENING...";


    // ================= SPEECH RESULT =================

    recognition.onresult =
        async function(event) {

            const command =
                event.results[0][0].transcript
                    .toLowerCase()
                    .trim();


            console.log(
                "Voice command:",
                command
            );


            // Show recognized command
            voiceStatus.innerText =
                command;


            // ================= TURN ON LIGHT =================

            if (
                command.includes("turn on the light") ||
                command.includes("turn on light") ||
                command.includes("light on")
            ) {

                voiceStatus.innerText =
                    "💡 TURNING LIGHT ON";


                try {

                    const response =
                        await fetch(
                            `${bridgeURL}/api/led?state=1`
                        );


                    if (!response.ok) {

                        throw new Error(
                            "LED API error"
                        );

                    }


                    const data =
                        await response.json();


                    if (data.success === true) {

                        document.getElementById(
                            "ledStatus"
                        ).innerText = "ON";


                        document.getElementById(
                            "ledButton"
                        ).innerText =
                            "TURN OFF";


                        voiceStatus.innerText =
                            "💡 LIGHT ON";


                    } else {

                        voiceStatus.innerText =
                            "❌ LIGHT ERROR";

                    }


                } catch (error) {

                    console.error(
                        "Voice LED error:",
                        error
                    );


                    voiceStatus.innerText =
                        "❌ CONNECTION ERROR";

                }

            }


            // ================= TURN OFF LIGHT =================

            else if (
                command.includes("turn off the light") ||
                command.includes("turn off light") ||
                command.includes("light off")
            ) {

                voiceStatus.innerText =
                    "💡 TURNING LIGHT OFF";


                try {

                    const response =
                        await fetch(
                            `${bridgeURL}/api/led?state=0`
                        );


                    if (!response.ok) {

                        throw new Error(
                            "LED API error"
                        );

                    }


                    const data =
                        await response.json();


                    if (data.success === true) {

                        document.getElementById(
                            "ledStatus"
                        ).innerText = "OFF";


                        document.getElementById(
                            "ledButton"
                        ).innerText =
                            "TURN ON";


                        voiceStatus.innerText =
                            "💡 LIGHT OFF";


                    } else {

                        voiceStatus.innerText =
                            "❌ LIGHT ERROR";

                    }


                } catch (error) {

                    console.error(
                        "Voice LED error:",
                        error
                    );


                    voiceStatus.innerText =
                        "❌ CONNECTION ERROR";

                }

            }


            // ================= UNKNOWN COMMAND =================

            else {

                voiceStatus.innerText =
                    "❓ COMMAND NOT RECOGNIZED";

            }

        };


    // ================= VOICE ERROR =================

    recognition.onerror =
        function(event) {

            console.error(
                "Voice error:",
                event.error
            );


            voiceStatus.innerText =
                "VOICE ERROR";

        };


    // ================= VOICE ENDED =================

    recognition.onend =
        function() {

            console.log(
                "Voice recognition stopped"
            );

        };


    // ================= START MICROPHONE =================

    recognition.start();

}
