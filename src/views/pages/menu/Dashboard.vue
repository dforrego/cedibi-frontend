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

			<el-col >
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">
					<div class="widget-header ph-20 pt-20">
						<div id="container-chart"></div>
					</div>
				</div>
			</el-col>


			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">
					<div class="widget-header ph-20 pt-20">
						<div id="container-pie-1"></div>
					</div>
				</div>
			</el-col>

			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">
					<div class="widget-header ph-20 pt-20">
						<div id="container-pie-2"></div>
					</div>
				</div>
			</el-col>

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


		Highcharts.chart('container-pie-1', {
				chart: {
					type: 'column'
				},
				title: {
					text: 'Monthly Average Rainfall'
				},
				subtitle: {
					text: 'Source: WorldClimate.com'
				},
				xAxis: {
					categories: [
						'Jan',
						'Feb',
						'Mar',
						'Apr',
						'May',
						'Jun',
						'Jul',
						'Aug',
						'Sep',
						'Oct',
						'Nov',
						'Dec'
					],
					crosshair: true
				},
				yAxis: {
					min: 0,
					title: {
						text: 'Rainfall (mm)'
					}
				},
				tooltip: {
					headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
					pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
						'<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
					footerFormat: '</table>',
					shared: true,
					useHTML: true
				},
				plotOptions: {
					column: {
						pointPadding: 0.2,
						borderWidth: 0
					}
				},
				series: [{
					name: 'Tokyo',
					data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

				}, {
					name: 'New York',
					data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

				}, {
					name: 'London',
					data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

				}, {
					name: 'Berlin',
					data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

				}]
			});

			Highcharts.chart('container-pie-2', {
						chart: {
							plotBackgroundColor: null,
							plotBorderWidth: null,
							plotShadow: false,
							type: 'pie'
						},
						title: {
							text: 'Browser market shares in January, 2018'
						},
						tooltip: {
							pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
						},
						plotOptions: {
							pie: {
								allowPointSelect: true,
								cursor: 'pointer',
								dataLabels: {
									enabled: true,
									format: '<b>{point.name}</b>: {point.percentage:.1f} %'
								}
							}
						},
						series: [{
							name: 'Brands',
							colorByPoint: true,
							data: [{
								name: 'Chrome',
								y: 61.41,
								sliced: true,
								selected: true
							}, {
								name: 'Internet Explorer',
								y: 11.84
							}, {
								name: 'Firefox',
								y: 10.85
							}, {
								name: 'Edge',
								y: 4.67
							}, {
								name: 'Safari',
								y: 4.18
							}, {
								name: 'Sogou Explorer',
								y: 1.64
							}, {
								name: 'Opera',
								y: 1.6
							}, {
								name: 'QQ',
								y: 1.2
							}, {
								name: 'Other',
								y: 2.61
							}]
						}]
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


