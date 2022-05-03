const user = {
  state: {
    token: '',
    name: '',
    toast:true,
    authenticated:false,
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_INFO: (state, info) => {
      state.info = info;
    },
    SET_TOAST: (state, toast) => {
      state.toast = toast;
    },
    SET_AUTHENTICATED: (state, authenticated) => {
      state.authenticated = authenticated;
    },
  },

  actions: {
    // Logout
    Logout (context) {
      context.commit("SET_TOKEN","");
      context.commit("SET_NAME","");
      context.commit("SET_INFO",{});
      context.commit("SET_AUTHENTICATED",false);
      context.commit("SET_TOAST",true);
    }
  }
}

export default user
