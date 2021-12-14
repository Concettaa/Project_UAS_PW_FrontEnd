<template>
    <v-main class="list">
        <h3 class="text-h3 font-weight-medium mb-5">Review Web</h3>

        <v-card>
            <v-card-title>
                <v-spacer></v-spacer>
                <v-btn color="success" dark @click="dialog = true">Tambah</v-btn>
            </v-card-title>

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

                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small class="mr-2" color="red" @click="editItem(item)">mdi-pencil</v-icon>
                    <v-icon small color="green" @click="deleteItem(item)">mdi-delete</v-icon>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Review Web</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field
                        v-model="editedItem.nama"
                        label="Nama"
                        required
                        ></v-text-field>

                        <v-rating
                        v-model="editedItem.point"
                        label="Rating"
                        required
                        ></v-rating>

                        <v-textarea
                        v-model="editedItem.review"
                        label="Comment"
                        required
                        ></v-textarea>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="setForm">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
                <v-card-title class="text-h5">Apakah anda yakin menghapus review ini?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteData">OK</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
    </v-main>
</template>
  
<script>
export default {
    name: "Review",
    data() {
        return{
            inputType: 'Tambah',
            load: false,
            dialog: false,
            dialogDelete: false,
            expanded: [],
            singleExpand: false,
            headers: [
                {text: "", value: 'data-table-expand'},
                {
                    text: "Nama",
                    align: "start",
                    value: "nama",
                },
                { text: "Rating", value: "point" },
                { text: "Actions", value: "actions" },
            ],
            review: new FormData,
            reviews: [],
            editedIndex: -1,
            defaultItem: {
                nama:'',
                point:0,
                review:'',
            },
            editedItem: {nama: null, point: 0, review: null},
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

    methods:{
        setForm(){
            if(this.inputType !== 'Tambah'){
                this.update();
            }else{
                this.save();
            }
        },

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

        save(){
            this.review.append('nama', this.editedItem.nama);
            this.review.append('point', this.editedItem.point);
            this.review.append('review', this.editedItem.review);
            var url = this.$api + '/review'
            this.load = true;
            this.$http.post(url, this.review, {
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

        update(){
            let newData = {
                nama: this.editedItem.nama,
                point: this.editedItem.point,
                review: this.editedItem.review,
            };
            var url = this.$api + '/review/' + this.editedIndex;
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

        deleteData(){
                var url = this.$api + '/review/' + this.editedIndex;
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
        
        editItem(item){
            this.inputType = 'Ubah';
            this.editedIndex = item.id;
            this.editedItem.nama = item.nama;
            this.editedItem.point = item.point;
            this.editedItem.review = item.review;
            this.dialog = true;
        },

        deleteItem(item){
            this.editedIndex = item.id;
            this.dialogDelete = true;
        },

        close(){
            this.dialog = false;
            this.inputType = 'Tambah';
            this.dialogDelete = false;
            this.readData();
        },

        closeDelete(){
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        cancel(){
            this.resetForm();
            this.readData();
            this.inputType = 'Tambah';
            this.dialog = false;
        },

        resetForm(){
            this.editedItem = {nama: null, point: null, review: null};
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
};
</script>