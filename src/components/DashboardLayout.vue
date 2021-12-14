<template>
    <div class="dashboard">
        <v-navigation-drawer class="fullheight" width="256" permanent app fixed>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title"> SiBooks </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list dense nav>
                <v-list-item
                v-for="item in items"
                :key="item.title"
                link
                tag="router-link"
                :to="item.to"
                class="items">
                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app fixed height="75px">
            <VSpacer />
            <v-toolbar-items>
                <v-btn text router @click="logOut"><v-icon>mdi-logout</v-icon></v-btn>
            </v-toolbar-items>
        </v-app-bar>
        <div class="fullheight pa-5">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name: "Dashboard",
    data() {
        return {
            drawer: true,
            items: [
                { title: "Profile", to: "/Profile"},
                { title: "Book", to: "/buku" },
                { title: "Article", to: "/article"},
                { title: "Review", to: "/review" },
            ],
        };
    },
    methods:{
        logOut(){
            localStorage.setItem('token', null);
            localStorage.setItem('user', null);
            localStorage.setItem('email', null);
            this.$router.push({
                name: 'Welcome',
            });
        }
    }
}
</script>
<style scoped>
.fullheight{
    min-height: 100vh !important;
}
.title{
    color: white;
    background-color: teal;
}
.items{
    background-color: white;
    color: grey;
}

</style>