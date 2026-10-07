<template>
  <div class="bg-white p-2.5 mt-4 md:w-[50%] mx-auto h-[80vh]">
    <h1 class="text-center mt-4 mb-4">Inscription</h1>
    <form>
      <div class="flex flex-col">
        <label for="email">
          email
        </label>
        <input v-model="form.email" 
              type="email" id="email" 
              class="border rounded-[7px] p-1" 
              placeholder="email">
      </div>

      <div class="flex flex-col mt-4">
        <label for="password">
          Mot de passe
        </label>

        <div class="relative">
          <input v-model="form.password" 
              :type="showPassword ? 'text' : 'password'" 
              id="password" 
              class="border rounded-[7px] p-1 w-full" 
              placeholder="Mot de passe">

              <button type="button" 
                  @click="showPassword = !showPassword">
            <ClientOnly>
              <Icon :name="showPassword ? 'material-symbols:visibility-rounded' : 'mdi-light:eye-off'"
                  :class="{
                          'text-pink': showPassword,
                          'text-black': !showPassword
                          }"
                          class="absolute right-1 top-1/2 -translate-y-1/2"
                  size="24"
              />
            </ClientOnly>
          </button>

        </div>

      </div>         
    </form>
    <div>
      <input type="checkbox" v-model="form.checked" class="opacity-0">
    </div>
    
     
    <div class="flex justify-center">
      <button @click="register" class="bg-background text-pink p-4 rounded-lg font-bold ">S'inscrire</button>
    </div>
  </div>
</template>
<script lang="ts" setup>


const form = reactive({
  email: '',
  password: '',
  checked: false,
});

const showPassword = ref(false)
const register = async () => {
  const response = await $fetch('/api/auth/register', {
    method: 'POST',
    body: form
  })

  await navigateTo('/connexion')
}
</script>