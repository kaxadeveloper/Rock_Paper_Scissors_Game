const startBtn = document.querySelector("#startGameBtn");
const overlay = document.querySelector(".overlay");
const gameContainer = document.querySelector(".container");
const userResult = document.querySelector(".user_result img");
const cpuResult = document.querySelector(".cpu_result img");
const result = document.querySelector(".result");
const optionImages = document.querySelectorAll(".option_image");

// Open Popup
startBtn.addEventListener("click", () => {
    overlay.classList.add("active");
});

optionImages.forEach((image, index) => {
    image.addEventListener("click", (e) => {
        // Prevent clicking while animation is running
        if (gameContainer.classList.contains("start")) return;

        // Highlight selected option
        optionImages.forEach((img) => img.classList.remove("active"));
        image.classList.add("active");

        // Set initial "Waiting" state (Shaking Rock)
        userResult.src = cpuResult.src = "img/rock.png";
        result.textContent = "Wait...";

        // Add the shaking animation class
        gameContainer.classList.add("start");

        setTimeout(() => {
            gameContainer.classList.remove("start");

            // GET USER IMAGE: Check if the clicked element IS the image or CONTAINS the image
            const clickedImg = image.tagName === "IMG" ? image : image.querySelector("img");
            userResult.src = clickedImg.src;

            // CPU CHOICE
            const cpuImages = ["img/rock.png", "img/paper.png", "img/scissors.png"];
            const random = Math.floor(Math.random() * 3);
            cpuResult.src = cpuImages[random];

            // LOGIC CONSTANTS
            const userValue = ["R", "P", "S"][index];
            const cpuValue = ["R", "P", "S"][random];

            const outcomes = {
                RR: "Draw", RP: "Cpu", RS: "User",
                PP: "Draw", PR: "User", PS: "Cpu",
                SS: "Draw", SR: "Cpu", SP: "User"
            };

            const outcomeValue = outcomes[userValue + cpuValue];

            // DISPLAY RESULT
            result.textContent = userValue === cpuValue ? "Match Draw" : `${outcomeValue} Won!!!`;

        }, 2500);
    });
});