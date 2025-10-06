<template>
    <VCard class="w-full h-full pa-6 md:pa-8" elevation="0">

        <!-- Header Section -->
        <div class="header pa-4">
            <div class="flex justify-center gap-3 items-center">
                <VAvatar color="primary" variant="flat" rounded="lg" size="48" class="elevation-3">
                    <VIcon size="28" icon="ri-copper-coin-line" />
                </VAvatar>
                <h1 class="text-3xl">
                    {{ t('COMPANYPROFIT') }}
                </h1>
            </div>
        </div>


        <!-- Cards Grid -->
        <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-6">

            <!-- Bonus Card -->
            <VCard v-for="(bonus, i) in bonusList" :key="i"
                class="bonus-card overflow-hidden transition-all duration-300 hover:elevation-8 pa-10" elevation="2">

                <!-- Card Header -->
                <div class="card-header pa-4 bg-gradient-to-r from-primary to-primary-darken-1">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center gap-3">
                            <VAvatar color="warning" variant="tonal" size="36" rounded="sm"
                                class="!w-[150px] !flex !justify-center !items-center !gap-2">
                                <span class="text-lg">{{ bonus.currency }}</span>
                                <span class="text-lg">{{ bonus.currencysymbol }}</span>
                            </VAvatar>
                        </div>
                    </div>
                </div>

                <!-- Card Body -->
                <div class="pa-5">

                    <!-- Base Configuration Section -->
                    <div class="mb-4">
                        <p class="text-xs text-info uppercase tracking-wide mb-3">Base Configuration
                        </p>

                        <div class="space-y-3">
                            <!-- Base Bet -->
                            <div class="flex items-center justify-between p-3 rounded-lg">
                                <div class="flex items-center gap-2">
                                    <VIcon icon="ri-money-dollar-box-fill" color="success" size="18" />
                                    <span class="text-md font-medium">Base Bet</span>
                                </div>
                                <span class="text-sm font-bold">{{ bonus.baseBet }}</span>
                            </div>

                            <!-- Base Bonus -->
                            <div class="flex items-center justify-between p-3 rounded-lg">
                                <div class="flex items-center gap-2">
                                    <VIcon icon="ri-percent-line" color="success" size="18" />
                                    <span class="text-md font-medium">Base Bonus</span>
                                </div>
                                <VChip color="success" size="small" variant="flat">
                                    {{ bonus.baseBonus }}
                                </VChip>
                            </div>
                        </div>
                    </div>

                    <VDivider class="my-4" />

                    <!-- Step Configuration Section -->
                    <div>
                        <p class="text-xs text-info uppercase tracking-wide mb-3">Step Configuration
                        </p>

                        <div class="space-y-3">
                            <!-- Step Unit -->
                            <div class="flex items-center justify-between p-3 rounded-lg">
                                <div class="flex items-center gap-2">
                                    <VIcon icon="ri-stack-line" color="success" size="18" />
                                    <span class="text-md font-medium">Step Unit</span>
                                </div>
                                <span class="text-sm font-bold text-info">{{ bonus.stepUnit }}</span>
                            </div>

                            <!-- Step Bonus -->
                            <div class="flex items-center justify-between p-3 rounded-lg">
                                <div class="flex items-center gap-2">
                                    <VIcon icon="ri-line-chart-line" color="success" size="18" />
                                    <span class="text-md font-medium">Step Bonus</span>
                                </div>
                                <VChip color="primary" size="small" variant="flat">
                                    {{ bonus.stepBonus }}
                                </VChip>
                            </div>
                        </div>
                    </div>

                    <!-- Edit Button -->
                    <VBtn block color="primary" variant="outlined" class="mt-5 !w-[200px] !border-2 font-semibold"
                        @click="openEditDialog(i)">
                        <VIcon icon="ri-edit-line" size="18" class="mr-2" />
                        {{ t('EDIT') }}
                    </VBtn>

                </div>
            </VCard>
        </div>

        <!-- Edit Dialog -->
        <VDialog v-model="isDialogVisible" max-width="550" opacity="0.7">
            <VCard elevation="8">
                <!-- Dialog Header -->
                <div class="pa-6 pb-4 bg-gradient-to-r from-primary to-primary-darken-1">
                    <div class="flex justify-center items-center">
                        <div class="gap-3 flex justify-center items-center">
                            <h2 class="text-xl">{{ t('EDIT') }}</h2>
                        </div>
                    </div>
                </div>


                <VDivider />


                <VCardText class="pa-6">
                    <VRow>

                        <!-- Currency (Read-only) -->
                        <VCol cols="12">
                            <div class="flex justify-between items-center">
                                <div class="flex items-center gap-3">
                                    <VAvatar color="warning" variant="tonal" size="36" rounded="sm"
                                        class="!w-[150px] !flex !justify-center !items-center !gap-2">
                                        <span class="text-lg">{{ editForm.currency }}</span>
                                        <span class="text-lg">{{ editForm.currencysymbol }}</span>
                                    </VAvatar>
                                </div>
                            </div>
                        </VCol>


                        <!-- Base Bet -->
                        <VCol cols="12" md="6">
                            <VTextField v-model.number="editForm.baseBet" label="Base Bet" type="number"
                                variant="outlined" density="comfortable" color="primary" />
                        </VCol>

                        <!-- Base Bonus -->
                        <VCol cols="12" md="6">
                            <VTextField v-model.number="editForm.baseBonus" label="Base Bonus" type="number"
                                variant="outlined" density="comfortable" color="primary" />
                        </VCol>

                        <!-- Step Unit -->
                        <VCol cols="12" md="6">
                            <VTextField v-model.number="editForm.stepUnit" label="Step Unit" type="number"
                                variant="outlined" density="comfortable" color="primary" />
                        </VCol>

                        <!-- Step Bonus -->
                        <VCol cols="12" md="6">
                            <VTextField v-model.number="editForm.stepBonus" label="Step Bonus" type="number"
                                variant="outlined" density="comfortable" color="primary" />
                        </VCol>

                    </VRow>
                </VCardText>


                <VCardActions class="pa-4">
                    <VSpacer />
                    <VBtn variant="outlined" color="error" class="!border-2 px-6" @click="closeDialog">
                        <VIcon icon="ri-close-line" size="18" class="mr-1" />
                        {{ t('CANCEL') }}
                    </VBtn>
                    <VBtn variant="outlined" color="info" class="px-6 elevation-2" @click="saveChanges">
                        <VIcon icon="ri-check-line" size="18" class="mr-1" />
                        {{ t('SAVE') }}
                    </VBtn>
                </VCardActions>
            </VCard>
        </VDialog>
    </VCard>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface BonusItem {
    currency: string
    currencysymbol: string
    baseBet: number
    baseBonus: number
    stepUnit: number
    stepBonus: number
}

