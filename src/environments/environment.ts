// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false
// };
let browserWindow = window as any;
export const environment = {
  production: false,
  environmentName: "",
  BACKEND_API_URL: 'http://localhost:3000',
  // PII_IDENTIFICATION_ACTIVE: browserWindow['env']['PII_IDENTIFICATION_ACTIVE'],
  // BY_PASS_LOGIN: browserWindow['env']['BY_PASS_LOGIN'],
  // ADMIN_EMAIL: browserWindow['env']['ADMIN_EMAIL'],
  // ADMIN_PASSWORD: browserWindow['env']['ADMIN_PASSWORD'],
  // SUPER_ADMIN_EMAIL: browserWindow['env']['SUPER_ADMIN_EMAIL'],
  // SUPER_ADMIN_PASSWORD: browserWindow['env']['SUPER_ADMIN_PASSWORD'],
  // USER_EMAIL: browserWindow['env']['USER_EMAIL'],
  // USER_PASSWORD: browserWindow['env']['USER_PASSWORD']
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
