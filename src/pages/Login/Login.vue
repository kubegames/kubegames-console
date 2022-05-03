<template>
  <v-app>
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="7" class="main-part d-none d-md-none d-lg-flex">
          <div class="d-flex">
            <!-- <v-img src="@/assets/kubegames.png" contain width="120" height="120"></v-img> -->
            <p>Welcome</p>
            <p class="login-slogan display-1 text-center font-weight-medium mb-10">kubegames</p>
          </div>
        </v-col>
        <v-col cols="12" lg="5" class="login-part d-flex align-center justify-center">
          <v-row no-gutters class="align-start">
            <v-col cols="12" class="login-part d-flex align-center justify-center flex-column">
              <div class="login-wrapper pt-md-4 pt-0">
                <v-tabs grow>
                  <v-tabs-slider></v-tabs-slider>
                  <v-tab :href="`#tab-login`">
                    LOGIN
                  </v-tab>
                  <v-tab :href="`#tab-newUser`">
                    New User
                  </v-tab>

                  <v-tab-item :value="'tab-login'" >
                    <v-form>
                      <v-container>
                        <v-row class="flex-column">
                          <!-- <v-col>
                            <p class="login-slogan display-2 text-center font-weight-medium mt-10"></p>
                            <p class="login-slogan display-1 text-center font-weight-medium mb-10">login your account</p>
                          </v-col> -->
                          <v-form>
                            <v-col>
                              <v-text-field
                                  v-model="phone"
                                  :rules="phoneRules"
                                  placeholder="Your Phone Number"
                                  required
                              ></v-text-field>
                              <v-text-field
                                  v-model="password"
                                  :rules="passRules"
                                  type="password"
                                  placeholder="Password"
                                  hint="At least 6 characters"
                                  required
                              ></v-text-field>

                            </v-col>
                            <v-col class="d-flex justify-space-between">
                              <v-btn
                                  class="text-capitalize"
                                  large
                                  :disabled="password.length === 0 || phone.length === 0"
                                  color="primary"
                                  @click="login"
                              >
                                Login</v-btn>
                              <!-- <v-btn large text class="text-capitalize primary--text">Forget Password</v-btn> -->
                            </v-col>
                          </v-form>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-tab-item>

                  <v-tab-item :value="'tab-newUser'" >
                    <v-form>
                      <v-container>
                        <v-row class="flex-column">

                          <!-- <v-col>
                            <p class="login-slogan display-2 text-center font-weight-medium mt-10">Welcome!</p>
                            <p class="login-slogan display-1 text-center font-weight-medium mb-10">create your account</p>
                          </v-col> -->

                          <v-form>
                            <v-col>
                              <v-text-field
                                  v-model="createFullName"
                                  label="Full Name"
                                  required
                              ></v-text-field>
                              <v-text-field
                                  v-model="createPhone"
                                  :rules="phoneRules"
                                  label="Your Phone Number"
                                  required
                              ></v-text-field>
                              <v-text-field
                                  v-model="createPassword"
                                  :rules="passRules"
                                  type="password"
                                  label="Password"
                                  hint="At least 6 characters"
                                  required
                              ></v-text-field>
                            </v-col>
                            <v-col class="d-flex justify-space-between">
                              <v-btn
                                  large
                                  block
                                  :disabled="createFullName.length === 0 || createPhone.length === 0 || createPassword === 0"
                                  color="primary"
                                  @click="login"
                              >
                                Create your account</v-btn>
                            </v-col>
                          </v-form>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-tab-item>

                </v-tabs>
              </div>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-footer>
                <div class="primary--text">© 2022 <a class="text-decoration-none">Kubegames</a>, LLC. All rights reserved.</div>
              </v-footer>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
  import { PlayerInfo, Login } from '@/api/login';
  import store from '@/store/index';
  export default {
    name: 'Login',
    data() {
      return {
        phone: '',
        phoneRules: [
          v => !!v || 'your phone number is required',
          v => /^1(3|4|5|6|7|8|9)\d{9}$/.test(v) || 'your phone number is incorrect',
        ],
        createFullName: 'Kubegames Test',
        createPhone: '13688888888',
        createPassword: '123456',
        password: '',
        passRules: [
          v => !!v || 'password is required',
          v => v.length >= 6 || 'min 6 characters'
        ]
      }
    },
    methods: {
      playerInfo(){
        PlayerInfo().then(response => {
          console.log("playerInfo",response)
          store.commit("SET_NAME",response.data.playerInfo.nick);
          store.commit("SET_INFO",response.data.playerInfo);
          this.$router.push('/dashboard');
        }).catch(error => {
          console.log("error",error.msg)
        })
      },
      login(){
        Login({phone:this.phone, password:this.password}).then(response => {
          if (response.code === 200){
            console.log("Login",response.data);
            store.commit("SET_TOKEN",response.data.token);
            store.commit("SET_AUTHENTICATED",true);
            this.$router.push('/');
            return
          }
          this.$toast.error(response.msg);
        }).catch(error => {
          console.log("login error",error)
          this.$toast.error(error.msg);
        })
        
      }
    }
  }

</script>

<style src="./Login.scss" lang="scss"/>
