import { request } from '@/utils/request';

export function CreateUser(data) {
  return request.post({
    url: '/super/users/create',
    data,
  });
}

export function UserList(data) {
  return request.get({
    url: '/super/users/list',
    params: data,
  });
}

export function UpdateUser(data) {
  return request.post({
    url: '/super/users/update',
    data,
  });
}

export function DeleteUser(data) {
  return request.post({
    url: '/super/users/delete',
    data,
  });
}
