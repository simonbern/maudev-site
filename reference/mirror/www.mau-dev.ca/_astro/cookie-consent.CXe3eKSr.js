const GA_ID = "import.meta.env.PUBLIC_GA_ID";

const CONSENT_KEY = "site-consent";
const CONSENT_SYNC = `${CONSENT_KEY}-SYNC`;

function ensureDataLayer() {
  window.dataLayer = window.dataLayer || [];
}

function gtag() {
  ensureDataLayer();
  window.dataLayer.push(arguments);
}

function applyGtag() {
  if (!GA_ID) return;
  if (document.querySelector(`script[data-gtag="${GA_ID}"]`)) return;

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  s.dataset.gtag = GA_ID;
  document.head.appendChild(s);

  gtag("js", new Date());
  gtag("config", GA_ID, {
    anonymize_ip: true,
    cookie_flags: "SameSite=None;Secure",
  });
}

function applyConsent(gaChoice) {
  ensureDataLayer();
  window.dataLayer.push({
    event: "consent_update",
    analytics_storage: gaChoice === "accepted" ? "granted" : "denied",
  });

  if (gaChoice === "accepted") applyGtag();
}

function toChoice(value) {
  return value ? "accepted" : "rejected";
}

function buildConsentFormData({ gaConsent, ipConsent }) {
  const formData = new FormData();
  formData.set("gaConsent", String(Boolean(gaConsent)));
  formData.set("ipConsent", String(Boolean(ipConsent)));
  return formData;
}


async function sendConsentToServer(formData) {
  const res = await fetch("/_actions/addConsent", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Consent: server rejected payload (${res.status}) ${text}`);
  }
}

export const initConsent = () => {
  const banner = document.querySelector("[data-cookie-banner]");
  if (!banner) return;

  if (banner.dataset.consentInit === "true") return;
  banner.dataset.consentInit = "true";

  const settings = banner.querySelector("[data-cookie-settings]");
  const saveBtn = banner.querySelector('[data-consent-action="save"]');
  const acceptBtn = banner.querySelector('[data-consent-action="accept"]');
  const rejectBtn = banner.querySelector('[data-consent-action="reject"]');
  const personalizeBtn = banner.querySelector('[data-consent-action="personalize"]');

  const analyticsInput = banner.querySelector('[data-consent="analytics"]');
  const ipInput = banner.querySelector('[data-consent="ip"]');

  if (
    !settings ||
    !saveBtn ||
    !acceptBtn ||
    !rejectBtn ||
    !personalizeBtn ||
    !analyticsInput ||
    !ipInput
  ) {
    return;
  }

  const setBusy = (busy) => {
    acceptBtn.disabled = busy;
    rejectBtn.disabled = busy;
    personalizeBtn.disabled = busy;
    saveBtn.disabled = busy;
  };

  const hideBanner = () => {
    banner.hidden = true;
  };

  const openSettings = () => {
    settings.hidden = false;
    saveBtn.hidden = false;
  };

  const closeSettings = () => {
    settings.hidden = true;
    saveBtn.hidden = true;
  };

  const setInputs = ({ gaConsent, ipConsent }) => {
    analyticsInput.checked = Boolean(gaConsent);
    ipInput.checked = Boolean(ipConsent);
  };

  const syncKeyFor = ({ gaConsent, ipConsent }) =>
    JSON.stringify({ gaConsent: Boolean(gaConsent), ipConsent: Boolean(ipConsent) });

  const persistChoice = ({ gaConsent, ipConsent }) => {
    localStorage.setItem(`${CONSENT_KEY}-GA`, toChoice(gaConsent));
    localStorage.setItem(`${CONSENT_KEY}-IP`, toChoice(ipConsent));
  };

  const submitConsent = async ({ gaConsent, ipConsent }) => {
    setInputs({ gaConsent, ipConsent });

    const syncKey = syncKeyFor({ gaConsent, ipConsent });
    persistChoice({ gaConsent, ipConsent });

    applyConsent(toChoice(gaConsent));
    hideBanner();
    closeSettings();

    if (localStorage.getItem(CONSENT_SYNC) !== syncKey) {
      try {
        await sendConsentToServer(buildConsentFormData({ gaConsent, ipConsent }));
        localStorage.setItem(CONSENT_SYNC, syncKey);
      } catch (error) {
        console.error("Consent: failed to sync with server", error);
      }
    }
  };

  acceptBtn.addEventListener("click", async () => {
    setBusy(true);
    try {
      await submitConsent({ gaConsent: true, ipConsent: true });
    } finally {
      setBusy(false);
    }
  });

  rejectBtn.addEventListener("click", async () => {
    setBusy(true);
    try {
      await submitConsent({ gaConsent: false, ipConsent: false });
    } finally {
      setBusy(false);
    }
  });

  personalizeBtn.addEventListener("click", () => {
    openSettings();
  });

  saveBtn.addEventListener("click", async () => {
    setBusy(true);
    try {
      await submitConsent({
        gaConsent: Boolean(analyticsInput.checked),
        ipConsent: Boolean(ipInput.checked),
      });
    } finally {
      setBusy(false);
    }
  });

  const savedGaChoice = localStorage.getItem(`${CONSENT_KEY}-GA`);
  const savedIpChoice = localStorage.getItem(`${CONSENT_KEY}-IP`);
  if (savedGaChoice !== null || savedIpChoice !== null) {
    const gaChoice = savedGaChoice === "accepted" ? "accepted" : "rejected";
    setInputs({
      gaConsent: savedGaChoice === "accepted",
      ipConsent: savedIpChoice === "accepted",
    });
    applyConsent(gaChoice);
    banner.hidden = true;
    closeSettings();
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initConsent);
} else {
  initConsent();
}
