<template>
    <div class="auth-wrapper d-flex align-center justify-center pa-4">
        <VCard class="auth-card pa-4 " min-width="420" min-height="400">
            <VCardItem class="justify-center">
                <div to="/" class="d-flex align-center gap-3">
                    <h2 class="font-weight-medium text-2xl text-uppercase py-4">
                        MT-POKER ADMIN
                    </h2>
                </div>
            </VCardItem>

            <VCardText>
                <VForm @submit.prevent="() => { }">
                    <VRow>
                        <!-- Username -->
                        <VCol cols="12">
                            <VTextField v-model="uppercaseUsername" :label="t('USERNAME')" type="text" />
                        </VCol>

                        <!-- Password -->
                        <VCol cols="12">
                            <VTextField v-model="password" :label="t('PASSWORD')" placeholder="············"
                                :type="isPasswordVisible ? 'text' : 'password'" autocomplete="password"
                                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                                @click:append-inner="isPasswordVisible = !isPasswordVisible" />


                            <!-- Remember me checkbox -->
                            <div class="d-flex align-center justify-space-between flex-wrap my-4">
                                <VCheckbox v-model="remember" :label="t('REMEMBERME')" />
                            </div>

                            <!-- Login button -->
                            <VBtn @click="handleLogin" block type="submit" to="/" color="info">
                                <template v-if="loading">
                                    <Icon icon="svg-spinners:8-dots-rotate" width="20" height="20"
                                        class="animate-spin mr-2" />
                                </template>
                                <template v-else>
                                    {{ t('LOGIN') }}
                                </template>
                            </VBtn>
                        </VCol>

                        <div class="change-language w-full flex justify-center items-center gap-4 py-4">
                            <div class="kh-btn">
                                <v-btn @click="changeLanguage('km')" variant="tonal">
                                    <img src="/src/assets/images/flag/cambodia-flag.png" alt="Cambodia"
                                        class="w-10 h-6 !rounded-[2px] cursor-pointer" />
                                </v-btn>

                            </div>
                            <div class="usa-btn">
                                <v-btn @click="changeLanguage('en')" variant="tonal">
                                    <img src="/src/assets/images/flag/usa-flag.webp" alt="Usa"
                                        class="w-10 h-6 !rounded-[2px] cursor-pointer" />
                                </v-btn>
                            </div>
                        </div>
                    </VRow>
                </VForm>
            </VCardText>
        </VCard>

        <VImg class="auth-footer-start-tree d-none d-md-block" :src="authV1Tree" :width="250" />
        <VImg :src="authV1Tree2" class="auth-footer-end-tree d-none d-md-block" :width="350" />

        <!-- Background image -->
        <VImg class="auth-footer-mask d-none d-md-block" :src="authThemeMask" />
    </div>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@images/pages/auth-v1-tree-2.png'
import authV1Tree from '@images/pages/auth-v1-tree.png'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router';
import { login } from '@/services/authentication'
import { Icon } from "@iconify/vue";
import { sonnerToast } from "@/utils/toast";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();
const loading = ref(false);
const isPasswordVisible = ref(false)
const vuetifyTheme = useTheme()
const username = ref('');
const password = ref('');
const remember = ref(false)
const router = useRouter();
const selectedLang = ref(locale.value);

const authThemeMask = computed(() => {
    return vuetifyTheme.global.name.value === 'light'
        ? authV1MaskLight
        : authV1MaskDark
})

const uppercaseUsername = computed({
    get: () => username.value,
    set: (value: string) => {
        username.value = value.toLocaleUpperCase();
    }
})

const handleLogin = async () => {
    if (!username.value || !password.value) {
        sonnerToast("Validation Error", "Username and Password are required", "error");
        return;
    }

    const usernameRegex = /^[A-Za-z0-9_@.]+$/;
    if (!usernameRegex.test(username.value)) {
        sonnerToast(
            "Invalid Username",
            "Username can only contain letters, numbers, underscores, @ and .",
            "error"
        );
        return;
    }

    loading.value = true;

    try {
        const response = await login(username.value, password.value);

        if (response && response.success) {
            const token = response.data?.auth?.token;
            if (token) {
                localStorage.setItem("auth_token", token);
                sonnerToast("Success", "Login Successfully!", "success");
                router.push("/dashboard");
            }
        } else {
            sonnerToast("Login Failed", "Invalid username or password", "error");
        }
    } catch (error) {
        sonnerToast("Error", "Wrong username or password", "error");
        console.error(error);
    } finally {
        loading.value = false;
    }
};

const changeLanguage = (value: string) => {
    locale.value = value;
    selectedLang.value = value;
    localStorage.setItem("lang", value);
};


// onMounted(() => {
//     const savedLang = localStorage.getItem("lang") || navigator.language || "en";
//     locale.value = savedLang;
// });

</script>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>
