(function (window) {
  window["env"] = window["env"] || {};
  // Environment variables
  window["env"]["production"] = false;
  window["env"]["environmentName"] = "local";
  window["env"]["BACKEND_API_URL"] = "http://localhost:3000";
  window["env"]["PII_IDENTIFICATION_ACTIVE"] = true;
  window["env"]["BY_PASS_LOGIN"] = true;
  window["env"]["ADMIN_EMAIL"] = "admin@protecto.ai";
  window["env"]["ADMIN_PASSWORD"] = "protecto2022";
  window["env"]["SUPER_ADMIN_EMAIL"] = "superadmin@protecto.ai";
  window["env"]["SUPER_ADMIN_PASSWORD"] = "protecto2022";
  window["env"]["USER_EMAIL"] = "user@protecto.ai";
  window["env"]["USER_PASSWORD"] = "protecto2022";
})(this);