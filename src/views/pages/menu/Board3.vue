<template>
	<vue-scroll class="page-dashboard">
	<h2>{{board.name}}</h2>
	<h4>{{board.type.name}}</h4>
	<h6>{{board.description}}</h6>	
	<el-row class="mt-0" :gutter="30">	
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
			this.board_id = 2
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
						printChart: "Imprimir gráfica"
					}
				})
				

			let head = {
				headers: { 
					Authorization : 'Bearer ' + this.$store.state.poo.object1
				}
			};

			this.$axios.get('boards/1/occupation/35', head)
		    	.then( response => {
					var data = response.data.graph;
					this.board = response.data.board
					
					for (region in data) {
						if (data.hasOwnProperty(region)) {
							regionVal = 0;
							regionP = {
								id: 'id_' + regionI,
								name: region,
								color: Highcharts.getOptions().colors[regionI*2+1]
							};
							countryI = 0;
							for (country in data[region]) {
								if (data[region].hasOwnProperty(country)) {
									countryP = {
										id: regionP.id + '_' + countryI,
										name: country,
										parent: regionP.id,
										color: Highcharts.getOptions().colors[countryI*2]
									};
									points.push(countryP);
									causeI = 0;
									for (cause in data[region][country]) {
											if (data[region][country].hasOwnProperty(cause)) {
											causeP = {
												id: countryP.id + '_' + causeI,
												name: cause,
												parent: countryP.id
											};
											points.push(causeP);
											articleI = 0;
											for (article in data[region][country][cause]){
											if (data[region][country][cause].hasOwnProperty(article)) {
												articleP = {
													id: causeP.id + '_' + articleI,
													name: article,
													parent: causeP.id,
													value: Math.round(+data[region][country][cause][article])
												};
												regionVal += articleP.value;
												points.push(articleP);
												articleI = articleI + 1;
											}
										}
										}
										causeI = causeI + 1;
									}
									countryI = countryI + 1;
								}
							}
							regionP.value = Math.round(regionVal / countryI);
							points.push(regionP);
							regionI = regionI + 1;
						}
					}
					
				
					Highcharts.chart('container-board', {
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
					});
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