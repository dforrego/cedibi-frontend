<template>
	<vue-scroll class="page-dashboard">
		
	<el-row class="mt-0" :gutter="30">
			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">
					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<h3 style="margin:22px auto;">DASHBOARD NEGOCIO</h3>
						</div>
					</div>
					<div style="height:50px; width:100%; background-color:#1A4D9C;"> </div>
				</div>
			</el-col>

			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-eye accent-text fs-30"></i>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Almacenado</div>
								<h2 class="m-0 text-truncate">2,523 und.</h2>
							</div>
						</div>
					</div>
					<div style="height:50px; width:100%; background-color:#4B77BB;"> </div>
				</div>
			</el-col>

			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-account-convert success-text fs-30"></i>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Devolución</div>
								<h2 class="m-0 text-truncate">9,832 und.</h2>
							</div>
						</div>
					</div>
					<div style="height:50px; width:100%; background-color:#729BDA;"> </div>
				</div>
			</el-col>
			
			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-cash-multiple success-text fs-30"></i>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Vencido o Averiado</div>
								<h2 class="m-0 text-truncate">6,364 und.</h2>
							</div>
						</div>
					</div>
					<div style="height:50px; width:100%; background-color:#A7C2EC;"> </div>
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
						<div id="container-tendence"></div>
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
	name: 'DashBusisness',
	data () {
		return {
			asyncComponent:true
		}
	},
	computed: {},
	methods: {},
	mounted() {
		Highcharts.chart('container-pie', {
						chart: {
							plotBackgroundColor: null,
							plotBorderWidth: null,
							plotShadow: false,
							type: 'pie'
						},
						title: {
							text: 'Ocupación del CeDi por negocios.'
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
							name: 'Almacenamiento',
							colorByPoint: true,
							data: [{
								name: 'Negocio 1',
								y: 61.41,
								sliced: true,
								selected: true,
							}, {
								name: 'Negocio 2',
								y: 11.84
							}, {
								name: 'Negocio 3',
								y: 10.85
							}, {
								name: 'Negocio 4',
								y: 4.67
							}]
						}]
		});

	Highcharts.chart('container-tendence', {
			 chart: {
        type: 'column'
    },
    title: {
        text: 'ültimo trimestre de almacenamiento'
    },
    xAxis: {
        categories: [
            'Jan',
            'Feb',
            'Mar',
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Estibas (unidades)'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} und.</b></td></tr>',
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
        name: 'Almacenado',
        data: [49.9, 71.5, 106.4]

    }, {
        name: 'Devolución',
        data: [83.6, 78.8, 98.5]

    }, {
        name: 'Averiado|Vencido',
        data: [48.9, 38.8, 39.3]

    }]
});
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


