(function (window) {
  window["env"] = window["env"] || {};
  // Environment variables
  window["env"]["production"] = "${IS_PRODUCTION}" || true;
  window["env"]["environmentName"] = "${ENVIRONMENT_NAME}" || "production";
  window["env"]["BACKEND_API_URL"] = "${BACKEND_API_URL}";
  window["env"]["PII_IDENTIFICATION_ACTIVE"] = "${PII_IDENTIFICATION_ACTIVE}" || false;
  window["env"]["BY_PASS_LOGIN"] = "${BY_PASS_LOGIN}" || false;
  window["env"]["ADMIN_EMAIL"] = "${ADMIN_EMAIL}";
  window["env"]["ADMIN_PASSWORD"] = "${ADMIN_PASSWORD}";
  window["env"]["SUPER_ADMIN_EMAIL"] = "${SUPER_ADMIN_EMAIL}";
  window["env"]["SUPER_ADMIN_PASSWORD"] = "${SUPER_ADMIN_PASSWORD}";
  window["env"]["USER_EMAIL"] = "${USER_EMAIL}";
  window["env"]["USER_PASSWORD"] = "${USER_PASSWORD}";
})(this);