<template>
    <main>
        <v-container fluid fill-height class="posisinya">
            <v-layout flex align-center justify-center>
                <v-flex xs12 sm6 elevation-6>
                    <v-toolbar class="grey darken-3">
                         <v-toolbar-title class="grey--text">
                            <h1>Login</h1>
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card>
                        <v-card-text class="pt-4">
                            <div>
                                <v-form v-model="valid" ref="form">
                                    <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
                                    <v-text-field label="Password" v-model="password" type="password" min="8" :rules="passwordRules" counter required></v-text-field>
                                    <v-layout>
                                        <v-layout justify-start>
                                            <v-btn @click="register" depressed color="primary">Register</v-btn>
                                        </v-layout>
                                        <v-layout justify-end>
                                            <v-btn class="mr-2" @click="submit" color="success" :class=" { 'grey darken-1 white--text' : valid, disabled: !valid }"> Go </v-btn>
                                            <v-btn @click="clear" class="red darken-3 white--text">Clear</v-btn>
                                        </v-layout>
                                    </v-layout>
                                </v-form>
                            </div>
                        </v-card-text>
                    </v-card>
                    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
                    <v-snackbar v-model="success" color="green" timeout="2000" bottom> Verifikasi Email Berhasil </v-snackbar>
                </v-flex>
            </v-layout>
        </v-container>
    </main>
</template>

<style>
    @import url("https://fonts.googleapis.com/css?family=Jolly%20Lodger");
    .grey--text{
        font-family: "Jolly Lodger";
    }

    .posisinya{
        position: absolute;
        top: 20px;
        left: 0;
        right: 0;
    }
</style>

<script>
export default {
    name: "Login",
    data(){
        return{
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            valid: false,
            password: '',
            passwordRules: [
                (v) => !!v || 'Password tidak boleh kosong :(',
            ],
            email:'',
            emailRules: [
                (v) => !!v || 'E-mail tidak boleh kosong :(',
            ]
        };
    },

    methods: {
        submit(){
            if(this.$refs.form.validate()){
                if(this.email === "admin@gmail.com"){
                    this.error_message = 'This is for user';
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                }else{
                    this.load = true;
                    this.$http.post(this.$api + '/login', {
                        email: this.email,
                        password: this.password
                    }).then(response => {
                        localStorage.setItem('id', response.data.user.id);
                        localStorage.setItem('token', response.data.access_token);
                        localStorage.setItem('user',response.data.user.name);
                        localStorage.setItem('email',response.data.user.email);
                        this.error_message = response.data.message;
                        this.color = "green";
                        this.snackbar = true;
                        this.load = true;
                        this.clear();
                        this.$router.push({
                            name: 'Dashboard',
                        });
                    }).catch(error =>{
                        this.error_message = error.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                        localStorage.removeItem('token');
                        this.load = false;
                    })
                }   
            }
        },

        clear() {
            this.$refs.form.reset()
        },

        register(){
            localStorage.setItem('token', null);
            this.$router.push({
                name: 'Register',
            });
        },
        showVerified(){
            if(this.$route.query.verified == 'success'){
                this.success = true;
                this.router.push(
                    '/login'
                );
            }
        },
    },
    
    mounted(){
        this.showVerified();
    },
};
</script>