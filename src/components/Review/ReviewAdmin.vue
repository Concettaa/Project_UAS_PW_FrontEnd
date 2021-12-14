<template>
    <v-main class="list">
        <v-card>
            <h3 class="text-h3 font-weight-medium mb-5">Review Web</h3>
            <v-data-table :headers="headers" :items="reviews" :single-expand="singleExpand" item-key="comment" show-expand>
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length">
                        <h4 class="text-md-left">Komentar: </h4>
                        <p class="text-md-left">{{ item.review }}</p>
                    </td>
                </template>

                <template v-slot:[`item.point`]="{ item }">
                     <v-rating v-model="item.point" readonly half-increments></v-rating>
                </template>
            </v-data-table>
        </v-card>
    </v-main>
</template>
<script>
export default {
    name: "ReviewAdmin",
    data(){
        return{
            headers: [
                {text: "", value: 'data-table-expand'},
                {
                    text: "Nama",
                    align: "start",
                    value: "nama",
                },
                { text: "Rating", value: "point" },
            ],
            reviews: [],
        };
    },

    watch:{
        dialog(val){
            val || this.close()
        },
        dialogDelete(val){
            val || this.closeDelete()
        },
    },

    methods: {
        readData(){
            var url = this.$api + '/review';
            this.$http.get(url, {
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.reviews = response.data.data;
            })
        },
    },
    mounted(){
        this.readData();
    },
}
</script>