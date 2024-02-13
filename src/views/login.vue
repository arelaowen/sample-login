<template>
  <div>
    <Alert :data="alert" />
      <v-app>
        <v-card class="ma-auto" width="40%">
          <v-form ref="form" lazy-validation>
          <v-card-title class="text-h4 blue darken-4 white--text">
            <v-spacer/>Login Page
            <v-spacer/>
          </v-card-title>
          <v-divider/>
          <v-card-text class="pb-0">
            <v-text-field
            v-model="username"
            outlined
            label="Username"
            prepend-inner-icon="mdi-account"
            ></v-text-field>
            <v-text-field
            v-model="password"
            outlined
            :type="hide ? 'password' : 'text'"
            label="Password"
            prepend-inner-icon="mdi-key"
            :append-icon="hide ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="hide = !hide"
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="mx-2 mb-2">
            <v-btn block :loading="loader" class="success" type="submit" :disabled="btnDisabled" @click.prevent="login">Log In</v-btn>
          </v-card-actions>
          </v-form>
        </v-card>
      </v-app>
  </div>
</template>

<script>
const md5 = require("md5");
import Alert from '@/components/Alert.vue'
export default {
  components: {Alert},
  data(){
    return {
      hide: true,
      loader:false,
      username: '',
      password: '',
      token: '',
      alert: {}
    }
  },
  computed:{ 
    btnDisabled(){
        if(this.username && this.password){
          return false
        }else{
          return true
        }
    }
  },
  created(){
    this.generateToken();
  },
  methods: {
    generateToken(){
      const TokenGenerator = require('uuid-token-generator');
      const tokgen2 = new TokenGenerator(256, TokenGenerator.BASE64);
      this.$set(this, 'token', tokgen2.generate());
    },
    async login(){
      try{
        let model = {
          username: this.username,
          password: md5(this.password),
          token: this.token
        }
        const { data } = await this.$axios({
                          method: 'post',
                          url:"/login",
                          data: model
                      })
        // if sucess
        if(data.status == 1){
           this.$set(this, 'alert',{
            status: true,
            type: 'success',
            text: "Login Sucessful!"
          })
          this.$session.set('user', data.data);
          this.$session.set('token', this.token);
          setTimeout(() => {
            this.$router.push({path: '/dashboard'}).catch(()=>{})
          }, 1800);
        }
        // if blocked
        if(data.status == 4){
          this.$set(this, 'alert',{
            status: true,
            type: 'error',
            text: "Your user credential is blocked! Please try again later"
          })
        }
        // if password is incorrect
        if(data.status == 2){
          this.$set(this, 'alert',{
            status: true,
            type: 'warning',
            text: `Password is incorrect! Attempt Remaining: ${data.data}`
          })
        }
        // if user does not exists
        if(data.status == 3){
          this.$set(this, 'alert',{
            status: true,
            type: 'error',
            text: "User does not exists!"
          })
        }
      }catch(err){}
    }
  }
}
</script>