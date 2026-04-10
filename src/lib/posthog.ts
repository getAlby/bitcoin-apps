import posthog from "posthog-js";

const POSTHOG_KEY = "phc_qydTaRvkHhoDMA9n3Z3gYHULeeK3Q9fgjQ6BnUECrxsG";
const POSTHOG_HOST = "https://eu.i.posthog.com";

posthog.init(POSTHOG_KEY, {
  api_host: POSTHOG_HOST,
  // Respect user privacy — capture only what's needed
  capture_pageview: true,
  capture_pageleave: true,
  // Disable features we don't need for a simple directory site
  autocapture: false,
  session_recording: {
    maskAllInputs: true,
  },
});

export default posthog;
