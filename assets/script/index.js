'use strict';

document.addEventListener("DOMContentLoaded", () => {
    const cookieConsentModal = document.querySelector('.cookie-main-box');
    const cookieSettingsModal = document.querySelector('.cookie-settings-box');
    const closeButtons = document.querySelectorAll('.close-button');
    const acceptButton = document.querySelector('.accept-button');
    const settingsButton = document.querySelector('.settings-button');
    const saveButton = document.querySelector('.save-button');

    
    cookieConsentModal.style.display = "block";

    
    closeButtons.forEach(closeButton => {
        closeButton.addEventListener("click", () => {
            cookieConsentModal.style.display = "none";
            cookieSettingsModal.style.display = "none";
        });
    });

    
    acceptButton.addEventListener("click", () => {
        acceptAllPreferences();
        savePreferences();
        cookieConsentModal.style.display = "none";
    });

    
    settingsButton.addEventListener("click", () => {
        cookieSettingsModal.style.display = "block";
        cookieConsentModal.style.display = "none";
    });

    
    saveButton.addEventListener("click", () => {
        savePreferences();
        cookieSettingsModal.style.display = "none";
    });

    
    function getBrowserName() {
        const agent = navigator.userAgent.toLowerCase();
        if (agent.indexOf("edge") > -1) {
            return "Microsoft Edge";
        } else if (agent.indexOf("firefox") > -1) {
            return "Mozilla Firefox";
        } else if (agent.indexOf("chrome") > -1) {
            return "Google Chrome";
        } else if (agent.indexOf("safari") > -1) {
            return "Apple Safari";
        } else {
            return "Unknown";
        }
    }

    
    function getOSName() {
        const agent = navigator.userAgent.toLowerCase();
        if (agent.indexOf("windows") > -1) {
            return "Windows";
        } else if (agent.indexOf("mac") > -1) {
            return "Mac OS";
        } else if (agent.indexOf("linux") > -1) {
            return "Linux";
        } else if (agent.indexOf("android") > -1) {
            return "Android";
        } else if (agent.indexOf("ios") > -1) {
            return "iOS";
        } else {
            return "Unknown";
        }
    }

    
    function getScreenWidth() {
        return screen.width;
    }

    
    function getScreenHeight() {
        return screen.height;
    }

    
    function displayUserInfo() {
        const browserInfo = getBrowserName();
        const osInfo = getOSName();
        const screenWidth = getScreenWidth();
        const screenHeight = getScreenHeight();

        console.log("Browser: " + browserInfo);
        console.log("Operating System: " + osInfo);
        console.log("Screen Width: " + screenWidth);
        console.log("Screen Height: " + screenHeight);
    }

    
    function savePreferences() {
        const selectedOptions = {};

        const cookieOptions = document.querySelectorAll(".cookie-option");
        cookieOptions.forEach(option => {
            selectedOptions[option.name] = option.checked ? true : 'rejected';
        });

        console.log("Saved Preferences:", selectedOptions);

        setCookie("userPreferences", JSON.stringify(selectedOptions));

        displayUserInfo();
    }

    
    function loadSavedPreferences() {
        const savedOptions = JSON.parse(getCookie("userPreferences") || "{}");
        const cookieOptions = document.querySelectorAll(".cookie-option");
        cookieOptions.forEach(option => {
            option.checked = savedOptions[option.name] === true;
        });

        
        const toggleButtons = document.querySelectorAll(".toggle");
        toggleButtons.forEach(button => {
            button.checked = savedOptions[button.name] !== 'rejected';
        });

        
        displayUserInfo();
    }

    
    function acceptAllPreferences() {
        const savedOptions = JSON.parse(getCookie("userPreferences") || "{}");
        const allUserInfoInCookie = savedOptions.browser !== undefined &&
            savedOptions.os !== undefined &&
            savedOptions["screen-width"] !== undefined &&
            savedOptions["screen-height"] !== undefined;

        if (allUserInfoInCookie) {
            const cookieOptions = document.querySelectorAll(".cookie-option");
            cookieOptions.forEach(option => {
                option.checked = true;
            });

            
            const toggleButtons = document.querySelectorAll(".toggle");
            toggleButtons.forEach(button => {
                button.checked = true;
            });
        }
    }

    
    function setCookie(name, value) {
        document.cookie = name + "=" + value + ";path=/";
    }

    
    function getCookie(name) {
        const cname = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let c of ca) {
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(cname) == 0) {
                return c.substring(cname.length, c.length);
            }
        }
        return "";
    }
});