
import router from './routes';
import store from '@/store/index';
import { PlayerInfo } from '@/api/login';

router.beforeEach((to, from, next)=>{
  if (store.state.user.authenticated === false || store.state.user.token === "") {  
    if(to.path === '/login'){   
      next();
    }else{
      next({path: '/login'});
    }
    return
  }

  if (Object.keys(store.state.user.info).length === 0){
    PlayerInfo().then(response => {
      store.commit("SET_NAME",response.data.playerInfo.nick);
      store.commit("SET_INFO",response.data.playerInfo);
      next();
    }).catch(error => {
      next({path: '/login'});
      console.log(error);
    })
    return
  }
  next();
})