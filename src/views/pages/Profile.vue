<template>
	<vue-scroll class="page-profile" id="affix-container">
		<div class="card-base card-shadow--medium identity" id="boundary">
			<div class="cover"></div>
			<!--<div class="username" v-affix="{parentid: 'affix-container', boundaryid: '', delay:600, offset:0, enable:() => affixEnabled}">-->
			<div class="username">
				<div class="cover-small"></div>
				<div class="avatar-small"><img src="@/assets/images/avatar.jpg" alt="avatar"></div>
				<span>{{username}}</span>
				<div class="colors-box">
					<div v-for="i in 5" :key="i" :class="{'color':true, 'active':colorActive}" :style="{'background':color}"></div>
				</div>
			</div>
			<div class="avatar"><img src="@/assets/images/avatar.jpg" alt="avatar"></div>
			<img src="@/assets/images/cover-2.jpg" id="color-thief" class="color-thief" alt="profile cover">
		</div>


<el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
    <el-tab-pane label="User" name="first"><div class="page-profile-edit">

		<el-form ref="form" :model="form" label-width="120px" >
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Username">
						<el-input v-model="form.username"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Email">
						<el-input v-model="form.email" type="email"/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="First name">
						<el-input v-model="form.firstName"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Last name">
						<el-input v-model="form.lastName"/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Birthday">
						<el-date-picker type="date" placeholder="Pick a date" v-model="form.birthday" style="width: 100%;"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Gender">
						<el-radio-group v-model="form.gender">
							<el-radio label="Male" border></el-radio>
							<el-radio label="Female" border></el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Phone">
						<el-input v-model="form.phone" placeholder="+xx xxx xxx xxxx"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Website">
						<el-input v-model="form.website" placeholder="https://"/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Address">
						<el-input v-model="form.address"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Postal code">
						<el-input v-model="form.postalCode"/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="City">
						<el-input v-model="form.city"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Country">
						<el-input v-model="form.country"/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Hobbies">
						<el-select
							class="select-wide"
							v-model="form.hobbies"
							multiple
							filterable
							allow-create
							default-first-option
							placeholder="Choose tags for your hobbies">
							<el-option
							v-for="item in hobbies"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Skills">
						<el-select
							class="select-wide"
							v-model="form.skills"
							multiple
							filterable
							allow-create
							default-first-option
							placeholder="Choose tags for your skills">
							<el-option
							v-for="item in skills"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-col>
						
			<el-col class="col-p">
				<el-form-item label="About me">
					<el-input type="textarea" v-model="form.aboutMe" autosize></el-input>
				</el-form-item>
			</el-col>
			<el-col class="col-p">
				<el-form-item>
					<el-button type="primary" @click="onSubmit">Save</el-button>
					<el-button>Cancel</el-button>
				</el-form-item>
			</el-col>
		</el-form>
	</div></el-tab-pane>
  </el-tabs>

	</vue-scroll>
</template>

<script>
import ColorThief from 'color-thief-browser'
import Affix from '@/components/Affix'

export default {
	name: 'Profile',
	data() {
		return {
			username: 'Aurora Shenton',
			colorActive: false,
			color: 'white',
			affixEnabled: true,
			form: {
				username: 'aShenton',
				email: 'ashenton@mail.com',
				firstName: 'Aurora',
				lastName: 'Shenton',
				birthday: '1991-02-13T23:00:00.000Z',
				phone: '',
				website: '',
				hobbies: [],
				skills: ['JavaScript', 'HTML', 'CSS', 'Vue.js'],
				gender: 'Female',
				address: '',
				city: '',
				country: '',
				postalCode: '',
				aboutMe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus posuere libero, nec convallis arcu ullamcorper a. Vestibulum diam neque, egestas scelerisque arcu a, fermentum ornare mauris. Ut venenatis vulputate maximus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur scelerisque quis turpis ac tempus. Quisque dolor dolor, fermentum nec magna eget, fringilla auctor lacus. Aenean sagittis est ac ligula pharetra, quis imperdiet ante dignissim. Ut vehicula nec nisl a pretium. Quisque faucibus auctor viverra. Sed ultricies convallis magna. In blandit eros id efficitur vulputate. Duis efficitur sollicitudin dui non vehicula. Nullam ut eros fermentum, dapibus metus non, accumsan neque. Mauris sed pellentesque felis. Suspendisse viverra risus sit amet congue consectetur.'
			},
			hobbies: [
				{
					value: 'Model building',
					label: 'Model building'
				}, {
					value: 'Drawing',
					label: 'Drawing'
				}, {
					value: 'Snowboarding',
					label: 'Snowboarding'
				}
			],
			skills: [
				{
					value: 'HTML',
					label: 'HTML'
				}, {
					value: 'CSS',
					label: 'CSS'
				}, {
					value: 'JavaScript',
					label: 'JavaScript'
				}
			],
			labelPosition: 'right',
			activeName: 'first'
		}
	},
	methods: {
		resizeAffixEnabled() {
			if(window.innerWidth <= 768) {
				this.affixEnabled = false	
			} else {
				this.affixEnabled = true	
			}
		}
	},
	mounted() {
		var colorThief = new ColorThief();
		setTimeout(()=>{
			let rgb = colorThief.getColor(document.getElementById('color-thief'))
			//console.log('Profile mounted', rgb)
			this.colorActive = true
			this.color = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
		}, 1000)

		this.resizeAffixEnabled();
		window.addEventListener('resize', this.resizeAffixEnabled);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizeAffixEnabled);
	},
	components: {
		Affix,
	}
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

