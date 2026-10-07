<template>
  <div class=" flex flex-col bg-white justify-between align-center items-center p-1.5 shadow-md">
        <div class="flex gap-6" >
            <NuxtLink to="/">
                <div class="flex items-center gap-2 flex-col">
                <ClientOnly>
                    <Icon name="mdi-light:format-list-numbered" />
                </ClientOnly>
                <p>ToDo</p>
                </div>
            </NuxtLink>
            <NuxtLink v-for="item in navBarRoute"
            :to="item.link">
            <div class="flex items-center gap-2 flex-col">
                <ClientOnly>
                <Icon :name=item.iconName />
                </ClientOnly>   
                <p>{{item.name}}</p>
            </div>
            </NuxtLink>

            <div v-if="!auth.user">
                <NuxtLink :to="'/connexion'">
                    <div class="flex items-center gap-2 flex-col">
                        <ClientOnly>
                            <Icon name="mdi-light:book" />
                        </ClientOnly>
                        <p>Login</p>
                    </div>
                </NuxtLink>
      
            </div>
            <div v-else class="flex items-center gap-2">

                <div class="flex items-center gap-2 flex-col ">
                                <ClientOnly>
                                <Icon @click="logout" name="cuida:power-outline" />
                                <p>Logout</p>
                                </ClientOnly>
                </div>
                    <NuxtLink :to="'/admin/personnages'" v-if="auth.user.role ==='ADMIN'">
                        <div class="flex items-center gap-2 flex-col ">
                                            <ClientOnly>
                                            <Icon name="mdi-light:view-dashboard" />
                                            </ClientOnly>   
                                            <p>Dash</p>
                        </div>
                    </NuxtLink>
                
            </div>
        
        </div>
  </div>


</template>


<script lang="ts" setup>
import { navBarRoutes } from '~/conf/nav-bar'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()

const navBarRoute = navBarRoutes

const logout = async() =>{
   await auth.logout()
   navigateTo('/')
}


</script>



<style scoped>
.logo {
  width: 130px;
}
</style>