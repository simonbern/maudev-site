

const initCookieBanner = () => {
    const CONSENT_KEY = "site-consent";
    const banner = document.querySelector("[data-cookie-banner]");
    if (!banner) return;
    const savedGaChoice = localStorage.getItem(`${CONSENT_KEY}-GA`);
    const savedIpChoice = localStorage.getItem(`${CONSENT_KEY}-IP`);

    if (savedGaChoice !== null || savedIpChoice !== null) {
        banner.hidden = true;
        return;
    }

    banner.hidden = false;
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCookieBanner);
} else {
    initCookieBanner();
}

