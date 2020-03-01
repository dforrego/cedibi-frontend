<template>
	<vue-scroll class="page-dashboard">
		
	<el-row class="mt-0" :gutter="30">
			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">
					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-account-multiple accent-text fs-30"></i>
								<div class="badge-box">
									<span class="badge"><i class="mdi mdi-trending-up success-text mr-10"></i><strong class="accent-text">16%</strong></span>
								</div>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Users</div>
								<h2 class="m-0 text-truncate">4,523</h2>
							</div>
						</div>
					</div>
				</div>
			</el-col>

			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-eye accent-text fs-30"></i>
								<div class="badge-box">
									<span class="badge"><i class="mdi mdi-trending-up success-text mr-10"></i><strong class="accent-text">11%</strong></span>
								</div>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Views</div>
								<h2 class="m-0 text-truncate">2,523</h2>
							</div>
						</div>
					</div>
				</div>
			</el-col>

			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-account-convert success-text fs-30"></i>
								<div class="badge-box">
									<span class="badge"><i class="mdi mdi-trending-neutral info-text mr-10"></i><strong class="success-text">1%</strong></span>
								</div>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Conversion</div>
								<h2 class="m-0 text-truncate">9,832</h2>
							</div>
						</div>
					</div>
				</div>
			</el-col>
			
			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-cash-multiple success-text fs-30"></i>
								<div class="badge-box">
									<span class="badge"><i class="mdi mdi-trending-neutral info-text mr-10"></i><strong class="success-text">0%</strong></span>
								</div>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Revenue</div>
								<h2 class="m-0 text-truncate">6,364</h2>
							</div>
						</div>
					</div>
				</div>
			</el-col>


            <el-col :xs="24" :sm="12" :md="12" :lg="24" :xl="24" class="mb-30">
                <div class="card-base card-shadow--medium mx-20" v-loading="!asyncComponent">
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


            <el-col :xs="24" :sm="12" :md="12" :lg="24" :xl="24">
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

            <el-col>
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
	</vue-scroll>
</template>

<script>
export default {
    data() {
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
            tableData: [],
            form: {
                comment: ''
            }
        }
    },
    async mounted() {
        if(this.$session.id()) {
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
            let head = {
                headers : { 
                Authorization : 'Bearer ' + this.$store.state.poo.object1
            }}
            this.asyncComponent = false
            let response = await this.$axios.post('boards/1/comments', {
                "message": this.form.comment,
                "board": 1,
	            "user": 1
            }, head)
            
            if(response.data) {
                this.form.comment = ''
                this.getComments()
            }
            this.asyncComponent = true

        },
         handleChange(val) {
        
      }
    }
}
</script>

<style scoped>
    .el-collapse-item__header {
        margin-left: 5px !important;
    }
    .el-collapse-item__wrap {
        margin-right: 5px !important;
    }
</style>