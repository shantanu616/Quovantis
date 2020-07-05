const baseurl="https://reqres.in/api"
export const TAG="WEB";
export const TOKEN=localStorage.getItem('quovantis_web_token')==null?null:localStorage.getItem('quovantis_web_token');
export const LOGIN=baseurl+"/login";
export const USERLIST=baseurl+"/users"
