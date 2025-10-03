<template>
    <VDialog v-model="dialogModel" max-width="600" persistent class="custom-dialog" opacity="0.7"
        @click:outside="handleClose">
        <VCard>
            <!-- Dialog Header -->
            <VCardTitle class="flex justify-center items-center">
                <span class="text-[20px] flex justify-center items-center py-2">{{ t('EDIT_USER') }}</span>
            </VCardTitle>

            <VDivider />

            <!-- Dialog Content -->
            <VCardText class="pa-6">
                <VForm @submit.prevent="handleSave">
                    <VRow>
                        <!-- First Name -->
                        <VCol cols="12" md="6">
                            <VTextField v-model="formData.firstname" :label="t('FIRST_NAME')"
                                prepend-inner-icon="mdi:account" variant="outlined" density="comfortable" required />
                        </VCol>

                        <!-- Last Name -->
                        <VCol cols="12" md="6">
                            <VTextField v-model="formData.lastname" :label="t('LAST_NAME')"
                                prepend-inner-icon="mdi:account" variant="outlined" density="comfortable" required />
                        </VCol>

                        <!-- Username -->
                        <VCol cols="12" md="6">
                            <VTextField v-model="formData.membername" :label="t('USERNAME')" prepend-inner-icon="mdi:at"
                                variant="outlined" density="comfortable" required />
                        </VCol>

                        <!-- Phone -->
                        <VCol cols="12" md="6">
                            <VTextField v-model="formData.phone" :label="t('PHONE')" prepend-inner-icon="mdi:phone"
                                variant="outlined" density="comfortable" required />
                        </VCol>

                        <!-- Role -->
                        <VCol cols="12" md="6">
                            <VSelect v-model="formData.role" :items="roleOptions" item-title="title" item-value="value"
                                :label="t('ROLE')" prepend-inner-icon="mdi:account-group" variant="outlined"
                                density="comfortable" required />
                        </VCol>

                        <!-- Status -->
                        <VCol cols="12" md="6">
                            <VSelect v-model="formData.status" :items="statusOptions" item-title="title"
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
                <VBtn variant="outlined" color="error" @click="handleCancel" class="!w-20 !border-2">
                    {{ t('CANCEL') }}
                </VBtn>
                <VBtn variant="outlined" color="info" @click="handleSave" class="ml-2 !w-20 !border-2">
                    {{ t('SAVE') }}
                </VBtn>
            </VCardActions>
        </VCard>
    </VDialog>
</template>


<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
interface User {
    id: number
    firstname: string
    lastname: string
    email: string
    role: string
    membername: string
    phone: string
    status: string
    avatar?: string
}

interface Props {
    modelValue: boolean
    user: User | null
}

interface Emits {
    (e: 'update:modelValue', value: boolean): void
    (e: 'update', user: User): void
    (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const roleOptions = computed(() => [
    { title: t('ADMIN'), value: 'Admin' },
    { title: t('MODERATOR'), value: 'Moderator' },
    { title: t('OPERATOR'), value: 'Operator' },
])

const statusOptions = computed(() => [
    { title: t('ACTIVE'), value: 'active' },
    { title: t('INACTIVE'), value: 'inactive' },
    { title: t('PENDING'), value: 'pending' },
])

const defaultUser = (): User => ({
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    role: roleOptions.value[0].value,
    membername: '',
    phone: '',
    status: statusOptions.value[0].value
})

const formData = ref<User>(defaultUser())

function normalizeValue(list: { title: string; value: string }[], val?: string | null) {
    if (!val) return list[0].value
    const lower = val.toString().toLowerCase()
    const found = list.find(
        (it) =>
            it.value.toString().toLowerCase() === lower ||
            it.title.toString().toLowerCase() === lower
    )
    return found ? found.value : list[0].value
}

const dialogModel = computed({
    get: () => props.modelValue,
    set: (value: boolean) => emit('update:modelValue', value)
})

watch(
    () => props.user,
    (newUser) => {
        if (newUser) {
            formData.value = {
                ...newUser,
                role: normalizeValue(roleOptions.value, newUser.role),
                status: normalizeValue(statusOptions.value, newUser.status)
            }
        } else {
            formData.value = defaultUser()
        }
    },
    { immediate: true }
)


watch(
    () => dialogModel.value,
    (open) => {
        if (open && !props.user) {
            formData.value = defaultUser()
        }
    }
)

const handleSave = () => {
    if (formData.value) {
        emit('update', { ...formData.value })
    }
}

const handleCancel = () => {
    emit('close')
}

const handleClose = () => {
    emit('close')
}
</script>