<template>
	<vue-scroll class="page-dashboard" >
        <div>
            <h2>{{board.name}}</h2>
            <h4>{{board.type.name}}</h4>
            <h6>{{board.description}}</h6>	
            <el-row class="mt-0" :gutter="30" :v-show="load">	
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <div id="container-storage"></div>
                </el-col>

                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent"
                        style="height: 170px; position: relative;">
                            <div class="widget-header ph-20 pt-20">
                                <div class="flex justify-center align-center">
                                    <div class="widget-icon-box mr-20 animated fadeInRight">
                                        <i class="widget-icon mdi mdi-cube-outline accent-text fs-30"></i>
                                    </div>
                                    <div class="widget-info box grow text-truncate animated fadeInLeft">
                                        <div class="o-050 widget-title text-truncate pt-5 pb-10">Total Vencido</div>
                                        <h3 class="m-0 text-truncate">{{expired}} estibas</h3>
                                    </div>
                                </div>
                            </div>
                            <div style="height:50px; width:100%; background-color:#ED882E;  position:absolute; bottom:0;"> </div>
                        </div>
                        <div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent"
                                style="height: 170px; position: relative;">

                            <div class="widget-header ph-20 pt-20">
                                <div class="flex justify-center align-center">
                                    <div class="widget-icon-box mr-20 animated fadeInRight">
                                        <i class="widget-icon mdi mdi-cube-outline accent-text fs-30"></i>

                                    </div>
                                    <div class="widget-info box grow text-truncate animated fadeInLeft">
                                        <div class="o-050 widget-title text-truncate pt-5 pb-10">Total No Vencido</div>
                                        <h3 class="m-0 text-truncate">{{no_expired}} estibas</h3>
                                    </div>
                                </div>
                            </div>
                            <div style="height:50px; width:100%; background-color:#ED882E;  position:absolute; bottom:0;"> </div>
                        </div>
                </el-col>

                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <br><br>
                    <div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">
                        <div class="widget-header ph-20 pt-20">
                            <div id="container-dilldrops"></div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <br><br>
            <component-comments :board="2" :user="2" /> 
        </div>
    </vue-scroll>
</template>

<script>

import componentComments from '../../../components/Comments.vue'
import * as Highcharts from 'highcharts'
import * as DrillDown from 'highcharts/modules/drilldown'
import * as Exporting from 'highcharts/modules/exporting'
Exporting(Highcharts)
DrillDown(Highcharts)
export default {
    name: 'Board2',
    data() {
        return {
            activeNames: ['1'],
            asyncComponent: true,
			tableData: [],
			board: {
				name: '',
				description:'',
				type: {
					name:'',
					code: 0
				},
				status: '',
				created_at: ''
			},
            user_id: 2,
            load: false,
            no_expired : 0,
            expired : 0
        }
    },
    async mounted() {
        if(this.$session.id()) {
			await this.$store.dispatch('getOauth')
			var user = this.$session.get("profile");
			this.user_id = user.id;
            this.board.id = 2
            
            let head = {
			    headers : { 
			        Authorization : 'Bearer ' + this.$store.state.poo.object1
                }
            };

            Highcharts.setOptions({
                'lang':{
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
            })
            
            var options1 = {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Vencimiento por Bodegas'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    accessibility: {
                        point: {
                            valueSuffix: '%'
                        }
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
                }

            var options2 = {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Vencimiento por Negocio > Línea > Marca > Artículo'
                    },
                    subtitle: {
                        text: 'Dar clic en cada barra'
                    },
                    accessibility: {
                        announceNewData: {
                            enabled: true
                        }
                    },
                    xAxis: {
                        type: 'category'
                    },
                    yAxis: {
                        title: {
                            text: ''
                        }

                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        series: {
                            borderWidth: 0,
                            dataLabels: {
                                enabled: true,
                                format: '{point.y:.1f}%'
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> deL total<br/>'
                    },
                    series: [],
                    drilldown: {}
                }

            var chart = Highcharts.chart('container-storage', options1);
            chart.showLoading();

            var chart2 = Highcharts.chart('container-dilldrops', options2);
            chart2.showLoading();
            
            this.$axios.get('boards/2', head)
                .then( response => {
                    this.load = true;
                    this.board = response.data.board
                    this.expired =response.data.graphs.expired.expired.total
                    this.no_expired = response.data.graphs.expired.no_expired.total
                    this.series = response.data.graphs.series.records
                    this.drilldowns = response.data.graphs.drills

                    options1.series[0] = {
                        name: 'Bodegas',
                        colorByPoint: true,
                        data: response.data.graphs.storage.records
                    }
                    chart.hideLoading();
                    Highcharts.chart('container-storage', options1);

                    options2.series[0] = {
                        name: "Negocios",
                        colorByPoint: true,
                        data: this.series
                    }
                    
                    options2.drilldown = {
                            colorByPoint: true,
                            series: this.drilldowns
                    }
                    chart2.hideLoading();
                    Highcharts.chart('container-dilldrops', options2);
            })
            .catch(error => {
                
            })
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
	.highcharts-figure, .highcharts-data-table table {
        min-width: 320px; 
        max-width: 600px;
        margin: 1em auto;
    }
</style>