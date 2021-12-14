<template>
    <main id="book_list">
        <section class="books">        
            <div class="book">
                <v-btn class="ma-2" color="primary" @click="dialogEdit = true"> Tambah Buku </v-btn>
                <v-card v-for="data in datas"
                :key="data.id"
                :search="search">
                <div class="book-inner">
                    <div class="book-image-wrap">
                        <img :src="data.link_gambar" class="image" style="width: 500px; height: 250px"/>
                    </div>
                    <div class="book-detail">
                        <h2>{{ data.judul }}</h2>
                        <p>{{ data.deskripsi }}</p>
                        <h3>Terbit pada {{data.tahun_terbit}}</h3>
                    </div>
                    <v-btn class="ma-2" @click="openBook(data)">Read</v-btn>
                    <v-btn class="ma-2" color="success" @click="editBook(data)">Edit</v-btn>
                    <v-btn class="ma-2" color="red darken-3 white--text" @click="deleteBook(data)">Delete</v-btn>
                </div>
                </v-card>
        <v-dialog
            v-model="dialog"
            fullscreen
            transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar dark color="#23395d">
                    <v-btn icon light @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Book</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text @click="dialog = false">
                            Close
                            </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <h1>{{ dialogData.judul }}</h1>
                <h6>Genre : {{ dialogData.genre }}</h6>
                <div class="dialog-image-wrap">
                    <img :src="dialogData.link_gambar" class="image" style="width: 300px; height: 250px"/>
                </div>
                <p style="
                    text-align: justify;
                    margin: 25px 240px 25px 240px;
                    "
                >{{ dialogData.isi }}</p>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="dialogEdit"
            fullscreen
            transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar dark color="#23395d">
                    <v-btn icon light @click="cancel">
                            <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Book</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text @click="setForm"> Confirm </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-text-field class="posisi" label="Judul" v-model="judul"></v-text-field>
                <v-text-field class="posisi" label="Genre" v-model="genre"></v-text-field>
                <v-text-field class="posisi" label="Tahun Terbit" v-model="tahun_terbit"></v-text-field>
                <v-text-field class="posisi" label="Deskripsi" v-model="deskripsi"></v-text-field>
                <v-text-field class="posisi" label="Link Gambar" v-model="link_gambar"></v-text-field>
                <label> Isi </label>
                <v-divider></v-divider>
                <textarea class="posisi" v-model="isi" style="width: 1550px"></textarea>
                <!-- <v-text-field class="posisi" label="Isi" v-model="isi" ></v-text-field> -->
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
                <v-card-title class="text-h5">Apakah anda yakin menghapus buku ini?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteData">OK</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
        </section>
    </main>
</template>

<script>
// import BookCard from './BookCard.vue';

export default {
    name: 'BookAdmin',
    data() {
        return {
            inputType: 'Tambah',
            data: new FormData,
            datas: [],
            dialog: false,
            dialogEdit: false,
            dialogDelete: false,
            dialogData: {
                judul: null,
                tahun_terbit: null,
                genre: null,
                deskripsi: null,
                link_gambar: null,
                isi: null
            },
            search: null,
            judul: null,
            tahun_terbit: null,
            genre: null,
            deskripsi: null,
            link_gambar: null,
            isi: null
        };
    },

    methods:{
        setForm(){
            if(this.inputType !== 'Tambah'){
                this.update();
            }else{
                this.save();
            }
        },

        readData(){
            var url = this.$api + '/buku';
            this.$http.get(url, {
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.datas = response.data.data;
            })
        },

        save(){
            this.data.append('judul', this.judul);
            this.data.append('tahun_terbit', this.tahun_terbit);
            this.data.append('genre', this.genre);
            this.data.append('deskripsi', this.deskripsi);
            this.data.append('link_gambar', this.link_gambar);
            this.data.append('isi', this.isi);
            var url = this.$api + '/buku'
            this.load = true;
            this.$http.post(url, this.data, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.error_message =  response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.readData();
                this.resetForm();
                this.close();
            }).catch(error =>{
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },

        openBook(data){
            this.dialogData.judul = data.judul;
            this.dialogData.tahun_terbit = data.tahun_terbit;
            this.dialogData.genre = data.genre;
            this.dialogData.deskripsi = data.deskripsi;
            this.dialogData.isi = data.isi;
            this.dialogData.link_gambar = data.link_gambar;
            this.dialog = true;
        },

        editBook(data){
            this.inputType = 'Ubah';
            this.id = data.id;
            this.judul = data.judul;
            this.tahun_terbit = data.tahun_terbit;
            this.genre = data.genre;
            this.deskripsi = data.deskripsi;
            this.isi = data.isi;
            this.link_gambar = data.link_gambar;
            this.dialogEdit = true;
        },

        update(){
            let newData = {
                judul: this.judul,
                tahun_terbit: this.tahun_terbit,
                genre: this.genre,
                deskripsi: this.deskripsi,
                isi: this.isi,
                link_gambar: this.link_gambar
            };
            var url = this.$api + '/buku/' + this.id;
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
                this.close();
                this.readData();
                this.resetForm();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            })
        },

        close(){
            this.dialogEdit = false;
            this.inputType = 'Tambah';
            this.dialogDelete = false;
            this.readData();
        },

        cancel(){
            this.resetForm();
            this.readData();
            this.inputType = 'Tambah';
            this.dialogEdit = false;
        },

        resetForm(){
            this.judul = null;
            this.tahun_terbit = null;
            this.genre = null;
            this.deskripsi = null;
            this.link_gambar = null;
            this.isi = null;
            this.inputType = 'Tambah';
        },

        deleteBook(data){
            this.id = data.id;
            this.dialogDelete = true;
        },

        deleteData(){
            var url = this.$api + '/buku/' + this.id;
            this.load = true;
            this.$http.delete(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.close();
                this.readData();
                this.resetForm();
                this.inputType = "Tambah";
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
    },

    computed: {
        formTitle(){
            return this.inputType;
        },
    },

    mounted(){
        this.readData();
    },
}
</script>

<style>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'montseratt', sans-serif;
    }

    main {
        width: 100vw;
        /* min-height: 100vh; */
        background-color: whitesmoke;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .books {
        display: flex;
        max-width: 720px;
        padding: 25px;
        margin: 0 auto;
        background-color: #23395d;
    }

    .book{
        flex: 1 1 33.333%;
        width: 100%;
        padding: 25px;
    }

    .book-inner {
        position: relative;
        padding: 25px;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
        margin-bottom: 10px;
    }

    .book-image-wrap {
        position: relative;
        z-index: 1;
        transform-origin: center;
    }
    .book-image-wrap .image {
        max-width: 100%;
    }

    .posisi{
        margin-left: 100px;
        margin-right: 100px;
        margin-top: 20px;
    }
    
</style>