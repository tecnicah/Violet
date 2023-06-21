// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
//node --max_old_space_size=4024 ./node_modules/@angular/cli/bin/ng serve --open

export const environment = {
  production: false,

  //  URL_EXPORT: 'http://localhost:4200/',// mi local 
   API_URL: 'https://localhost:44382/api/', // mi local 
  // API_URL_na: 'https://localhost:44382/', // mi local
  // images_path: "https://localhost:44382/" 

   images_path: "https://my.premierds.net/api-test-premier/",
   URL_EXPORT: 'https://my.premierds.net/demo/',
   //API_URL: "https://my.premierds.net/api-test-premier/api/", //demo sean
   API_URL_na: 'https://my.premierds.net/api-test-premier/', //dev
}
