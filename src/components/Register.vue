<template>
<main>
    <v-container fluid fill-height class="location">
        <v-layout flex align-center justify-center>
            <v-flex xs12 sm6 elevation-8>
                <v-card>
                    <v-card-title class="justify-center">Registration form</v-card-title>
                    <v-card-text class="pt-4">
                        <div>
                            <v-form v-model="valid" ref="form">
                                <v-text-field label="Nama" v-model="nama" :rules="nameRules" required></v-text-field>
                                <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
                                <v-text-field label="Password" v-model="password" type="password" min="8" :rules="passwordRules" counter required></v-text-field>
                                <v-layout>
                                    <v-layout>
                                        <v-btn depressed color="primary" @click="login"> Login </v-btn>
                                    </v-layout>
                                    <v-layout justify-end>
                                        <v-btn class="mr-2" @click="submit" color="success" :class=" { 'grey darken-1 white--text' : valid, disabled: !valid }"> Register </v-btn>
                                        <v-btn @click="clear" class="red darken-3 white--text">Clear</v-btn>
                                    </v-layout>
                                </v-layout>
                            </v-form>
                        </div>
                    </v-card-text>
                </v-card>
                <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
            </v-flex>
        </v-layout>
    </v-container>
</main>
</template>

<style>
    .location{
        position: relative;
    }
</style>
<script>
    export default {
        name: "Register",
        data(){
            return{
                load: false,
                snackbar: false,
                error_message: '',
                color: '',
                valid: false,
                nama: '',
                nameRules:[
                    (v) => !!v || 'Nama tidak boleh kosong',
                ],
                password: '',
                passwordRules: [
                    (v) => !!v || 'Password tidak boleh kosong',
                ],
                email:'',
                emailRules: [
                    (v) => !!v || 'E-mail tidak boleh kosong',
                ]
            }
        },

        methods: {
            submit(){
                if(this.$refs.form.validate()){
                    this.load = true;
                    this.$http.post(this.$api + '/register', {
                        name: this.nama,
                        email: this.email,
                        password: this.password
                    }).then(response => {
                        this.error_message = response.data.message;
                        this.color = "green";
                        this.snackbar = true;
                        this.load = true;
                        this.clear();
                        this.$router.push({
                            name: 'Login',
                        });
                    }).catch(error =>{
                        this.error_message = error.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                        this.load = false;
                    })
                }
            },

            clear() {
                this.$refs.form.reset()
            },

            login(){
                localStorage.setItem('token', null);
                this.$router.push({
                    name: 'Login',
                });
            },

        },
    };
</script>