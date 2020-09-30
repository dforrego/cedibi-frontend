<template>
 	
	<div class="login-page flex">
		<div class="box grow scrollable align-vertical side-box box-left">
			<div class="align-vertical-middle wrapper text-center">
				
				<h1 class="h-big text-white">¡Bienvenidos!</h1>
				<h3 class="p-20 text-white">
					Aplicación web que integra tecnologías de Inteligencia de Negocios para la gestión en centros 
					de distribución (CEDI) en empresas de manufactura de la ciudad de cali.</h3>
			</div>
			
		</div>
		<div class="box grow scrollable align-vertical side-box box-right">
			<div class="align-vertical-middle wrapper">
				<el-row :gutter="10"> 
					<el-col class="text-center">
					<div class="grid-content bg-purple">
						<img class="image-logo" src="@/assets/images/logo2.svg" alt="logo-left" width="200px"/>
					</div>
				</el-col> 
				</el-row>
				
				<form class="form-box" @submit.prevent="login">
					<h4 class="font-size-15">Inicio de Sesión</h4>
					<el-alert
						title="¡Error!"
						type="error"
						:description="msg"
						show-icon
						v-show="visible_alert">
					</el-alert>
					<float-label class="styled font-size-12">
						<input type="username" name="username" placeholder="Nombre de Usuario" v-model="username">
					</float-label>
					<float-label class="styled font-size-12">
						<input type="password" name="password" placeholder="Contraseña" v-model="password">
					</float-label>
					
					<div class="flex text-center center pt-30 pb-10">			
						<el-button plain size="medium" native-type="button" @click="login" class="login-btn pulse animated themed">
							Ingresar
						</el-button>
					</div>
					

				</form>
				
			</div>
			
		</div>

	</div>
</template>

<script>
export default {
	name: 'Login2',
	data() {
		return {
			username: '',
			password: '',
			visible_alert: false,
			msg: ''
		}
	},
	mounted() {
		let profile = this.$session.get('profile') 
		if (this.$session.exists()) {
			this.$store.commit('setLogin');
			if (profile.profile.rol.code == 10){
				this.$router.push({name: 'dash-client'});
			} else {
				this.$router.push({name: 'dash-cedi'});
			}
		}
	},
	methods: {
		login: function () {
			this.visible_alert = false;
			this.$login.post('', {
				login: this.username,
				password: this.password
			})
			.then (res => {
				console.log(res);
				if (res.data.coderesponse === 0){
					return this.oauth(res.data.user);
				} else {
					throw new Error("Error del Servidor")
				}
			})
			.then(profile => {
				console.log(profile);
				this.$session.set('profile', profile);
				if (profile.profile.rol.code == 10){
					this.$router.push({ 
						name: 'dash-client'
					});
				} else {
					this.$router.push({ 
						name: 'dash-cedi'
					});
				}
			})
			.catch (err => {				
				this.visible_alert = true;
				if (err.toString().includes("400")){
					this.msg = "Datos incorrectos del usuario";
				} else {
					this.msg = "Error del Servidor";
				}
			})	
		},
		oauth: function(profile) {
			const formData = new FormData();
			formData.append('grant_type', this.$store.state.toa.param1);
			formData.append('client_id', this.$store.state.toa.param2);
			formData.append('client_secret', this.$store.state.toa.param3);
			return this.$oauth.post('token/', formData)
			.then(res => {
				console.log(res);
				if (res.data.access_token){
					this.$session.start()
					this.$store.commit('setLogin');
					this.$store.commit('setGlobalData', {
						object1: res.data.access_token, 
						object2: res.data.expires_in
					});
					return profile;
				} else {
					throw new Error("Error del Servidor")
				}
			})
		}
	}
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables';

.login-page {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 0 !important;

	.side-box {
		.wrapper {
			width: 100%;
			box-sizing: border-box;
			padding: 20px;
		}
	}

	.box-left {
		background-image: linear-gradient(
      	rgba(0, 0, 0, 0.5),
      	rgba(0, 0, 0, 0.5)
    	), url('../../../assets/images/preview.jpg');
		background-size: cover;
		background-position: 50% 50%;

		.wrapper {
			.image-logo {
				width: 90%;
				max-width: 100px;
				margin-top: 20px;
			}

		}
	}
	.box-right {
		background: white;
		color: var(--background-color);
	}
	
	.form-box {
		width: 100%;
		max-width: 340px;
		padding: 30px;
		box-sizing: border-box;
		margin: 20px auto;
		//background: transparent;

		a {
			font-size: 14px;
			color: var(--color-accent);
			text-decoration: none;
			font-weight: 500;
		}

		.image-logo {
			width: 80px;
			margin: 0px auto;
			margin-bottom: 70px;
			display: block;
		}

		.login-btn {
			background: rgba(var(--color-accent-rgb), .2);
			color: var( --text-color);
			border-color: var(--text-color);
			border-width: 2px;
			font-weight: bold;
			border-radius: 0;

			&:hover {
				background: rgba(var(--color-accent-rgb), 1);
				border-color: var(--text-color);
				color: var( --text-color);
			}
		}
	}
}

@media (max-width: 1200px) {
.login-page {
	.box-left {
		.wrapper {
			.h-big {
				font-size: 50px;
			}
		}
	}
}
}
@media (max-width: 900px) {
	.login-page {
		.box-left {
			.wrapper {
				.h-big {
					font-size: 30px;
				}
			}
		}
	}
}
@media (max-width: 768px) {
	.login-page {
		display: block;
		overflow: auto;
		
		.side-box {
			display: block;
		}
	}
}
</style>
