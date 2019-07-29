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
   * ```POST``` *Headers: { 'Authorization' : 'Bearer <TOKEN>'}* **/users/me** - returns user object based on the token
   * ```POST``` *Headers: { 'Authorization' : 'Bearer <TOKEN>'}* **/users/me/logout** - delete token from database
   * ```POST``` *Headers: { 'Authorization' : 'Bearer <TOKEN>'}* **/users/me/logoutall** - delete all tokens created from all devices