import http from 'k6/http';
import {check, group} from 'k6';

import { User } from '../lib/types/framework.types'
import { setSleep } from '../lib/sleep.helpers';

export function registerNewUser(_user: User, _url: string){
  group('Register a New User', () => {
  // register a new user using a 'post' request https://docs.k6.io/docs/post-url-body-params and store the response in 'res'
  let res = http.post(`${_url}/user/register/`, _user as {});

  // check that the user is created (that the response is '201') https://docs.k6.io/docs/checks
  check(res, { 'created user': (r) => r.status === 201 });
  })

  setSleep(0.5, 1);
}