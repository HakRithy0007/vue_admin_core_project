<template>
    <VDialog v-model="dialogModel" max-width="600" persistent class="custom-dialog" opacity="0.7"
        @click:outside="handleClose">
        <VCard>
            <!-- Dialog Header -->
            <VCardTitle class="flex justify-center items-center">
                <span class="text-[20px] flex justify-center items-center py-2">{{ t('EDIT_USER') }}</span>
            </VCardTitle>

            <VDivider />

            <!-- Loading Bar -->
            <VProgressLinear v-if="isLoading" indeterminate color="primary" />

            <!-- Dialog Content -->
            <VCardText class="pa-6">
                <VForm @submit.prevent="handleSave">
                    <VRow>

                        <VCol cols="12" md="6">
                            <VTextField v-model="formData.first_name" :label="t('FIRST_NAME')"
                                prepend-inner-icon="mdi:account" variant="outlined" density="comfortable"
                                :rules="rules.firstName"
                                @input="formData.first_name = formData.first_name.toUpperCase()" required />
                        </VCol>

                        <VCol cols="12" md="6">
                            <VTextField v-model="formData.last_name" :label="t('LAST_NAME')"
                                prepend-inner-icon="mdi:account" variant="outlined" density="comfortable"
                                :rules="rules.lastName" @input="formData.last_name = formData.last_name.toUpperCase()"
                                required />
                        </VCol>

                        <VCol cols="12" md="6">
                            <VTextField v-model="formData.user_name" :label="t('USERNAME')" prepend-inner-icon="mdi:at"
                                variant="outlined" density="comfortable" :rules="rules.username"
                                @input="formData.user_name = formData.user_name.toUpperCase()" required />
                        </VCol>

                        <VCol cols="12" md="6">
                            <VTextField v-model="formData.email" :label="t('EMAIL')" prepend-inner-icon="mdi:at"
                                variant="outlined" density="comfortable" :rules="rules.email" required />
                        </VCol>


                        <VCol cols="12" md="6">
                            <VTextField v-model="formData.phone" :label="t('PHONE')" prepend-inner-icon="mdi:phone"
                                variant="outlined" density="comfortable" :rules="rules.phone" required />
                        </VCol>

                        <VCol cols="12" md="6">
                            <VSelect v-model="formData.role_id" :items="roleOptions" item-title="title"
                                item-value="value" :label="t('ROLE')" prepend-inner-icon="mdi:account-group"
                                variant="outlined" density="comfortable" required />
                        </VCol>

                        <VCol cols="12" md="6">
                            <VSelect v-model="formData.status_id" :items="statusOptions" item-title="title"
                                item-value="value" :label="t('STATUS')" prepend-inner-icon="mdi:package-variant"
                                variant="outlined" density="comfortable" required />
                        </VCol>
                    </VRow>
                </VForm>
            </VCardText>

            <VDivider />

            <!-- Actions -->
            <VCardActions class="pa-4">
                <VSpacer />
                <VBtn variant="outlined" color="error" @click="handleCancel" class="!w-20 !border-2"
                    :disabled="isLoading">
                    {{ t('CANCEL') }}
                </VBtn>
                <VBtn variant="outlined" color="info" @click="handleSave" class="ml-2 !w-20 !border-2"
                    :loading="isLoading" :disabled="isLoading">
                    {{ t('SAVE') }}
                </VBtn>
            </VCardActions>
        </VCard>
    </VDialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { User } from '@/types/user_type'
import { updateUser, getFormUpdate } from '@/services/user'

const { t } = useI18n()

// Props
interface Props {
    modelValue: boolean
    user: User | null
}
const props = defineProps<Props>()

// Emits
interface Emits {
    (e: 'update:modelValue', value: boolean): void
    (e: 'update', user: User): void
    (e: 'close'): void
    (e: 'success'): void
}
const emit = defineEmits<Emits>()

const isLoading = ref(false)

// Role & Status options - using role_id as value
const roleOptions = computed(() => [
    { title: t('ADMIN'), value: 1 },
    { title: t('MODERATOR'), value: 2 },
    { title: t('OPERATOR'), value: 3 },
])

