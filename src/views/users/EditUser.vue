<template>
    <VDialog v-model="dialogModel" max-width="600" persistent class="custom-dialog" opacity="0.7"
        @click:outside="handleClose">
        <VCard>
            <!-- Dialog Header -->
            <VCardTitle class="flex justify-center items-center">
                <span class="text-[20px] flex justify-center items-center py-2">{{ t('EDIT_USER') }}</span>
            </VCardTitle>

            <VDivider />

            <!-- ADD LOADING BAR -->
            <VProgressLinear v-if="isLoading" indeterminate color="primary" />

            <!-- Dialog Content -->
            <VCardText class="pa-6">
                <VForm @submit.prevent="handleSave">
                    <VRow>
                        <!-- First Name -->
                        <VCol cols="12" md="6">
                            <VTextField v-model="formData.first_name" :label="t('FIRST_NAME')"
                                prepend-inner-icon="mdi:account" variant="outlined" density="comfortable" required />
                        </VCol>

                        <!-- Last Name -->
                        <VCol cols="12" md="6">
                            <VTextField v-model="formData.last_name" :label="t('LAST_NAME')"
                                prepend-inner-icon="mdi:account" variant="outlined" density="comfortable" required />
                        </VCol>

                        <!-- Username -->
                        <VCol cols="12" md="6">
                            <VTextField v-model="formData.user_name" :label="t('USERNAME')" prepend-inner-icon="mdi:at"
                                variant="outlined" density="comfortable" required />
                        </VCol>

                        <!-- Email -->
                        <VCol cols="12" md="6">
                            <VTextField v-model="formData.email" :label="t('EMAIL')" prepend-inner-icon="mdi:at"
                                variant="outlined" density="comfortable" required />
                        </VCol>

                        <!-- Phone -->
                        <VCol cols="12" md="6">
                            <VTextField v-model="formData.phone" :label="t('PHONE')" prepend-inner-icon="mdi:phone"
                                variant="outlined" density="comfortable" required />
                        </VCol>

                        <!-- Role -->
                        <VCol cols="12" md="6">
                            <VSelect v-model="formData.user_role_name" :items="roleOptions" item-title="title"
                                item-value="value" :label="t('ROLE')" prepend-inner-icon="mdi:account-group"
                                variant="outlined" density="comfortable" required />
                        </VCol>

                        <!-- Status -->
                        <VCol cols="12" md="6">
                            <VSelect v-model="formData.status_id" :items="statusOptions" item-title="title"
                                item-value="value" :label="t('STATUS')" prepend-inner-icon="mdi:package-variant"
                                variant="outlined" density="comfortable" required />
                        </VCol>
                    </VRow>
                </VForm>
            </VCardText>

            <VDivider />

            <!-- Dialog Actions -->
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
import { updateUser } from '@/services/user'
const { t } = useI18n()

// Props
interface Props {
    modelValue: boolean
    user: User | null
}
const props = defineProps<Props>()
const isLoading = ref(false)

// Emits
interface Emits {
    (e: 'update:modelValue', value: boolean): void
    (e: 'update', user: User): void
    (e: 'close'): void
    (e: 'success'): void
}
const emit = defineEmits<Emits>()

// Options
const roleOptions = computed(() => [
    { title: t('ADMIN'), value: 'Admin' },
    { title: t('MODERATOR'), value: 'Moderator' },
    { title: t('OPERATOR'), value: 'Operator' },
])

const statusOptions = computed(() => [
    { title: t('ACTIVE'), value: 1 },
    { title: t('INACTIVE'), value: 2 },
    { title: t('PENDING'), value: 3 },
])

// Default user
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
    user_role_name: roleOptions.value[0].value,
    operator: '',
})

const formData = ref<User>(defaultUser())

// Normalize role/status values
function normalizeRoleValue(val?: string | null): string {
    if (!val) return roleOptions.value[0].value
    const lower = val.toLowerCase()
    const found = roleOptions.value.find(
        it => it.value.toLowerCase() === lower || it.title.toLowerCase() === lower
    )
    return found ? found.value : roleOptions.value[0].value
}

function normalizeStatusValue(val?: number | string | null): number {
    if (val === null || val === undefined) return statusOptions.value[0].value
    const numVal = typeof val === 'string' ? parseInt(val) : val
    const found = statusOptions.value.find(it => it.value === numVal)
    return found ? found.value : statusOptions.value[0].value
}

// Dialog v-model
const dialogModel = computed({
    get: () => props.modelValue,
    set: (value: boolean) => emit('update:modelValue', value)
})

// WATCH
watch(
    () => props.user,
    (newUser) => {
        if (newUser) {
            formData.value = {
                ...newUser,
                user_role_name: normalizeRoleValue(newUser.user_role_name),
                status_id: normalizeStatusValue(newUser.status_id),
            }
        } else {
            formData.value = defaultUser()
        }
    },
    { immediate: true }
)

// WATCH
watch(
    () => dialogModel.value,
    (open) => {
        if (open && !props.user) formData.value = defaultUser()
    }
)

// REPLACE handleSave with this:
const handleSave = async () => {
    if (!formData.value.id) {
        return
    }

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