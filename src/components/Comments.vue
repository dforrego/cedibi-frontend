<template>

     <el-row class="mt-0" :gutter="30">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb-30">
                <div class="card-base card-shadow--medium mx-20" v-loading="!asyncComponent">
                    <el-alert
						title="¡Advertencia!"
						type="warning"
						description="El campo del comentario no puede estar vacío"
						show-icon
                        v-show="visible_alert">
					</el-alert>
                    <el-collapse v-model="activeNames" @change="handleChange" class="ml-20">
                    <el-collapse-item title="Nuevo comentario" name="1" class="mr-20">
                        <el-form ref="form" :model="form" >
                        <el-form-item label="Comentario">
                            <el-input 
                                type="textarea" 
                                v-model="form.comment" 
                                maxlength="140"
                                show-word-limit
                            ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">Enviar</el-button>
                        </el-form-item>
                    </el-form>
                    </el-collapse-item>
                    </el-collapse>
                </div>
            </el-col>

            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-if="dataTotal.length">
                <div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">
                    <br>
                    <div class="block">
                        <el-timeline>
                            <el-timeline-item
                            v-for="(comment, key) in tableData"
                            :key="key"
                            icon="el-icon-more"
                            type="primary"
                            color="#0bbd87"
                            size="large"
                            :timestamp="comment.message">
                            {{comment.user.first_name}} {{comment.user.last_name}}, {{comment.created_at}}
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                </div>
            </el-col>

            <el-col v-if="dataTotal.length">
                <div class="text-center" v-if="page.size">
                    <el-pagination
                        :page-size="page.size"
                        :pager-count="page.count"
                        layout="prev, pager, next"
                        :current-page.sync="page.current"
                        :total="page.total"
                        @current-change='changePage'
                        @prev-click="changePage"
                        @next-click="changePage">
                        
                    </el-pagination>
                </div>
             </el-col>
    </el-row>
</template>

<script>
export default {
    data () {
        return {
            activeNames: ['1'],
            dataTotal: [],
            page: {
                total: 0,
                count: 5,
                size: 3,
                current: 1
            },
            asyncComponent:true,
            form: {
                comment: ''
            },
            tableData: [],
            visible_alert: false
        }
    },
    props: {
        user: {
            type: Number,
            required: true
        },
        board: {
            type: Number,
            required: true
        },
    },
    async mounted() {
        if(this.$session.exists()) {
			await this.$store.dispatch('getOauth')
		}
        await this.getComments()
    },
    methods: {
        changePage: function () {
            this.tableData = this.dataTotal.slice((this.page.current-1)*this.page.size, this.page.current*this.page.size)
        },
        getComments: async function () {
            let head = {
                headers : { 
                Authorization : 'Bearer ' + this.$store.state.poo.object1
            }}
            let getComments = await this.$axios.get('boards/1/comments', head)
            this.dataTotal = getComments.data.comments
            this.page.total = this.dataTotal.length || 0
            
            if (this.page.total > 0) {
                this.tableData = this.dataTotal.slice(0,5)
                this.page.other = Math.ceil(this.page.total / this.page.size)
            }
        },
        onSubmit: async function () {
            if (this.form.comment.length > 0){
                this.visible_alert = false;
                let head = {
                    headers : { 
                    Authorization : 'Bearer ' + this.$store.state.poo.object1
                }}
                this.asyncComponent = false
                let response = await this.$axios.post('boards/1/comments', {
                    "message": this.form.comment,
                    "board": this.board,
                    "user": this.user
                }, head)
                
                if(response.data) {
                    this.form.comment = ''
                    this.getComments()
                }
                this.asyncComponent = true

            } else {
                this.visible_alert = true;
            }

        }
    }
}
</script>