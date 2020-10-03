<template>
	<vue-scroll class="page-dashboard">
	<h2>{{board.name}}</h2>
	<h4>{{board.type.name}}</h4>
	<h6>{{board.description}}</h6>	
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
			<br>
		</el-col>	
		<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
			<div id="container-board"></div>
		</el-col>
	</el-row>
	<br><br>
	<component-comments :board="1" :user="3" /> 
	</vue-scroll>
</template>

<script>

import componentComments from '../../../components/Comments.vue'
import * as Highcharts from 'highcharts'
import * as Treemap from 'highcharts/modules/treemap'
Treemap(Highcharts)
export default {
	name:'Board3',
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
				{value: 1, label: 'NEGOCIO-1', selected:true},
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
			this.board_id = 2
			//----
			this.getData(this.items[0].value)
		}

	},
	methods: {
		getData(cod) {

			let head = {
				headers: { 
					Authorization : 'Bearer ' + this.$store.state.poo.object1
				}
			};

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
				article,
				causeName = {
					'Communicable & other Group I': 'Communicable diseases',
					'Noncommunicable diseases': 'Non-communicable diseases',
					Injuries: 'Injuries'
				};

			Highcharts.setOptions({
				'lang':{
					downloadPDF: "Descargar en formato PDF",
					downloadPNG: "Descargar en formato PNG",
					downloadJPEG:"Descargar en formato JPG",
					downloadSVG:"Descargar en formato SVG",
					downloadXLS:"Descargar en formato XLS",
					drillUpText:"< Atrás",
					viewFullscreen: "Ver en pantalla completa",
					printChart: "Imprimir gráfica",
					loading: "Cargando Gráfica"
				}
			});
			var options = {
				series: [{
					type: 'treemap',
					layoutAlgorithm: 'squarified',
					allowDrillToNode: true,
					animationLimit: 1000,
					drillUpButton: {
						text: '< Atrás'
					},	
					dataLabels: {
						enabled: false
					},
					levelIsConstant: false,
					levels: [{
						level: 1,
						dataLabels: {
							enabled: true
						},
						borderWidth: 5
					}],
					data: points
				}],
				subtitle: {
					text: ''
				},
				title: {
					text: ''
				}
			}

			var chart = Highcharts.chart('container-board', options);
			chart.showLoading();

			this.$axios.get('boards/1/occupation/'+ cod, head)
		    	.then( response => {
					var data = response.data.graph;
					this.board = response.data.board
					
					for (region in data) {
						regionVal = 0;
						regionP = {
							id: 'id_' + regionI,
							name: region,
							color: Highcharts.getOptions().colors[regionI+3]
						};
						countryI = 0;
						for (country in data[region]) {
							countryP = {
								id: regionP.id + '_' + countryI,
								name: country,
								parent: regionP.id,
								color: Highcharts.getOptions().colors[countryI+5]
							};
							points.push(countryP);
							causeI = 0;
							for (cause in data[region][country]) {
								causeP = {
									id: countryP.id + '_' + causeI,
									name: cause,
									parent: countryP.id,
									color: Highcharts.getOptions().colors[causeI+2]
								};
								points.push(causeP);
								articleI = 0;
								for (article in data[region][country][cause]){
									articleP = {
										id: causeP.id + '_' + articleI,
										name: article,
										parent: causeP.id,
										value: +data[region][country][cause][article],
										color: Highcharts.getOptions().colors[articleI*2+1]
									};
									regionVal += articleP.value;
									points.push(articleP);
									articleI = articleI + 1;
								}
								causeI = causeI + 1;
							}
							countryI = countryI + 1;
						}
						regionP.value = regionVal;
						points.push(regionP);
						regionI = regionI + 1;
					}
					
					chart.hideLoading();
					options.series[0].data = points;
					Highcharts.chart('container-board', options);
				})
				.catch(error => {
					
				})
		},
 		onChange(event) {
			this.getData(event)
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