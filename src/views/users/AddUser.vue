<template>
    <VDialog v-model="dialogModel" max-width="700" opacity="0.7">
        <VCard elevation="8">
            <!-- Dialog Header -->
            <div class="pa-6 pb-4 bg-gradient-to-r from-primary to-primary-darken-1">
                <div class="flex justify-center items-center">
                    <div class="gap-3 flex justify-center items-center">
                        <VIcon icon="mdi-account-plus" size="28" />
                        <h2 class="text-xl">{{ t('ADD_NEW_USER') }}</h2>
                    </div>
                </div>
            </div>

            <VDivider />

            <!-- Loading Bar -->
            <VProgressLinear v-if="isLoading" indeterminate color="primary" />

            <!-- Dialog Content -->
            <VCardText class="pa-6">
                <VForm ref="formRef">
                    <VRow>
                        <!-- First Name -->
                        <VCol cols="12" md="6">
                            <VTextField v-model="formData.first_name" :label="t('FIRST_NAME')"
                                prepend-inner-icon="mdi-account" variant="outlined" density="comfortable"
                                color="primary" />
                        </VCol>

                        <!-- Last Name -->
                        <VCol cols="12" md="6">
                            <VTextField v-model="formData.last_name" :label="t('LAST_NAME')"
                                prepend-inner-icon="mdi-account" variant="outlined" density="comfortable"
                                color="primary" />
                        </VCol>

                        <!-- Username -->
                        <VCol cols="12" md="6">
                            <VTextField v-model="formData.user_name" :label="t('USERNAME')" prepend-inner-icon="mdi-at"
                                variant="outlined" density="comfortable" color="primary" :rules="[rules.username]" />
                        </VCol>

                        <!-- Email -->
                        <VCol cols="12" md="6">
                            <VTextField v-model="formData.email" :label="t('EMAIL')" prepend-inner-icon="mdi-email"
                                variant="outlined" density="comfortable" color="primary" type="email"
                                :rules="[rules.email]" />
                        </VCol>

                        <!-- Phone -->
                        <VCol cols="12" md="6">
                            <VTextField v-model="formData.phone" :label="t('PHONE')" prepend-inner-icon="mdi-phone"
                                variant="outlined" density="comfortable" color="primary" :rules="[rules.phone]" />
                        </VCol>

                        <!-- Role -->
                        <VCol cols="12" md="6">
                            <VSelect v-model="formData.role_id" :items="roleOptions" item-title="title"
                                item-value="value" :label="t('ROLE')" prepend-inner-icon="mdi-account-group"
                                variant="outlined" density="comfortable" color="primary" />
                        </VCol>

                        <!-- Password -->
                        <VCol cols="12" md="6">
                            <VTextField v-model="formData.password" :label="t('PASSWORD')" prepend-inner-icon="mdi-lock"
                                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showPassword ? 'text' : 'password'" variant="outlined" density="comfortable"
                                color="primary" :rules="[rules.minLength]"
                                @click:append-inner="showPassword = !showPassword" />
                        </VCol>

                        <!-- Confirm Password -->
                        <VCol cols="12" md="6">
                            <VTextField v-model="formData.confirm_password" :label="t('CONFIRM_PASSWORD')"
                                prepend-inner-icon="mdi-lock-check"
                                :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showConfirmPassword ? 'text' : 'password'" variant="outlined"
                                density="comfortable" color="primary" :rules="[rules.passwordMatch]"
                                @click:append-inner="showConfirmPassword = !showConfirmPassword" />
                        </VCol>

                        <!-- Status -->
                        <VCol cols="12" md="6">
                            <VSelect v-model="formData.status_id" :items="statusOptions" item-title="title"
                                item-value="value" :label="t('STATUS')" prepend-inner-icon="mdi-package-variant"
                                variant="outlined" density="comfortable" color="primary" />
                        </VCol>
                    </VRow>
                </VForm>
            </VCardText>

            <VDivider />

            <!-- Dialog Actions -->
            <VCardActions class="pa-4">
                <VSpacer />
                <VBtn variant="outlined" color="error" class="!border-2 px-6" @click="handleClose"
                    :disabled="isLoading">
                    <VIcon icon="ri-close-line" size="18" class="mr-1" />
                    {{ t('CANCEL') }}
                </VBtn>
                <VBtn variant="outlined" color="info" class="px-6 elevation-2" @click="handleSubmit"
                    :loading="isLoading" :disabled="isLoading">
                    <VIcon icon="ri-check-line" size="18" class="mr-1" />
                    {{ t('CREATE') }}
                </VBtn>
            </VCardActions>
        </VCard>
    </VDialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Props
interface Props {
    modelValue: boolean
}
const props = defineProps<Props>()

// Emits
interface Emits {
    (e: 'update:modelValue', value: boolean): void
    (e: 'submit', userData: any): void
    (e: 'close'): void
}
const emit = defineEmits<Emits>()

// State
const isLoading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const formRef = ref()

// Form data
const formData = ref({
    first_name: '',
    last_name: '',
    user_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    role_id: 1,
    status_id: 1
})

// Options
const roleOptions = computed(() => [
    { title: t('ADMIN'), value: 1 },
    { title: t('MODERATOR'), value: 2 },
    { title: t('OPERATOR'), value: 3 },
])

const statusOptions = computed(() => [
    { title: t('ACTIVE'), value: 1 },
    { title: t('INACTIVE'), value: 2 },
    { title: t('PENDING'), value: 3 },
])

// Simple optional validation rules
const rules = {
    email: (v: string) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || t('INVALID_EMAIL'),
    phone: (v: string) => !v || /^[0-9]{9,15}$/.test(v) || t('INVALID_PHONE'),
    username: (v: string) => !v || /^[a-zA-Z0-9_]{3,20}$/.test(v) || t('INVALID_USERNAME'),
    minLength: (v: string) => !v || v.length >= 6 || t('PASSWORD_MIN_LENGTH'),
    passwordMatch: (v: string) => v === formData.value.password || t('PASSWORD_NOT_MATCH')
}

// Dialog model
const dialogModel = computed({
    get: () => props.modelValue,
    set: (value: boolean) => emit('update:modelValue', value)
})

// Reset form
const resetForm = () => {
    formData.value = {
        first_name: '',
        last_name: '',
        user_name: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: '',
        role_id: 1,
        status_id: 1
    }
    formRef.value?.resetValidation()
}

// Handle submit (NO VALIDATION)
const handleSubmit = async () => {
    isLoading.value = true

    try {
        const { confirm_password, ...userData } = formData.value
        emit('submit', userData)
        resetForm()
        dialogModel.value = false
    } catch (error) {
        console.error('Error creating user:', error)
    } finally {
        isLoading.value = false
    }
}

// Handle close
const handleClose = () => {
    resetForm()
    emit('close')
    dialogModel.value = false
}

// Watch dialog state
watch(() => props.modelValue, (newVal) => {
    if (!newVal) {
        resetForm()
    }
})
</script>
