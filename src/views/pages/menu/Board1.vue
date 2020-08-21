<template>
	<vue-scroll class="page-dashboard">
	<h2>Ocupación del CEDI</h2>
	<h5>Tablero digital que muestra la ocupación del CEDI</h5>	
	<el-row class="mt-0" :gutter="30">	
		<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
			<div id="container-board"></div>
		</el-col>
	</el-row>
	<br><br>
	<component-comments :board="1" :user="2" /> 
	</vue-scroll>
</template>

<script>

import componentComments from '../../../components/Comments.vue'
import * as Highcharts from 'highcharts'
import * as Treemap from 'highcharts/modules/treemap'
//import * as Exporting from 'highcharts/modules/exporting'
//Exporting(Highcharts)
Treemap(Highcharts)
export default {
    data() {
        return {
            activeNames: ['1'],
            asyncComponent:true,
			tableData: [],
			board_id: 0,
			user_id: 0
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

			var data = {
				"Negocio - 1010": {
					"21010": {
						"A-2Z": {
						"ARTICULO-97137": 1,
						"ARTICULO-97819": 2
						}
					},
					"21020": {
						"A-0VZ":{
						"ARTICULO-11231": 1
						},
						"A-1FZ": {
						"ARTICULO-19982": 2
						}
					},
					"21040": {
						"A-5MZ": {
						"ARTICULO-10019": 1
						}
					},
					"21080": {
						"A-63Z": {
						"ARTICULO-12163": 1
						}
					},
					"21090": {
						"A-63Z": {
						"ARTICULO-12163": 1
						},
						"A-7FZ": {
						"ARTICULO-10882": 1
						}
					}
				},
				"Negocio - 3535": {
					"23510": {
						"A-E1Z": {
						"ARTICULO-22243": 1
						},
						"A-E3Z": {
						"ARTICULO-22273": 1
						},
						"A-E4Z": {
						"ARTICULO-22203": 1,
						"ARTICULO-223079": 2
						}
					},
					"23530": {
					"A-E2Z": {
						"ARTICULO-21853": 1
						},
						"A-E3Z": {
						"ARTICULO-21855": 1
						},
						"A-E4Z": {
						"ARTICULO-21859": 1
						},
						"A-E5Z": {
						"ARTICULO-21874": 1,
						"ARTICULO-21844": 2,
						"ARTICULO-21930": 3
						}
					}
				}
			};

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
					console.log(points);
					regionI = regionI + 1;
				}
			}

			Highcharts.chart('container-board', {
				series: [{
					type: 'treemap',
					layoutAlgorithm: 'squarified',
					allowDrillToNode: true,
					animationLimit: 1000,
					dataLabels: {
						enabled: false
					},
					levelIsConstant: false,
					levels: [{
						level: 1,
						dataLabels: {
							enabled: true
						},
						borderWidth: 3
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