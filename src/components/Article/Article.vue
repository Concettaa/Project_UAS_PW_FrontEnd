<template>
    <main id="article_list">
        <section class="articles">
            <div class="book">
                <v-card
                    v-for="article in articles"
                    :key="article.id"
                >
                <div class="article-inner">
                    <div class="article-image-wrap">
                        <img :src="article.link_gambar" class="image" style="width: 500px; height: 250px"/>
                    </div>
                    <div class="article-detail">
                        <h2>{{ article.title }}</h2>
                        <p>{{ article.short_desc }}</p>
                    </div>
                    <v-btn @click="openArticle(article)">
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
            </div>
        </section>
    </main>
</template>

<script>

export default {
    name: 'article',
    data() {
        return {
            articles: [],
            dialog: false,
            dialogData: {
                 title: null, 
                 writer: null, 
                 content: null, 
                 short_desc: null,
                 link_gambar:null
            }
        };
    },

    methods:{
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