<template>
	<vue-scroll class="page-dashboard">
		<el-row class="mt-0" :gutter="30">

			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget medium-widget" v-loading="!asyncComponent" style="height: 170px; position: relative;">
					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<h3 style="margin:22px auto;">DASHBOARD CEDI</h3>
						</div>
					</div>
					<div style="height:50px; width:100%; background-color:#EC760D; position:absolute; bottom:0;"> </div>
				</div>
			</el-col>
			
			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent"
				style="height: 170px; position: relative;">

					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-cube-outline accent-text fs-30"></i>

							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Ocupación Total</div>
								<h3 class="m-0 text-truncate">{{total}} estibas</h3>
							</div>
						</div>
					</div>
					<div style="height:50px; width:100%; background-color:#ED882E;  position:absolute; bottom:0;"> </div>
				</div>
				
			</el-col>

			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
					
					<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent"
					style="height: 170px; position: relative;">

					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-cube-outline success-text fs-30"></i>
								
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Alm. Interno</div>
								<h3 class="m-0 text-truncate">{{internal}} ({{per_internal}}%)</h3>
							</div>
						</div>
					</div>
					<div style="height:50px; width:100%; background-color:#EEA361;  position:absolute; bottom:0;"> </div>
				</div>

			</el-col>

			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent"
					style="height: 170px; position: relative;">

					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-cube-outline success-text fs-30"></i>
								
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Alm. Externo</div>
								<h3 class="m-0 text-truncate">{{external}} ({{per_external}}%)</h3>
							</div>
						</div>
					</div>
					<div style="height:50px; width:100%; background-color:#EE9445;  position:absolute; bottom:0;"> </div>
				</div>
			</el-col>  

			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">
					<div class="widget-header ph-20 pt-20">
						<div id="container-pie"></div>
					</div>
				</div>
			</el-col>

			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">
					<div class="widget-header ph-20 pt-20">
						<div id="container-pie2"></div>
					</div>
				</div>
			</el-col>

			<el-col :xs="24" :sm="12" :md="12" :lg="24" :xl="24">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">
					<div class="widget-header ph-20 pt-20">
						<div id="container-bars"></div>
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
	name: 'DashCedi',
	data () {
		return {
			asyncComponent:true,
			total: 0,
			internal:0,
			external:0,
			per_internal: 0,
			per_external:0,
			error: ''
		}
	},
	computed: {},
	methods: {
		openError: function() {
			this.$message({
				showClose: true,
				message: 'No es posible cargar el tablero. Por favor, vuelve a iniciar sesión.',
				type: 'error'
			});
    	}
	},
	async mounted() {
		let head = {
			headers : { 
			Authorization : 'Bearer ' + this.$store.state.poo.object1
		}};
		let profile = this.$session.get('profile');
		this.$axios.get('roles/' + profile.profile.rol.code + '/dashboard', head)
		.then( response => {
			var data = response.data.data
			var graph1 = data.storage.records
			this.total = data.storage.total
			this.per_internal = data.internal.percent
			this.per_external = data.external.percent
			this.internal = data.internal.total
			this.external = data.external.total
			var graph2 = data.mix.records
			var titles = data.status.titles
			var values = data.status.values

			Highcharts.chart('container-pie', {
							chart: {
								plotBackgroundColor: null,
								plotBorderWidth: null,
								plotShadow: false,
								type: 'pie'
							},
							title: {
								text: 'Almacenamiento por Bodega.'
							},
							tooltip: {
								pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
							},
							plotOptions: {
								pie: {
									allowPointSelect: true,
									cursor: 'pointer',
									dataLabels: {
										enabled: true,
										format: '<b>{point.name}</b>: {point.percentage:.2f} %'
									}
								}
							},
							series: [{
								name: 'Bodegas',
								colorByPoint: true,
								data: graph1
							}]
			});
						
			Highcharts.chart('container-pie2', {
							chart: {
								plotBackgroundColor: null,
								plotBorderWidth: null,
								plotShadow: false,
								type: 'pie'
							},
							title: {
								text: 'Almacenamiento Interno y Externo'
							},
							tooltip: {
								pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
							},
							plotOptions: {
								pie: {
									allowPointSelect: true,
									cursor: 'pointer',
									dataLabels: {
										enabled: true,
										format: '<b>{point.name}</b>: {point.percentage:.2f} %'
									}
								}
							},
							series:  [{
								name: 'Bodegas',
								colorByPoint: true,
								data: graph2
							}]
			});
		
			//----
			Highcharts.chart('container-bars', {
				chart: {
					type: 'bar'
				},
				title: {
					text: 'Estado de la mercancia'
				},
				xAxis: {
					categories: titles
				},
				yAxis: {
					min: 0,
					title: {
						text: 'Total Estibas'
					}
				},
				tooltip: {
					pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> <br/>',
					shared: true
				},
				plotOptions: {
					column: {
						stacking: 'percent'
					}
				},
				series: [{
					name: 'Estibas',
					data: values
				}]
			});
		})
		.catch(err =>{
			this.openError();
		})
	},
	beforeDestroy() {},
	components: {}
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/scss/_variables';

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


