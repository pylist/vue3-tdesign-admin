import { request } from '@/utils/request';

export function CreateRole(data) {
  return request.post({
    url: '/super/roles/create',
    data,
  });
}

export function DeleteRole(data) {
  return request.post({
    url: '/super/roles/delete',
    data,
  });
}

export function UpdateRole(data) {
  return request.post({
    url: '/super/roles/update',
    data,
  });
}

export function ListRole(data) {
  return request.get({
    url: '/super/roles/list',
    params: data,
  });
}
