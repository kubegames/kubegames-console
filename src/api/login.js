import request from '@/http/request'

const hallApi = {
  login: '/player/v1/login',
  playerInfo: '/player/v1/info',
}

export function Login (data) {
  return request({
    url: hallApi.login,
    method: 'post',
    data: data
  })
} 

export function PlayerInfo () {
  return request({
    url: hallApi.playerInfo,
    method: 'get'
  })
}
