<template>
  <h1>Inscription</h1>
    <form>
      <div class="flex flex-col">
        <label for="email">
          email
        </label>
        <input v-model="form.email" 
              type="email" id="email" 
              class="border" 
              placeholder="email">
      </div>

      <div class="flex flex-col mt-4">
        <label for="password">
          Mot de passe
        </label>
        <input v-model="form.password" 
              :type="showPassword ? 'text' : 'password'" 
              id="password" 
              class="border" 
              placeholder="Mot de passe">
      </div>

        <button type="button" 
                @click="showPassword = !showPassword">
              {{ showPassword ? 'Cacher' : 'Afficher' }}
        </button>
         
    </form>
    <div>
      <input type="checkbox" v-model="form.checked" class="opacity-0">
    </div>
    
     

    <button @click="register" class="border mt-4">Se connecter</button>

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
}
</script>