const statusOptions = computed(() => [
    { title: t('ACTIVE'), value: 1 },
    { title: t('INACTIVE'), value: 2 },
    { title: t('SUSPEND'), value: 3 },
])

const rules = {
    firstName: [
        (v: string) => !!v || t('REQUIRED'),
        (v: string) => /^[A-Za-z]+$/.test(v) || t('ONLY_LETTERS'),
    ],
    lastName: [
        (v: string) => !!v || t('REQUIRED'),
        (v: string) => /^[A-Za-z0-9_]+$/.test(v) || t('INVALID_LASTNAME'),
    ],
    username: [
        (v: string) => !!v || t('REQUIRED'),
        (v: string) => /^[A-Za-z0-9_]+$/.test(v) || t('INVALID_USERNAME'),
    ],
    email: [
        (v: string) => !!v || t('REQUIRED'),
        (v: string) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || t('INVALID_EMAIL'),
    ],
    phone: [
        (v: string) => !!v || t('REQUIRED'),
        (v: string) =>
            /^[0-9]{7,15}$/.test(v) || t('INVALID_PHONE'),
    ],
}


// Default User
const defaultUser = (): User => ({
    id: '',
    first_name: '',
    last_name: '',
    user_name: '',
    email: '',
    phone: '',
    status_id: 1,
    created_at: new Date().toISOString(),
    created_by: 0,
    role_id: 1,
    user_role_name: 'Admin',
    operator: '',
})

const formData = ref<User>(defaultUser())

// Helpers
function normalizeStatusValue(val?: number | string | null): number {
    if (val === null || val === undefined) return statusOptions.value[0].value
    const numVal = typeof val === 'string' ? parseInt(val) : val
    const found = statusOptions.value.find(it => it.value === numVal)
    return found ? found.value : statusOptions.value[0].value
}

// Dialog v-model
const dialogModel = computed({
    get: () => props.modelValue,
    set: (value: boolean) => emit('update:modelValue', value),
})

// ✅ Load form data from backend when dialog opens
watch(
    [() => props.modelValue, () => props.user],
    async ([isOpen, user]) => {
        if (isOpen && user?.id) {
            isLoading.value = true
            try {
                const response = await getFormUpdate(user.id)

                // Transform API response to match User type
                const userData = response.users?.[0]
                if (userData) {
                    formData.value = {
                        id: user.id,
                        first_name: userData.first_name,
                        last_name: userData.last_name,
                        user_name: userData.user_name,
                        email: userData.email,
                        phone: userData.phone_number,
                        role_id: userData.role_id,
                        status_id: normalizeStatusValue(userData.status_id),
                        user_role_name: userData.roles?.[0]?.user_role_name || 'Admin',
                        created_at: user.created_at,
                        created_by: user.created_by,
                        operator: user.operator || '',
                    }
                } else {
                    throw new Error('No user data returned')
                }
            } catch (error) {
                console.error('Failed to load form data:', error)
                // Fallback to props.user if API fails
                formData.value = {
                    ...user,
                    status_id: normalizeStatusValue(user.status_id),
                }
            } finally {
                isLoading.value = false
            }
        } else if (!isOpen) {
            formData.value = defaultUser()
        }
    },
    { immediate: true }
)

// ✅ Save - sends role_id as number
const handleSave = async () => {
    if (!formData.value.id) return
    isLoading.value = true
    try {
        await updateUser(formData.value.id, {
            first_name: formData.value.first_name,
            last_name: formData.value.last_name,
            email: formData.value.email,
            phone: formData.value.phone,
            user_name: formData.value.user_name,
            role_id: formData.value.role_id,
            status_id: formData.value.status_id,
        })
        emit('update', { ...formData.value })
        emit('success')
        dialogModel.value = false
    } catch (error) {
        console.error('Failed to update user:', error)
    } finally {
        isLoading.value = false
    }
}

const handleCancel = () => emit('close')
const handleClose = () => emit('close')
</script>