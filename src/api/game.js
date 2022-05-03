import request from '@/http/request'

const gameApi = {
  gameAdd: '/game/v1/add',
  gameStart: '/game/v1/start',
  gameFind: '/game/v1/find',
  gameFinds: '/game/v1/finds',
  gameClose: '/game/v1/close'
}

export function GameAdd (data) {
  return request({
    url: gameApi.gameAdd,
    method: 'post',
    data: data
  })
} 

export function GameStart (data) {
  return request({
    url: gameApi.gameStart,
    method: 'post',
    data: data
  })
} 

export function GameFind (gameid) {
  return request({
    url: gameApi.gameFind+"/"+gameid,
    method: 'get'
  })
}

export function GameFinds () {
  return request({
    url: gameApi.gameFinds,
    method: 'get'
  })
}

export function GameClose (gameid) {
  return request({
    url: gameApi.gameClose+"/"+gameid,
    method: 'delete'
  })
}