<template>
    <main id="article_list">
        <section class="articles">
            <div class="book">
                <v-btn class="ma-2" color="primary" @click="dialogEdit = true"> Tambah Artikel </v-btn>
                <v-card v-for="article in articles" :key="article.id">
                <div class="article-inner">
                    <div class="article-image-wrap">
                        <img :src="article.link_gambar" class="image" style="width: 500px; height: 250px"/>
                    </div>
                    <div class="article-detail">
                        <h2>{{ article.title }}</h2>
                        <p>{{ article.short_desc }}</p>
                    </div>
                    <v-btn @click="openArticle(article)"> Read </v-btn>
                    <v-btn class="ma-2" color="success" @click="editArticle(article)">Edit</v-btn>
                    <v-btn class="ma-2" color="red darken-3 white--text" @click="deleteArticle(article)">Delete</v-btn>
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
                    <v-toolbar-title>Article</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn dark text @click="dialog = false">
                                Close
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <h1>{{ dialogData.title }}</h1>
                    <h6>Writer : {{ dialogData.writer }}</h6>
                    <div class="dialog-image-wrap">
                        <img :src="dialogData.link_gambar" class="image" style="width: 300px; height: 250px"/>
                    </div>
                    <p style="
                        text-align: justify;
                        margin: 25px 240px 25px 240px;
                        "
                    >{{ dialogData.content }}</p>
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
                            <v-toolbar-title>Article</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-toolbar-items>
                                <v-btn dark text @click="setForm"> Confirm </v-btn>
                            </v-toolbar-items>
                        </v-toolbar>
                        <v-text-field class="posisi" label="Judul" v-model="title"></v-text-field>
                        <v-text-field class="posisi" label="Genre" v-model="writer"></v-text-field>
                        <v-text-field class="posisi" label="Deskripsi" v-model="description"></v-text-field>
                        <v-text-field class="posisi" label="Link Gambar" v-model="link_gambar"></v-text-field>
                        <label> Isi </label>
                        <v-divider></v-divider>
                        <textarea class="posisi" v-model="content" style="width: 1550px"></textarea>
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

export default {
    name: 'article',
    data() {
        return {
            inputType: 'Tambah',
            article: new FormData,
            articles: [],
            dialog: false,
            dialogEdit: false,
            dialogDelete:false,
            dialogData: {
                 title: null, 
                 writer: null, 
                 content: null, 
                 short_desc: null,
                 link_gambar:null
            },
            title:null, 
            writer:null, 
            content:null, 
            short_desc:null,
            description:null,
            link_gambar:null
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
            var url = this.$api + '/artikel';
            this.$http.get(url, {
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.articles = response.data.data;
            })
        },

        openArticle(article){
            this.dialog=true;
            this.dialogData.title = article.title;
            this.dialogData.writer = article.writer;
            this.dialogData.content = article.content;
            this.dialogData.link_gambar = article.link_gambar;
        },

        save(){
            this.article.append('title', this.title);
            this.article.append('writer', this.writer);
            this.article.append('description', this.description);
            this.article.append('link_gambar', this.link_gambar);
            this.article.append('content', this.content);
            var url = this.$api + '/artikel'
            this.load = true;
            this.$http.post(url, this.article, {
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

        editArticle(article){
            this.inputType = 'Ubah';
            this.id = article.id;
            this.title = article.title;
            this.content = article.content;
            this.writer = article.writer;
            this.description = article.description;
            this.link_gambar = article.link_gambar;
            this.dialogEdit = true;
        },

        update(){
            let newData = {
                title: this.title,
                content: this.content,
                writer: this.writer,
                description: this.description,
                link_gambar: this.link_gambar
            };
            var url = this.$api + '/artikel/' + this.id;
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
            this.title = null;
            this.content = null;
            this.description = null;
            this.link_gambar = null;
            this.content = null;
            this.inputType = 'Tambah';
        },

        deleteArticle(article){
            this.id = article.id;
            this.dialogDelete = true;
        },

        deleteData(){
            var url = this.$api + '/artikel/' + this.id;
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

    .articles {
        display: flex;
        max-width: 720px;
        padding: 25px;
        margin: 0 auto;
    }

    .article {
        flex: 1 1 33.333%;
        width: 100%;
    }
    
    .article-detail {
        color: white;
    }

    .article-inner {
        position: relative;
        padding: 25px;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
        margin-bottom: 50px;
        margin-right: 20px;
        background-color: #23395d;
    }

    .article-image-wrap {
        position: relative;
        z-index: 1;
        transform-origin: center;
    }
    .article-image-wrap .image {
        max-width: 100%;
    }
    
</style>