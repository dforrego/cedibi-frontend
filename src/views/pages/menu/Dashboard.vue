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

					<!-- <component :is="asyncComponent" :type="'line'" :options='{ width: "100%", height: 80 }' :data="[1, 3, 2, 4, 4, 9, 3, 4, 6, 5, 4, 6, 9, 8, 11, 12, 13, 12, 12, 14].toString()"/> -->
				
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

			<el-col >
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">
					<div class="widget-header ph-20 pt-20">
						<div id="container-chart" class="container-chart"></div>
					</div>
				</div>
			</el-col>

			<!--<el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="4">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-message-text-outline danger-text fs-30"></i>
								<div class="badge-box">
									<span class="badge"><i class="mdi mdi-trending-down danger-text mr-10"></i><strong class="danger-text">23%</strong></span>
								</div>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Messages</div>
								<h2 class="m-0 text-truncate">52,628</h2>
							</div>
						</div>
					</div>

					
				</div>
			</el-col>
			<el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="4">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-cart danger-text fs-30"></i>
								<div class="badge-box">
									<span class="badge"><i class="mdi mdi-trending-down danger-text mr-10"></i><strong class="danger-text">9%</strong></span>
								</div>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Purchases</div>
								<h2 class="m-0 text-truncate">3,346</h2>
							</div>
						</div>
					</div>

					
				</div>
			</el-col>-->
		</el-row>
	
	</vue-scroll>
</template>

<script>
import * as Highcharts from 'highcharts'
import * as Exporting from 'highcharts/modules/exporting'
Exporting(Highcharts)
export default {
	name: 'Dashboard',
	data () {
		return {
			asyncComponent:true
		}
	},
	computed: {},
	methods: {},
	mounted() {
		Highcharts.chart('container-chart', {
				title: {
					text: 'Solar Employment Growth by Sector, 2010-2016'
				},

				subtitle: {
					text: 'Source: thesolarfoundation.com'
				},

				yAxis: {
					title: {
						text: 'Number of Employees'
					}
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle'
				},

				plotOptions: {
					series: {
						label: {
							connectorAllowed: false
						},
						pointStart: 2010
					}
				},

				series: [{
					name: 'Installation',
					data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
				}, {
					name: 'Manufacturing',
					data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
				}, {
					name: 'Sales & Distribution',
					data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
				}, {
					name: 'Project Development',
					data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
				}, {
					name: 'Other',
					data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
				}],

				responsive: {
					rules: [{
						condition: {
							maxWidth: 500
						},
						chartOptions: {
							legend: {
								layout: 'horizontal',
								align: 'center',
								verticalAlign: 'bottom'
							}
						}
					}]
				}
		});
	},
	beforeDestroy() {},
	components: {}
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/_variables';

</style>

<style lang="scss">

@media (max-width: 768px) {
	.page-dashboard {
		.vb-content {
			padding: 0 5px !important;
			margin: -5px;
			width: calc(100% + 10px) !important;
		}
	}
}
</style>


