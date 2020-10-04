<template>
	<vue-scroll class="page-dashboard">
		<el-row class="mt-0" :gutter="30">

			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget medium-widget" v-loading="!asyncComponent" 
					style="height: 170px; position: relative;">
					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<h3 style="margin:22px auto;">TABLERO GENERAL - NEGOCIO</h3>
						</div>
					</div>
					<div style="height:50px; width:100%; background-color:#1A4D9C; position:absolute; bottom:0;"> </div>
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
					<div style="height:50px; width:100%; background-color:#4B77BB;  position:absolute; bottom:0;"> </div>
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
					<div style="height:50px; width:100%; background-color:#729BDA;  position:absolute; bottom:0;"> </div>
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
					<div style="height:50px; width:100%; background-color:#A7C2EC; position:absolute; bottom:0;"> </div>
				</div>
			</el-col>  

			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">
					<div class="widget-header ph-20 pt-20">
						<div id="container-pie"></div>
					</div>
				</div>
			</el-col>

			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">
					<div class="widget-header ph-20 pt-20">
						<div id="container-columns"></div>
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
	name: 'DashClient',
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
		Highcharts.setOptions({
			'lang': {
				downloadPDF: "Descargar en formato PDF",
				downloadPNG: "Descargar en formato PNG",
				downloadJPEG: "Descargar en formato JPG",
				downloadSVG: "Descargar en formato SVG",
				downloadXLS: "Descargar en formato XLS",
				drillUpText: "< Atrás",
				viewFullscreen: "Ver en pantalla completa",
				printChart: "Imprimir gráfica",
				loading: "Cargando Gráfica"
			}
		});

		var options1 = {
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
			series: []
		};
		var options2 = {
			chart: {
				type: 'column'
			},
			title: {
				text: 'Almacenamiento Interno y Externo'
			},
			xAxis: {
				categories: []
			},
			yAxis: {
				min: 0,
				title: {
					text: 'Total almacenamiento'
				},
				stackLabels: {
					enabled: true,
					style: {
						fontWeight: 'bold',
						color: ( // theme
							Highcharts.defaultOptions.title.style &&
							Highcharts.defaultOptions.title.style.color
						) || 'gray'
					}
				}
			},
			legend: {
				align: 'right',
				x: -30,
				verticalAlign: 'top',
				y: 25,
				floating: true,
				backgroundColor:
					Highcharts.defaultOptions.legend.backgroundColor || 'white',
				borderColor: '#CCC',
				borderWidth: 1,
				shadow: false
			},
			tooltip: {
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
			},
			plotOptions: {
				column: {
					stacking: 'normal',
					dataLabels: {
						enabled: true
					}
				}
			},
			series: []
		};
		var options3 = { 
			chart: {
				type: 'bar'
			},
			title: {
				text: 'Estado de la mercancia'
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
			series: []
		}
		var chart = Highcharts.chart('container-pie', options1);
		chart.showLoading();

		var chart2 = Highcharts.chart('container-columns', options2);
		chart2.showLoading();

		this.$axios.get('roles/' + profile.profile.rol.code + '/dashboard', head)
			.then( response => {
				var data = response.data.data;
				var graph1 = data.storage.records
				this.total = data.storage.total
				this.per_internal = data.internal.percent
				this.per_external = data.external.percent
				this.internal = data.internal.total
				this.external = data.external.total
				var graph2 = data.mix.records
				var categories = data.mix.categories
				var titles = data.status.titles
				var values = data.status.values

				options1.series[0] = {
					name: 'Bodegas',
					colorByPoint: true,
					data: graph1
				};
				chart.hideLoading();
				Highcharts.chart('container-pie', options1);
				//---
				options2.series = graph2
				options2.xAxis = {
					categories: categories
				}
				chart2.hideLoading();
				Highcharts.chart('container-columns', options2);
				//---
				options3.series[0] = {
					name: 'Estibas',
					colorByPoint: true,
					data: values
				}
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
