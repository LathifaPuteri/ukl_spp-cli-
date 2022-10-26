<template>
    <div>
        <br><br>
        <div class="app-content pt-3 p-md-3 p-lg-4">
            <div class="container-xl">
                <div class="row g-3 mb-4 align-items-center justify-content-between">
                    <div class="col-auto">
                        <h1 class="app-page-title mb-0">Student</h1>
                    </div>
                <div class="col-auto">
                    <div class="page-utilities">
                        <div class="row g-2 justify-content-start justify-content-md-end align-items-center">
                            <div class="col-auto">
                                <form class="table-search-form row gx-1 align-items-center">
                                    <div class="col-auto">
                                        <button @click="Add()" data-bs-toggle="modal" data-bs-target="#student_modal" class="btn app-btn-secondary float-end"><i class="fas fa-plus fa-fw"></i>Add Student</button>
                                    </div>
                                </form>
                            </div><!--//col-->
                        </div><!--//row-->
                    </div><!--//table-utilities-->
                </div><!--//col-auto-->
            </div><!--//row-->
            
        <div class="tab-content" id="orders-table-tab-content">
            <div class="tab-pane fade show active" id="orders-all" role="tabpanel" aria-labelledby="orders-all-tab">
                <div class="app-card app-card-orders-table shadow-sm mb-5">
                    <div class="app-card-body">
                        <div class="table-responsive">
                            <table class="table app-table-hover mb-0 text-left">
                                <thead>
                                    <tr>
                                        <th class="cell">NO</th>
                                        <!-- <th class="cell">ID</th> -->
                                        <th class="cell">NISN</th>
                                        <th class="cell">NIS</th>
                                        <th class="cell">Name</th>
                                        <th class="cell">Class ID</th>
                                        <th class="cell">Address</th>
                                        <th class="cell">Telephone</th>
                                        <th class="cell">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(stu,index) in student_list" :key="index">
                                        <td>{{ index+1 }}</td>
                                        <!-- <td class="cell">{{stu.id_student}}</td> -->
                                        <td class="cell">{{stu.nisn}}</td>
                                        <td class="cell">{{stu.nis}}</td>
                                        <td class="cell">{{stu.student_name}}</td>
                                        <td class="cell">{{stu.id_class}}</td>
                                        <td class="cell">{{stu.address}}</td>
                                        <td class="cell">{{stu.telp}}</td>
                                        <td class="cell">
                                            <button class="btn-sm app-btn-secondary" @click="Edit(stu)" data-bs-toggle="modal" data-bs-target="#student_modal">Edit</button>
                                            <button class="btn-sm app-btn-secondary" @click="Delete()">Delete</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><!--//table-responsive-->
                    </div><!--//app-card-body-->
                </div><!--//app-card-->
        </div><!--//tab-pane-->
        </div><!--//tab-content-->
    </div><!--//container-fluid-->
</div><!--//app-content-->
</div>
</template>

<script>
    export default {
        name : "Student_page",
        data(){
            return{
                nisn :"",
                nis:"",
                student_name:"",
                id_class:"",
                address:"",
                telp:"",
                student_list:[],
                grade_list:[],
            }
        },
        methods:{
            getStudentList : function(){
                this.axios.get('http://localhost:8000/api/student')
                .then((response) => {
                    //console.log(response);
                    this.student_list = response.data;
                })
            },

            getGrade: function(){
                this.axios.get("/grade")
                .then(response =>{
                    this.grade_list = response.data;
                })
            },

            Add: function(){
                this.nisn =""
                this.nis=""
                this.student_name=""
                this.id_class=""
                this.address=""
                this.telp=""
                this.action="insert"
                this.getGrade()
            },

            Edit: function(stu){
                this.nisn = stu.nisn
                this.nis = stu.nis
                this.student_name = stu.student_name
                this.id_class = stu.id_class
                this.address = stu.address
                this.telp = stu.telp
                this.action="update"
                this.getGrade()
            },

            Save: function(){
                let form  = {
                    'nis' : this.nis,
                    'student_name': this.student_name,
                    'class_id': this.id_class,
                    'address': this.address,
                    'telp': this.telp,
                }

                if(this.action == 'insert'){ //POST
                    this.axios.post('/student', form)
                    .then(response=> {
                        this.$swal({
                            title: 'Success!',
                            text: response.data.message,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        })
                        this.getStudentList()
                    })
                }

                else{
                    this.axios.put('/student/' + this.nisn, form)
                    .then(response => {
                        this.$swal({
                            title: 'Success!',
                            text: response.data.message,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        })
                        this.getStudentList()
                    })
                }
            },

            Delete: function(nisn){
                this.$swal({
                    title: 'Delete student data?',
                    text: 'Are you sure you want to delete this data?',
                    icon: 'warning',
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'Yes',
                    denyButtonText: `No`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.axios.delete('/student/' + nisn)
                        .then( response => {
                            this.$swal({
                                title: 'Success!',
                                text: response.data.message,
                                icon: 'success',
                                confirmButtonText: 'OK'
                            })
                            this.getStudentList()
                        })
                    } else if (result.isDenied) {
                        this.$swal({
                            title: 'Cancel!',
                            text: 'Student data is safe',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        })
                    }
                })
            }
        },

        mounthed(){
            this.getStudentList()
        }
    }
</script>