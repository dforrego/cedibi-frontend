<template>
	<vue-scroll class="page-dashboard">
		<h2>{{board.name}}</h2>
		<h4>{{board.type.name}}</h4>
		
		<el-row class="mt-0" :gutter="30">	
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <strong>Negocio:</strong><br>
                <el-select v-model="negocio" v-on:change="onChange" placeholder="Seleccionar Negocio">
                    <el-option
                    v-for="item in items"
                    :key="item.value"
                    :label="item.label"
                    :selected="item.selected"
                    :value="item.value">
                    </el-option>
                </el-select>
                <br>
                <figure class="highcharts-figure">
                    <div id="container-scatter"></div>
                    <p class="highcharts-description">
                        {{board.description}}
                    </p>
                </figure>
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
            negocio: 1,
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
            items:[
				{value: 1, label: 'NEGOCIO-1'},
				{value: 10, label: 'NEGOCIO-10'},
				{value: 35, label: 'NEGOCIO-35'},
			]
        }
    },
    async mounted() {
        if(this.$session.id()) {
			await this.$store.dispatch('getOauth')
			var user = this.$session.get("profile");
			this.user_id = user.id;
			this.board_id = 4
            //---
            this.getData(1)
		}
    },
    methods: {
        getData(cod) {
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
                    text: 'Rotación de Inventario por Artículo'
                },
                subtitle: {
                    text: ''
                },
                yAxis: {
                    title: {
                        text: 'Número de Rotación de inventario'
                    }
                },
                xAxis: {
                    accessibility: {
                        rangeDescription: 'Periodo: Trimestral'
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
                        pointStart: 1
                    }
                },
                series: this.getArticulos(cod),
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
            };

            var chart = Highcharts.chart('container-scatter', options);
		    chart.showLoading();

			let profile = this.$session.get('profile');
			this.$axios.get('boards/3', head)
				.then( response => {
					var data = response.data.graph;
					this.board = response.data.board
                    
                    //options.series = [];
                    chart.hideLoading();
                   // Highcharts.chart('container-scatter', options);
				})
				.catch(err =>{
					//this.openError();
				}) 
        },
 		onChange(event) {
			this.getData(event)
        },
        getArticulos(cod) {
            /*
NEG 1           
0.418993145
0.462321843
0.432102744
0.453613102

NEG 10 
0.33512949
0.307251818
0.332615149
0.298214002


NEG 35            
0.102726526
0.125089789
0.112172667
0.125044396
            */
            switch(cod){
                case 1:
                    return [{
                        name: 'ART_10876',
                        data: [0.395600926, 0.447926597, 0.417249417, 0.40699437]
                    },
                    {
                        name: 'ART_10893',
                        data: [0.519542431, 0.501755866, 0.487653732, 0.519538286]
                    }]
                    break;
                case 10:
                    return [{
                        name: 'ART_10898',
                        data: [0.560499274, 0.629042971, 0.530367052, 0.492274252]
                    },
                    {
                        name: 'ART_10900',
                        data: [0.368865196, 0.373003683, 0.389276925, 0.359340244]
                    },
                    {
                        name: 'ART_14083',
                        data: [0.41428078, 0.368777971, 0, 0.393988612]
                    },
                    {
                        name:'ART_40326',
                        data: [0.412038286, 0.39974141, 0.422909062, 0.427697475]
                    }]
                    break;
                case 35:
                    return [{
                        name:'ART_111214',
                        data: [0.460580177, 0.429836963, 0.412609725, 0.387459328]
                    },
                    {
                        name:'ART_111230',
                        data: [0.402907507,0.42358241,0.471322407,0.368049471]
                    },
                    {
                        name:'ART_111255',
                        data: [0.455841028,0.40950541,0.380220043,0.449983016]
                    },
                    {
                        name:'ART_111257',
                        data: [0.385278739,0.448874393,0.413114358,0.391009732]
                    },
                    {
                        name:'ART_111300',
                        data: [0.381374211,0.432832982,0.440543167,0.435864906]
                    },
                    {
                        name:'ART_111312',
                        data: [0.429175336,0.427351884,0.353751465,0.439773831]
                    }, 
                    {
                        name: 'ART_111361',
                        data: [0.142156696,0.162543855,0.147427572,0.166738716]
                    }]
                    break;
            }
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