<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">Game Management</h1>
        <!-- <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              color="secondary"
              class="text-capitalize button-shadow mr-1"
              >Latest Reports</v-btn
            >
          </template>
        </v-menu> -->
        <v-btn color="primary" elevation="2" @click="clickAddGameDialog()">
          <v-icon dark>
            mdi-plus
          </v-icon>
          Add Game
        </v-btn>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="support-requests mx-1 mb-1">
            <v-card-title class="pa-6 pb-0">
              <p>Game List</p>
              <v-spacer></v-spacer>
              <v-text-field append-icon="mdi-magnify" placeholder="Search" @click:append="clickSearch()"></v-text-field>
              <!-- <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="textColor">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-list-item-title>Add Game</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu> -->
            </v-card-title>
            <v-card-text class="pa-0">
              <v-simple-table>
                <template v-slot:default>
                  <thead class="pl-2">
                    <tr>
                      <th class="text-left pa-6">GameID</th>
                      <th class="text-left">Name</th>
                      <th class="text-left">Image</th>
                      <th class="text-left">Port</th>
                      <th class="text-left">Replicas</th>
                      <th class="text-left">Platform</th>
                      <th class="text-left">MaxPeople</th>
                      <th class="text-left">Runmode</th>
                      <th class="text-left">Operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in gameList" :key="item.id">
                      <td class="pa-6">{{ item.gameID }}</td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.image }}</td>
                      <td>{{ item.port }}</td>
                      <td>{{ item.replicas }}</td>
                      <td>{{ item.config.platform }}</td>
                      <td>{{ item.config.maxPeople }}</td>
                      <td>{{ item.config.runmode }}</td>
                      <td v-if="item.status">
                        <v-chip link color="secondary" class="ma-2 ml-0" @click="stopGameDialog(item)">
                          Stop
                        </v-chip>
                      </td>
                      <td v-else-if="!item.status">
                        <v-chip link color="success" class="ma-2 ml-0" @click="startGameDialog(item)">
                          Run
                        </v-chip>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 启动游戏弹框 -->
      <v-dialog v-model="startGameForm.dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Start Game</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form
                ref="startGameForm"
                v-model="startGameForm.valid"
                lazy-validation
              >
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      placeholder="Name"
                      required
                      disabled
                      hint="game name"
                      persistent-hint
                      v-model="startGameForm.name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      placeholder="GameID"
                      required
                      disabled
                      hint="gameid"
                      persistent-hint
                      v-model="startGameForm.gameID"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="startGameForm.image"
                      placeholder="Image"
                      hint="game image address"
                      persistent-hint
                      :rules="startGameForm.imageRules"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="startGameForm.port"
                      placeholder="Game Running Port"
                      hint="game running port"
                      persistent-hint
                      type="number"
                      :rules="startGameForm.portRules"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="startGameForm.replicas"
                      placeholder="Game Running Replicas"
                      hint="game running replicas "
                      persistent-hint
                      type="number"
                      :rules="startGameForm.replicasRules"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="startGameForm.cpu"
                      placeholder="Game Cpu Limit"
                      hint="game cpu limit (1000 = 1cpu)"
                      persistent-hint
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="startGameForm.memory"
                      placeholder="Game Memory Limit"
                      hint="game memory limit (1 = 1Mi)"
                      persistent-hint
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="startGameForm.commond"
                      placeholder="Game Running Commonds"
                      hint="game running commonds"
                      solo
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              :loading="startGameForm.loading"
              @click="closeGameDialog()"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              :loading="startGameForm.loading"
              @click="startGame()"
            >
              Start
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 停止游戏弹框 -->
      <v-dialog v-model="stopGameForm.dialog" max-width="290">
        <v-card>
          <v-card-title class="text-h5">
            Warning
          </v-card-title>
          <v-card-text>
            Do you want to stop the game?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              :loading="stopGameForm.loading"
              @click="stopGameForm.dialog = false"
            >
              Disagree
            </v-btn>

            <v-btn
              color="green darken-1"
              text
              :loading="stopGameForm.loading"
              @click="stopGame()"
            >
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 添加游戏弹框 -->
      <v-dialog v-model="addGameForm.dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Add Game</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form
                ref="addGameForm"
                v-model="addGameForm.valid"
                lazy-validation
              >
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      placeholder="Name"
                      required
                      hint="game name"
                      persistent-hint
                      :rules="addGameForm.nameRules"
                      v-model="addGameForm.name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      placeholder="GameID"
                      required
                      hint="gameid"
                      persistent-hint
                      type="number"
                      :rules="addGameForm.gameIDRules"
                      v-model="addGameForm.gameID"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="addGameForm.platform"
                      placeholder="Platform"
                      hint="platform address"
                      persistent-hint
                      :rules="addGameForm.platformRules"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="addGameForm.maxPeople"
                      placeholder="Game Allow Max People"
                      hint="game allow max people"
                      persistent-hint
                      type="number"
                      :rules="addGameForm.maxPeopleRules"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      :items="addGameForm.runmodes"
                      v-model="addGameForm.runmode"
                      placeholder="Game Running Mode"
                      :rules="addGameForm.runmodeRules"
                      hint="game running mode "
                      persistent-hint
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              :loading="addGameForm.loading"
              @click="cancelAddGameDialog()"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              :loading="addGameForm.loading"
              @click="successAddGameDialog()"
            >
              Add
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import { GameFinds, GameStart, GameClose, GameAdd } from '@/api/game';

