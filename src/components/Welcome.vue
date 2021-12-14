<template>
  <v-carousel
    cycle
    height="900"
    hide-delimiter-background
    show-arrows-on-hover
  >

    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="text-h1">
            {{ slide }} Si Books
          </div>
          <div class="topbutton">
            <v-btn depressed @click="register"> Register </v-btn>
            <div class="bottombutton">
              <v-btn depressed color="primary" @click="login"> Login </v-btn>
              <div class="bottombutton">
                <v-btn depressed color="success" @click="loginAdmin"> Login Admin </v-btn>
              </div>
            </div>
          </div>
        </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
      name: "Welcome",
    data () {
      return {
        items: [{
            src: 'https://images2.alphacoders.com/992/992484.jpg',
          },
          {
            src: 'https://images5.alphacoders.com/394/thumb-1920-394862.jpg',
          },
          {
            src: 'https://images8.alphacoders.com/411/411522.jpg',
          },
          {
            src: 'https://images6.alphacoders.com/412/thumb-1920-412619.jpg',
          },
          {
            src: 'https://images2.alphacoders.com/261/thumb-1920-26102.jpg',
          },
        ],
      };
    },

    methods:{
      login(){
            localStorage.setItem('token', null);
            this.$router.push({
                name: 'Login',
            });
        },

      register(){
            localStorage.setItem('token', null);
            this.$router.push({
                name: 'Register',
            });
        },

      loginAdmin(){
            localStorage.setItem('token', null);
            this.$router.push({
                name: 'LoginAdmin',
            });
        },
    }
  }
</script>
<style>
  .topbutton{
    width: 85%;
    
  }

  .bottombutton{
    margin-top: 20px;
  }

  .text-h1{
    color: white;
  }
</style>