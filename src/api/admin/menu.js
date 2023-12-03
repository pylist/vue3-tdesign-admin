import { request } from '@/utils/request';

export function CreateMenu(data) {
  return request.post({
    url: '/super/menus/create',
    data,
  });
}

export function GetMenus() {
  return request.get({
    url: '/super/menus/list',
  });
}

export function UpdateMenu(data) {
  return request.post({
    url: '/super/menus/update',
    data,
  });
}

export function DeleteMenu(data) {
  return request.post({
    url: '/super/menus/delete',
    data,
  });
}
