<template>
  <div class="main w-full h-screen flex items-center justify-center p-4 relative overflow-hidden">
    <div class="w-full max-w-md relative z-10">
      <div class="bg-[#000000c2] rounded-xl shadow-2xl border border-white/20 p-8 overflow-hidden">

        <!-- Header -->
        <div class=" headertext-center0 py-4 flex justify-center items-center border-b">
          <h1 class="text-3xl font-bold text-white">LOGIN</h1>
        </div>

        <form @submit.prevent="handleLogin" class="py-8 px-6">

          <!-- Username -->
          <div class="username">
            <label class="block text-sm font-medium text-gray-200 mb-1">Username</label>
            <div class="relative">
              <input
                class="block w-full rounded-lg py-3 pl-12 pr-4  border border-white/10 outline-none placeholder-gray-400 text-gray-300 transition-all duration-200"
                placeholder="Enter your username" />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon icon="mdi:rename-outline" width="24" height="24" />
              </div>
            </div>
          </div>

          <!-- Password -->
          <div class="password">
            <label for="password" class="block text-sm font-medium text-gray-200 mb-1 mt-4">Password</label>
            <div class="relative">
              <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'" required
                class="block w-full rounded-lg py-3 pl-12 pr-12  border border-white/20 outline-none placeholder-gray-400 text-gray-300 transition-all duration-200"
                placeholder="Enter your password" @blur="validatePassword" />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon icon="simple-line-icons:lock" width="20" height="20" />
              </div>

              <!-- Show password  -->
              <button type="button" @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-300 hover:text-white transition-colors duration-200">
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Remember me -->
          <div class="flex items-center justify-between mt-4">
            <label class="flex items-center">
              <input v-model="form.rememberMe" type="checkbox"
                class="w-4 h-4 text-purple-600 bg-transparent border-gray-300 rounded focus:ring-purple-500 focus:ring-2" />
              <span class="ml-2 text-sm text-gray-300">Remember me</span>
            </label>
          </div>

          <!-- Login button -->
          <v-btn color="#0091EA" class="w-full bg-red-500 border-none mt-4">
            LOGIN
          </v-btn>
        </form>
      </div>
    </div>
  </div>
</template>



<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { Icon } from "@iconify/vue";

const showPassword = ref(false)
const isLoading = ref(false)
const emailError = ref('')
const passwordError = ref('')
const form = reactive({
  password: '',
  rememberMe: false
})


// Password validation
const validatePassword = (): void => {
  if (!form.password) {
    passwordError.value = 'Password is required'
  } else if (form.password.length < 6) {
    passwordError.value = 'Password must be at least 6 characters'
  } else {
    passwordError.value = ''
  }
}

// HANDLE LOGIN
const handleLogin = async (): Promise<void> => {
  validatePassword()

  if (emailError.value || passwordError.value) {
    return
  }
  isLoading.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 2000))
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="css">
.main {
  background-image: url("/src/assets/images/background/image.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>