.page-profile {
	overflow: auto;

	.identity {
		margin-bottom: 20px;
		position: relative;
		width: 100%;
		height: 370px;

		.cover {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-image: url('../../assets/images/cover-2.jpg');
			background-position: 50%;
			background-size: cover;
			background-repeat: no-repeat;
			width: 100%;
			height: 100%;
		}
		.username {
			color: #32325d;
			position: absolute;
			width: 100%;
			height: 50px;
			bottom: 75px;
			left: 0;
			right: 0;
			background: #fff;
			line-height: 50px;
			box-sizing: border-box;
			padding-left: 250px;
			font-size: 25px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			box-shadow: 0 7px 14px 0 rgba(50, 50, 93, 0.1), 0 3px 6px 0 rgba(0, 0, 0, 0.07);

			.cover-small {
				width: 220px;
				height: 50px;
				overflow: hidden;
				display: block;
				float: left;
				margin-right: -220px;
				position: relative;
				left: -250px;
				border-radius: 9px;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				border: 4px solid white;
				opacity: 0;
				top: 0px;
				background-image: url('../../assets/images/cover-2.jpg');
				background-position: 50%;
				background-size: cover;
				background-repeat: no-repeat;
				-webkit-transition: all .5s;
				transition: all .5s;
			}
			.avatar-small {
				width: 50px;
				height: 50px;
				overflow: hidden;
				display: block;
				float: left;
				margin-right: -50px;
				position: relative;
				left: -100px;
				border-radius: 50%;
				box-sizing: border-box;
				border: 4px solid white;
				opacity: 0;
				top: 0px;
				transform: rotate(-50deg);
				transition: all .5s;
			}
			.avatar-small img {
				width: 100%;
			}

			&.affix {
				z-index: 99;
				border-radius: 5px;

				.cover-small {
					opacity: 1;
				}

				.avatar-small {
					opacity: 1;
					left: -60px;
					transform: rotate(0deg);
				}
			}

			.colors-box {
				height: 50px;
				background: white; //091c2d
				float: right;

				.color {
					width: 50px;
					height: 50px;
					background: white; //091c2d
					float: right;
					transform: skew(-45deg);
					box-shadow: 1px 0px 1px 0px transparent;
					position: relative;
					right: -25px;
					margin-right: -50px;
					transition: margin-right .75s;

					&.active {
						margin-right: 0;
					}

					&:nth-child(2) { opacity: .8; }
					&:nth-child(3) { opacity: .6; }
					&:nth-child(4) { opacity: .4; }
					&:nth-child(5) { opacity: .2; }
				}
			}
		}
		.avatar {
			border: 6px solid #fff;
			position: absolute;
			bottom: 10px;
			left: 50px;
			width: 180px;
			height: 180px;
			overflow: hidden;
			border-radius: 50%;
			box-sizing: border-box;
			box-shadow: 0px 20px 15px -15px rgba(0, 0, 0, 0.15);

			img {
				width: 100%;
			}
		}

		.color-thief {
			display: block;
			width: 100px;
			visibility: hidden;
			z-index: -999999;
			position: absolute;
		}
	}

	.info {
		padding: 24px 32px;
	}
}

@media (max-width: 768px) {
	.page-profile {
		.identity {
			height: auto;

			.avatar {
				bottom: inherit;
				top: 10px;
				left: 50%;
				width: 100px;
				margin-left: -50px;
				height: 100px;
				border-width: 3px;
			}

			.username {
				position: inherit;
				padding: 10px ;
				margin: 0;
				top: inherit;
				left: inherit;
				z-index: 1;
				right: inherit;
				text-align: center;
				bottom: inherit;
				white-space: inherit;
				line-height: inherit;
				height: auto;
				margin-top: 120px;
				width: 90%;
				margin-left: 5%;
				margin-bottom: 10px;
				border-radius: 50px;

				.colors-box {
					display: none;
				}

				.avatar-small {
					display: none;
				}

				.cover-small {
					display: none;
				}
			}
		}

		.info {
			padding: 8px 16px;
		}
	}
}
</style>

<style lang="scss">
.page-profile {
	.el-tabs:not(.el-tabs--border-card) {
		.el-tabs__item:not(.is-active) {
			color: #32325d;
		}
	}
}
</style>
