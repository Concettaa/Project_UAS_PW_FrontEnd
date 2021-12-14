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
                                    <v-text-field label="Nama" v-model="nama" :rules="nameRules" required></v-text-field>
                                    <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
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
    name: "ProfileAdmin",
    data(){
        return{
            id: localStorage.getItem('id'),
            nama: localStorage.getItem('user'),
            email: localStorage.getItem('email'),
        }
    },
}
</script>