# Back-end Template

## How to use
```shell
# clone repository
git clone https://github.com/dertrockx/backend-template.git
# install dependencies
npm install
# run server
npm run install
```

## Details
* It has built-in JWT for basic authentication with the following endpots and uses
   * ```POST``` **/users** - a registration endpoint
   * ```POST``` **/users/login/** - login endpoint
   * ```POST``` **/users/me** *Headers: { 'Authorization' : 'Bearer <TOKEN>'}*  - returns user object based on the token
   * ```POST``` **/users/me/logout** *Headers: { 'Authorization' : 'Bearer <TOKEN>'}* - delete token from database
   * ```POST``` **/users/me/logoutall** *Headers: { 'Authorization' : 'Bearer <TOKEN>'}* - delete all tokens created from all devices