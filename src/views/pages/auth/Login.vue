<template>
    <div class="login-page flex">
        <div class="box grow scrollable align-vertical side-box box-left">
            <div class="align-vertical-middle wrapper text-center">
                
                <h1 class="h-big text-white">CeDiBI</h1>
                <p class="p-50 text-white">APLICACIÓN WEB QUE INTEGRA TECNOLOGÍAS DE INTELIGENCIA DE NEGOCIOS PARA LA GESTIÓN EN CENTROS DE DISTRIBUCIÓN (CEDI) EN EMPRESAS DE MANUFACTURA DE LA CIUDAD DE CALI.</p>
            </div>
        </div>
        <div class="box grow scrollable align-vertical side-box box-right">
            <div class="align-vertical-middle wrapper">
                <el-row :gutter="10"> 
                    <el-col :span="12" :offset="8">
                    <div class="grid-content bg-purple">
                        <img class="image-logo" src="@/assets/images/logo.svg" alt="logo-left" width="200px"/>
                    </div>
                </el-col> 
                </el-row>
					<ValidationObserver v-slot="{ handleSubmit }">
						<form @submit.prevent="handleSubmit(onSubmit)" class="form-box" >
							<h2>Inicio de Sesión</h2>
							
							<ValidationProvider name="E-mail" rules="required|email" v-slot="{ errors }">
								<float-label class="styled">
									<input type="username" name="username" placeholder="Nombre de Usuario" v-model="username">
								</float-label>
								<span class="formError">{{ errors[0] }}</span>
							</ValidationProvider>

							<ValidationProvider name="password" rules="required" v-slot="{ errors }">
								<float-label class="styled">
									<input type="password" name="password" placeholder="Contraseña" v-model="password">
								</float-label>
								<span class="formError">{{ errors[0] }}</span>
							</ValidationProvider>

							<div class="flex text-center center pt-30 pb-10">           
								<el-button plain size="small" native-type="submit" @click="login" class="login-btn pulse animated themed">
									Ingresar
								</el-button>
							</div>
						</form>
					</ValidationObserver>
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
            password: ''
        }
    },
    mounted() {
        let sid = this.$session.id() 
        console.log(sid)
        if (sid) {
            this.$store.commit('setLogin');
            this.$router.push({ 
                    name: 'dashboard'
            });
        }
    
    },
    methods: {
        login: async function () {
            let response = await this.$login.post('', {
                login: this.username,
                password: this.password
            })
            console.log(response);
            if (response.data.coderesponse === 0){
                await this.oauth(response.data.user);
            } else {
                alert("Error login");
            }
        },
        oauth: async function(profile) {
            const formData = new FormData();
            formData.append('grant_type', this.$store.state.toa.param1);
            formData.append('client_id', this.$store.state.toa.param2);
            formData.append('client_secret', this.$store.state.toa.param3);

            let response = await this.$oauth.post('token/', formData);
            if (response.data.access_token){
                this.$session.start()
                this.$store.commit('setLogin');
                this.$store.commit('setGlobalData', {
                    object1: response.data.access_token, 
                    object2: response.data.expires_in
                });
                this.$session.set('profile', profile);
                this.$router.push({ 
                    name: 'dashboard'
                });
            }
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
        
        background-image: 
    linear-gradient(
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

.formError{
	color: red !important;
	font-size: 12px !important;
}

</style>

