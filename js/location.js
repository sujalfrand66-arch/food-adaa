/* ============================================================
   BISHNOI FOOD ADDA — location.js
   Browser Geolocation + Google Maps URL Generation
   ============================================================ */

'use strict';

/* ============================================================
   LOCATION STATE
   ============================================================ */
const locationState = {
  mode:      'none',   // 'none' | 'manual' | 'live'
  lat:       null,
  lng:       null,
  mapsUrl:   null,
  address:   null,     // manual address text
};

window.locationState = locationState;

/* ============================================================
   UI ELEMENT REFS (populated on init)
   ============================================================ */
let ui = {};

function initLocationUI() {
  ui = {
    manualWrapper:    document.getElementById('location-manual-wrapper'),
    manualInput:      document.getElementById('delivery-address'),
    locationBtnWrap:  document.getElementById('location-btn-wrapper'),
    locationBtn:      document.getElementById('use-live-location-btn'),
    locationOrDiv:    document.getElementById('location-or'),
    successEl:        document.getElementById('location-success'),
    successCoords:    document.getElementById('location-success-coords'),
    successMapLink:   document.getElementById('location-success-map-link'),
    successChangBtn:  document.getElementById('location-change-btn'),
    errorEl:          document.getElementById('location-error'),
    errorMsg:         document.getElementById('location-error-msg'),
    retryBtn:         document.getElementById('location-retry-btn'),
  };

  ui.locationBtn?.addEventListener('click', requestLiveLocation);
  ui.successChangBtn?.addEventListener('click', resetLocationToManual);
  ui.retryBtn?.addEventListener('click', requestLiveLocation);

  // Manual address input sync
  ui.manualInput?.addEventListener('input', () => {
    locationState.mode = 'manual';
    locationState.address = ui.manualInput.value.trim();
  });
}

/* ============================================================
   REQUEST LIVE LOCATION
   ============================================================ */
function requestLiveLocation() {
  if (!navigator.geolocation) {
    showLocationError('unsupported');
    return;
  }

  // Set button to loading state
  if (ui.locationBtn) {
    ui.locationBtn.disabled = true;
    ui.locationBtn.innerHTML = `
      <div class="location-btn__spinner" aria-hidden="true"></div>
      Detecting your location…`;
    ui.locationBtn.setAttribute('aria-busy', 'true');
  }

  // Hide any previous error
  hideLocationError();

  // IMPORTANT: The browser itself triggers the permission prompt.
  // We do NOT create a fake modal.
  navigator.geolocation.getCurrentPosition(
    onLocationSuccess,
    onLocationError,
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
  );
}

/* ============================================================
   SUCCESS HANDLER
   ============================================================ */
function onLocationSuccess(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  locationState.mode    = 'live';
  locationState.lat     = lat;
  locationState.lng     = lng;
  locationState.mapsUrl = mapsUrl;
  locationState.address = null;

  // Reset button
  if (ui.locationBtn) {
    ui.locationBtn.disabled = false;
    ui.locationBtn.removeAttribute('aria-busy');
    ui.locationBtn.innerHTML = `📍 Use Live Location`;
  }

  // Hide manual address + OR divider + button
  ui.manualWrapper?.classList.add('hidden');
  ui.locationOrDiv?.classList.add('hidden');
  ui.locationBtnWrap?.classList.add('hidden');

  // Show success state
  if (ui.successEl) {
    ui.successEl.classList.add('visible');
    ui.successEl.removeAttribute('hidden');
  }
  if (ui.successCoords) {
    ui.successCoords.textContent = `Lat: ${lat.toFixed(5)}   Lng: ${lng.toFixed(5)}`;
  }
  if (ui.successMapLink) {
    ui.successMapLink.href = mapsUrl;
    ui.successMapLink.textContent = 'View on Google Maps →';
  }

  window.showToast?.('📍 Live location detected!', 'success');
}

/* ============================================================
   ERROR HANDLER
   ============================================================ */
function onLocationError(error) {
  locationState.mode = 'manual';

  // Reset button
  if (ui.locationBtn) {
    ui.locationBtn.disabled = false;
    ui.locationBtn.removeAttribute('aria-busy');
    ui.locationBtn.innerHTML = `📍 Use Live Location`;
  }

  let type = 'generic';
  if (error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:     type = 'denied';      break;
      case error.POSITION_UNAVAILABLE:  type = 'unavailable'; break;
      case error.TIMEOUT:               type = 'timeout';     break;
    }
  }

  showLocationError(type);
}

/* ============================================================
   SHOW / HIDE ERROR
   ============================================================ */
const errorMessages = {
  denied:      'Location permission was denied. Please enter your delivery address manually.',
  unavailable: 'Your location could not be detected. Please try again or enter your address manually.',
  timeout:     'Location detection took too long. Please try again or enter your address manually.',
  unsupported: 'Live location isn\'t supported in this browser. Please enter your address manually.',
  generic:     'We couldn\'t access your live location. Please enter your delivery address manually.',
};

function showLocationError(type) {
  const message = errorMessages[type] || errorMessages.generic;
  if (ui.errorEl) {
    ui.errorEl.classList.add('visible');
    ui.errorEl.removeAttribute('hidden');
  }
  if (ui.errorMsg) ui.errorMsg.textContent = message;
  // Keep manual address visible
  ui.manualWrapper?.classList.remove('hidden');
}

function hideLocationError() {
  if (ui.errorEl) {
    ui.errorEl.classList.remove('visible');
    ui.errorEl.setAttribute('hidden', '');
  }
}

/* ============================================================
   RESET TO MANUAL (Change Location)
   ============================================================ */
function resetLocationToManual() {
  locationState.mode    = 'none';
  locationState.lat     = null;
  locationState.lng     = null;
  locationState.mapsUrl = null;
  locationState.address = ui.manualInput?.value?.trim() || null;

  // Hide success
  if (ui.successEl) {
    ui.successEl.classList.remove('visible');
    ui.successEl.setAttribute('hidden', '');
  }

  // Hide error
  hideLocationError();

  // Show manual + OR + button
  ui.manualWrapper?.classList.remove('hidden');
  ui.locationOrDiv?.classList.remove('hidden');
  ui.locationBtnWrap?.classList.remove('hidden');

  ui.manualInput?.focus();
}

/* ============================================================
   HTTPS WARNING
   ============================================================ */
function checkGeolocationCompatibility() {
  const proto = window.location.protocol;
  const host  = window.location.hostname;

  if (proto !== 'https:' && host !== 'localhost' && host !== '127.0.0.1') {
    const warning = document.getElementById('location-https-warning');
    if (warning) {
      warning.classList.remove('hidden');
      warning.textContent = '⚠️ Live location requires HTTPS. Please use your delivery address manually, or access this site over a secure connection.';
    }
    const btn = document.getElementById('use-live-location-btn');
    if (btn) {
      btn.disabled = true;
      btn.title = 'Requires HTTPS or localhost';
    }
  }
}

/* ============================================================
   GET LOCATION PAYLOAD (for checkout.js)
   ============================================================ */
window.getLocationPayload = function() {
  return {
    mode:     locationState.mode,
    lat:      locationState.lat,
    lng:      locationState.lng,
    mapsUrl:  locationState.mapsUrl,
    address:  locationState.mode === 'manual'
                ? (document.getElementById('delivery-address')?.value?.trim() || '')
                : null,
  };
};

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initLocationUI();
  checkGeolocationCompatibility();
});
