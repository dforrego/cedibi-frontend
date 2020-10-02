<template>
	<vue-scroll class="page-dashboard">
		<h2>{{board.name}}</h2>
		<h4>{{board.type.name}}</h4>
		<h6>{{board.description}}</h6>	
		<el-row class="mt-0" :gutter="30">	
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<div id="container-scatter"></div>
			</el-col>
		</el-row>
		<br><br>
		<component-comments :board="1" :user="2" /> 
	</vue-scroll>
</template>

<script>
import componentComments from '../../../components/Comments.vue'
import * as Highcharts from 'highcharts'
import * as Exporting from 'highcharts/modules/exporting'
Exporting(Highcharts)
export default {
	name:'Board4',
    data() {
        return {
            activeNames: ['1'],
            asyncComponent:true,
			tableData: [],
			board_id: 0,
			user_id: 0,
			board: {
				name: '',
				description:'',
				type: {
					name:'',
					code: 0
				},
				status: '',
				created_at: ''
			}
        }
    },
    async mounted() {
        if(this.$session.id()) {
			await this.$store.dispatch('getOauth')
			var user = this.$session.get("profile");
			this.user_id = user.id;
			this.board_id = 4
			//----
			var points = [],
				regionP,
				regionVal,
				regionI = 0,
				countryP,
				countryI,
				causeP,
				causeI,
				articleP,
				articleI,
				region,
				country,
				cause,
				article;

			let head = {
				headers: { 
					Authorization : 'Bearer ' + this.$store.state.poo.object1
				}
            };
            
            Highcharts.setOptions({
                'lang':{
                    downloadPDF: "Descargar en formato PDF",
                    downloadPNG: "Descargar en formato PNG",
                    downloadJPEG:"Descargar en formato JPG",
                    downloadSVG: "Descargar en formato SVG",
                    downloadXLS: "Descargar en formato XLS",
                    drillUpText: "< Atrás",
                    viewFullscreen: "Ver en pantalla completa",
                    printChart: "Imprimir gráfica",
                    loading: "Cargando Gráfica"
                }
            });

            var options = {
                title: {
                    text: ''
                },
                xAxis: {
                    min: 0
                },
                yAxis: {
                    min: 0
                },
                series: [{
                    type: 'line',
                    name: 'Tendencia',
                    data: [],
                    marker: {
                        enabled: false
                    },
                    states: {
                        hover: {
                            lineWidth: 0
                        }
                    },
                    enableMouseTracking: false
                }, {
                    type: 'scatter',
                    name: 'Rotación del Inventario',
                    data: [],
                    marker: {
                        radius: 4
                    }
                }]
            };

            var chart = Highcharts.chart('container-scatter', options);
		    chart.showLoading();

			let profile = this.$session.get('profile');
			this.$axios.get('boards/3', head)
				.then( response => {
					var data = response.data.graph;
					this.board = response.data.board
                    
                    options.series[0].data = [[0, 1.11], [5, 4.51]];
                    options.series[1].data = [1, 1.5, 2.8, 3.5, 3.9, 4.2];
                    chart.hideLoading();
                    Highcharts.chart('container-scatter', options);
					
				})
				.catch(err =>{
					this.openError();
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