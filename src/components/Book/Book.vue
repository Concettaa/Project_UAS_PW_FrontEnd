<template>

    <main id="book_list">
        <section class="books">        
            <div class="book">
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
                    </div>
                    <v-btn @click="openBook(data)">
                        Read
                    </v-btn>
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
    </div>
        </section>
    </main>
</template>

<script>
// import BookCard from './BookCard.vue';

export default {
    name: 'Book',
    data() {
        return {
            datas: [],
            dialog: false,
            dialogData: {
                judul: null,
                tahun_terbit: null,
                genre: null,
                deskripsi: null,
                link_gambar: null,
                isi: null
            },
            search: null,
            
        };
    },

    methods:{
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

        openBook(data){
            this.dialogData.judul = data.judul;
            this.dialogData.tahun_terbit = data.tahun_terbit;
            this.dialogData.genre = data.genre;
            this.dialogData.deskripsi = data.deskripsi;
            this.dialogData.isi = data.isi;
            this.dialogData.link_gambar = data.link_gambar;
            this.dialog = true;
        }
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
    
</style>