export default {
  name: "Game",
  components: {
  },
  data() {
    return {
      apexLoading: false,
      gameList:[],
      addGameForm:{
        loading: false,
        valid: true,
        dialog: false,
        gameIDRules: [
          v => !!v || 'gameid is required',
          v => v > 0 || 'gameid must > 0',
        ],
        nameRules: [
          v => !!v || 'name is required',
        ],
        platformRules: [
          v => !!v || 'platform is required',
        ],
        maxPeopleRules: [
          v => !!v || 'maxPeople is required',
          v => v > 0 || 'maxPeople must > 0',
        ],
        runmodeRules: [
          v => !!v || 'runmode is required',
        ],
        runmodes:["dev"],
        gameID: 0,
        name: "",
        platform: "",
        maxPeople: 0,
        runmode: "",
      },
      stopGameForm:{
        dialog: false,
        gameID: 0,
        loading: false,
      },
      startGameForm:{
        valid: true,
        dialog: false,
        imageRules: [
          v => !!v || 'image is required',
        ],
        portRules: [
          v => !!v || 'port is required',
        ],
        replicasRules: [
          v => !!v || 'replicas is required',
        ],
        loading: false,
        name:"",
        gameID: 0,
        image: "",
        replicas: 0,
        port: 0,
        commonds: [],
        commond: "",
        cpu: 0,
        memory: 0
      }
    };
  },
  methods: {
    clickSearch(){
      console.log("clickSearch")
    },
    clickAddGameDialog(){
      this.addGameForm.dialog = true;
    },
    cancelAddGameDialog(){
      this.$refs.addGameForm.reset()
      this.addGameForm.dialog = false;
    },
    successAddGameDialog(){
      if (this.$refs.addGameForm.validate()){
        this.addGameForm.loading = true;
        GameAdd({
          gameID: parseInt(this.addGameForm.gameID),
          name: this.addGameForm.name,
          config:{
            platform: this.addGameForm.platform,
            maxPeople: parseInt(this.addGameForm.maxPeople),
            runmode: this.addGameForm.runmode,
          }
        }).then(response => {
          if (response.code === 200){
              this.$refs.addGameForm.reset();
              this.addGameForm.dialog = false;
              this.addGameForm.loading = false;
              this.gameFinds();
              return
            }
            this.$toast.error(response.msg);
            this.addGameForm.loading = false;
        }).catch(error => {
          console.log("error",error.msg)
          this.addGameForm.loading = false;
        })
      }
    },
    stopGameDialog(item){
      this.stopGameForm.gameID = item.gameID;
      this.stopGameForm.dialog = true;
    },
    stopGame(){
      this.stopGameForm.loading = true;
      GameClose(this.stopGameForm.gameID).then(response => {
        if (response.code === 200){
            this.stopGameForm.dialog = false;
            this.stopGameForm.loading = false;
            this.gameFinds();
            return
          }
          this.$toast.error(response.msg);
          this.stopGameForm.loading = false;
      }).catch(error => {
        console.log("error",error.msg)
        this.stopGameForm.loading = false;
      })
    },
    startGameDialog(item){
      this.startGameForm.loading = false;
      this.startGameForm.name = item.name;
      this.startGameForm.gameID = item.gameID;
      this.startGameForm.image = item.image;
      this.startGameForm.replicas = item.replicas;
      this.startGameForm.port = item.port;
      this.startGameForm.commond = "";
      this.startGameForm.cpu = 0;
      this.startGameForm.memory = 0;
      this.startGameForm.dialog = true;
    },
    closeGameDialog(){
      this.startGameForm.dialog = false;
      this.$refs.startGameForm.reset()
    },
    startGame(){
      if (this.$refs.startGameForm.validate()){
        //命令转换成数组
        this.startGameForm.commonds = this.startGameForm.commond.split(/[(\r\n)\r\n]+/);
        this.startGameForm.commonds.forEach((item,index)=>{
              if(!item){
                  this.startGameForm.commonds.splice(index,1);
              }
        })
        this.startGameForm.loading = true;
        GameStart({
          gameID: this.startGameForm.gameID,
          image: this.startGameForm.image,
          replicas: this.startGameForm.replicas,
          port: this.startGameForm.port,
          commonds: this.startGameForm.commonds,
          cpu: this.startGameForm.cpu,
          memory: this.startGameForm.memory
        }).then(response => {
          if (response.code === 200){
              this.startGameForm.dialog = false;
              this.startGameForm.loading = false;
              this.$refs.startGameForm.reset();
              this.gameFinds();
              return
            }
            this.$toast.error(response.msg);
            this.startGameForm.loading = false;
        }).catch(error => {
          console.log("error",error.msg)
          this.startGameForm.loading = false;
        })
      }
    },
    gameFinds(){
      GameFinds().then(response => {
        if (response.code === 200){
            this.gameList = response.data.Games;
            console.log("game list",this.gameList);
            return
          }
          this.$toast.error(response.msg);
      }).catch(error => {
        console.log("error",error.msg)
      })
    },
  },
  mounted() {
    setTimeout(() => {
      this.apexLoading = true;
    });
    this.gameFinds();
  },
};
</script>

<style src="./Game.scss" lang="scss"/>
