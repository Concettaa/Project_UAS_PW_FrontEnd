<template>
    <main>
         <v-container fluid fill-height class="posisinya">
            <v-layout flex align-center justify-center>
                <v-flex xs12 sm6 elevation-6>
                    <v-toolbar class="primary">
                        <h1> Profile </h1>
                    </v-toolbar>
                    <v-card>
                        <v-card-text class="pt-4">
                            <div>
                                <v-form v-model="valid" ref="form">
                                    <v-text-field label="Nama" v-model="nama" :rules="nameRules" required>  </v-text-field>
                                    <v-text-field label="E-mail" v-model="email" :rules="emailRules" required>  </v-text-field>
                                    <v-layout>
                                        <v-layout justify-end>
                                            <v-btn class="mr-2" @click="submit" color="success" :class=" { 'grey darken-1 white--text' : valid, disabled: !valid }"> Done </v-btn>
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
<script>
export default {
    name: "Profile",
    data(){
        return{
            // profile: {
                id: localStorage.getItem('id'),
                nama: localStorage.getItem('user'),
                email: localStorage.getItem('email'),
            // }
        }
    },

    methods: {
        // readData(){
        //     var url = this.$api + '/user';
        //     this.$http.get(url, {
        //         headers:{
        //             'Authorization' : 'Bearer ' + localStorage.getItem('token')
        //         }
        //     }).then(response => {
        //         this.profiles = response.data.data;
        //     })
        // },

        submit(){
            let newData = {
                name: this.nama,
                email: this.email,
            };
            var url = this.$api + '/user/' + this.id;
            this.load = true;
            this.$http.put(url, newData, {
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                localStorage.setItem('user',this.nama);
                localStorage.setItem('email',this.email);
                this.$router.push({
                    name: 'Book'
                })
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            })
        },

        clear(){
            this.nama = null, this.email = null
        }
    }
}
</script>

<style>
h1{
    color: white;
}
</style>