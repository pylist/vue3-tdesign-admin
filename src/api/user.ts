import { LoginResult } from '@/api/model/userModel';
import { request } from '@/utils/request';

export function Login(data: any) {
  return request.post<LoginResult>({
    url: '/login',
    data,
  });
}