const isDialogVisible = ref(false)
const currentEditIndex = ref(-1)

const editForm = reactive<BonusItem>({
    currency: '',
    currencysymbol: '',
    baseBet: 0,
    baseBonus: 0,
    stepUnit: 0,
    stepBonus: 0
})

const bonusList = ref<BonusItem[]>([
    { currency: "KHR", currencysymbol: "៛", baseBet: 1, baseBonus: 5, stepUnit: 100, stepBonus: 2 },
    { currency: "DOLLAR", currencysymbol: "$", baseBet: 1, baseBonus: 10, stepUnit: 50, stepBonus: 3 },
])

const openEditDialog = (index: number) => {
    currentEditIndex.value = index
    const bonus = bonusList.value[index]

    // Copy all properties to editForm
    editForm.currency = bonus.currency
    editForm.currencysymbol = bonus.currencysymbol
    editForm.baseBet = bonus.baseBet
    editForm.baseBonus = bonus.baseBonus
    editForm.stepUnit = bonus.stepUnit
    editForm.stepBonus = bonus.stepBonus

    isDialogVisible.value = true
}

const closeDialog = () => {
    isDialogVisible.value = false
    currentEditIndex.value = -1
}

const saveChanges = () => {
    if (currentEditIndex.value !== -1) {
        bonusList.value[currentEditIndex.value] = {
            currency: editForm.currency,
            currencysymbol: editForm.currencysymbol,
            baseBet: Number(editForm.baseBet) || 0,
            baseBonus: Number(editForm.baseBonus) || 0,
            stepUnit: Number(editForm.stepUnit) || 0,
            stepBonus: Number(editForm.stepBonus) || 0
        }

        console.log('Saved changes for index:', currentEditIndex.value)
        console.log('Updated data:', bonusList.value[currentEditIndex.value])
    }

    closeDialog()
}
</script>

<style scoped>
.bonus-card {
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.08);
}

.card-header {
    border-radius: 12px 12px 0 0;
}

.space-y-3>*+* {
    margin-top: 0.75rem;
}

.readonly-field :deep(.v-field) {
    background-color: rgba(0, 0, 0, 0.02);
}

.hover\:elevation-8:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}
</style>