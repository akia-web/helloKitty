<template>
  <div class="flex bg-white/90 justify-between align-center items-center p-2.5 shadow-md">
    <NuxtLink to="/">
       <ClientOnly>
         <Icon name="mdi-light:home" />
       </ClientOnly>
    </NuxtLink>

      <div class="flex gap-6" >
        <NuxtLink v-for="item in navBarRoute"
         :to="item.link">
          <div class="flex items-center gap-2">
            <ClientOnly>
              <Icon :name=item.iconName />
            </ClientOnly>   
            <p>{{item.name}}</p>
          </div>
        </NuxtLink>
      </div>
      <div v-if="!auth.user">
         <NuxtLink :to="'/connexion'">
          <ClientOnly>
            <Icon name="mdi-light:book" />
          </ClientOnly>
        </NuxtLink>
      </div>

      <div v-else class="flex items-center gap-2">
        <ClientOnly>
          <Icon @click="logout" name="cuida:power-outline" />
        </ClientOnly>
      </div>
     

  </div>


</template>


<script lang="ts" setup>
import { adminNavBarRoutes } from '~/conf/admin-navbar'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()

const navBarRoute = adminNavBarRoutes

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