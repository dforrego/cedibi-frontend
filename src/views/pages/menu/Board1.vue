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

            <component-comments :board="1" :user="2" /> 
		</el-row>
	</vue-scroll>
</template>

<script>

import componentComments from '../../../components/Comments.vue'

export default {
    data() {
        return {
             activeNames: ['1'],
            asyncComponent:true,
            tableData: []
        }
    },
    async mounted() {
        if(this.$session.id()) {
			await this.$store.dispatch('getOauth')
		}
    },
    components: {
        componentComments
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