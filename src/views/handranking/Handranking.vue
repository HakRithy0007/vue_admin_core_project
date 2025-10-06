<template>
    <div class="w-full h-full p-6">

        <!-- <VCard class="mb-6 pa-4">
            <div class="flex justify-center gap-4 items-center text-[2rem]">
                <span>
                    <VAvatar color="success" variant="tonal" rounded size="40" class="elevation-2">
                        <VIcon size="30" icon="ri-subscript" />
                    </VAvatar>
                </span>
                <span>
                    {{ t('HANDRANKING') }}
                </span>
            </div>
        </VCard> -->

        <div class="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <!-- Card Item -->
            <VCard v-for="(rank, i) in handRankings" :key="i" class="overflow-hidden">
                <div class="pa-6">

                    <!-- Row 1: No -->
                    <div class="flex items-center justify-between py-3 border-b">
                        <span class="font-medium">{{ t('NO') }}</span>
                        <span>{{ i + 1 }}</span>
                    </div>

                    <!-- Row 2: Ranking Name -->
                    <div class="flex items-center justify-between py-3 border-b">
                        <span class="font-medium">{{ t('RANKING_NAME') }}</span>
                        <span>{{ rank.nameKey }}</span>
                    </div>

                    <!-- Row 3: Rank Value -->
                    <div class="flex items-center justify-between py-3 border-b gap-8">
                        <span class="font-medium text-nowrap">{{ t('RANK_VALUE') }}</span>
                        <VProgressLinear v-model="rank.value" height="20" color="warning"
                            class="rounded-full w-[180px] border-2 !border-amber-400">
                            <span class="text-sm text-primary">{{ Math.ceil(rank.value) }}%</span>
                        </VProgressLinear>
                    </div>

                    <!-- Row 4: Probability -->
                    <div class="flex items-center justify-between py-3 border-b">
                        <span>{{ t('PROBABILITY') }}</span>
                        <span>{{ (rank.value / 100).toFixed(2) }}</span>
                    </div>

                    <!-- Row 5: Color -->
                    <div class="flex items-center justify-between py-3 border-b">
                        <span>{{ t('COLOR') }}</span>
                        <div class="flex items-center gap-2">
                            <div class="w-6 h-6 rounded-full border-2 border-gray-200"
                                :style="{ backgroundColor: rank.color }"></div>
                            <span class="text-sm">{{ rank.color }}</span>
                        </div>
                    </div>

                    <!-- Row 6: Action -->
                    <div class="flex items-center justify-between py-3">
                        <span class="font-medium">{{ t('ACTION') }}</span>
                        <div class="flex gap-2">
                            <VBtn size="small" color="warning" variant="outlined" class="!border-2"
                                @click="openEditDialog(i)">
                                {{ t('EDIT') }}
                            </VBtn>
                        </div>
                    </div>

                </div>
            </VCard>
        </div>

        <!-- Edit Dialog (Outside the loop) -->
        <VDialog v-model="isDialogVisible" max-width="400" opacity="0.7">
            <VCard :title="t('EDIT_RANKING')" class="flex justify-center items-center pa-4">
                <DialogCloseBtn variant="text" size="default" @click="isDialogVisible = false" />
                <VCardText>
                    <VRow>
                        <!-- Row 1: No (Read-only) -->
                        <VCol cols="12">
                            <VTextField v-model="editForm.no" :label="t('NO')" readonly />
                        </VCol>

                        <!-- Row 2: Ranking Name -->
                        <VCol cols="12">
                            <VTextField v-model="editForm.nameKey" :label="t('RANKING_NAME')" readonly />
                        </VCol>

                        <!-- Row 3: Rank Value -->
                        <VCol cols="12">
                            <VTextField v-model.number="editForm.value" :label="t('RANK_VALUE_PERCENT')" type="number"
                                placeholder="0-100" min="0" max="100"
                                :rules="[v => v >= 0 && v <= 100 || t('VALUE_MUST_BE_BETWEEN')]" />
                            <VProgressLinear v-model="editForm.value" height="20" color="warning"
                                class="rounded-full border-2 !border-amber-400 mt-2">
                                <span class="text-sm text-primary">{{ Math.ceil(editForm.value) }}%</span>
                            </VProgressLinear>
                        </VCol>

                        <!-- Row 4: Probability -->
                        <VCol cols="12">
                            <VTextField :model-value="(editForm.value / 100).toFixed(2)" :label="t('PROBABILITY')"
                                readonly />
                        </VCol>

                        <!-- Row 5: Color -->
                        <VCol cols="12">
                            <VTextField v-model="editForm.color" :label="t('COLOR_HEX')" placeholder="#05f050"
                                @click="showColorPicker = true" readonly>
                                <template #prepend-inner>
                                    <div class="w-6 h-6 rounded-full border-2 border-gray-200 mr-2"
                                        :style="{ backgroundColor: editForm.color }"></div>
                                </template>
                            </VTextField>

                            <!-- Color Picker -->
                            <VMenu v-model="showColorPicker" :close-on-content-click="false">
                                <template #activator="{ props }">
                                    <VBtn v-bind="props" color="primary" variant="flat"
                                        class="mt-4 text-sm !text-[12px] !w-[140px] !h-[30px]">
                                        {{ t('CHOOSE_COLOR') }}
                                    </VBtn>
                                </template>
                                <VCard>
                                    <VColorPicker v-model="editForm.color" mode="hex" :modes="['hex']" />
                                </VCard>
                            </VMenu>
                        </VCol>
                    </VRow>
                </VCardText>

                <VCardActions>
                    <VDivider />
                    <VBtn variant="outlined" color="error" class="!border-2 !w-[80px]" @click="isDialogVisible = false">
                        {{ t('CANCEL') }}
                    </VBtn>
                    <VBtn variant="outlined" color="info" class="!border-2 !w-[80px]" @click="saveChanges">
                        {{ t('SAVE') }}
                    </VBtn>
                </VCardActions>
            </VCard>
        </VDialog>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface HandRanking {
    nameKey: string
    value: number
    color: string
}

const isDialogVisible = ref(false)
const currentEditIndex = ref(-1)
const showColorPicker = ref(false)

// Dialog form fields
const editForm = reactive({
    no: 0,
    nameKey: '',
    value: 0,
    color: ''
})

// Ranking name options for dropdown
const rankingNameKeys = [
    '7 BETTER',
    'TWO PAIR',
    '3 OF KIND',
    'STRAIGHT',
    'FLUSH',
    'FULL HOUSE',
    '4 OF KIND',
    'STRAIGHT FLUSH',
    '5 OF A KIND',
    'ROYAL FLUSH',
    'FIVE BARS'
]

const rankingNameOptions = computed(() =>
    rankingNameKeys.map(key => ({
        label: t(key),
        key: key
    }))
)

const handRankings = ref<HandRanking[]>([
    { nameKey: "7 BETTER", value: 33, color: "#05f050" },
    { nameKey: "TWO PAIR", value: 45, color: "#FFFFFF" },
    { nameKey: "3 OF KIND", value: 55, color: "#ffe900" },
    { nameKey: "STRAIGHT", value: 60, color: "#FFFFFF" },
    { nameKey: "FLUSH", value: 65, color: "#ffe900" },
    { nameKey: "FULL HOUSE", value: 70, color: "#FFFFFF" },
    { nameKey: "4 OF KIND", value: 80, color: "#05f050" },
    { nameKey: "STRAIGHT FLUSH", value: 85, color: "#FFFFFF" },
    { nameKey: "5 OF A KIND", value: 90, color: "#ffe900" },
    { nameKey: "ROYAL FLUSH", value: 95, color: "#FFFFFF" },
    { nameKey: "FIVE BARS", value: 100, color: "#ffe900" }
])

// Open dialog and load data for the selected card
const openEditDialog = (index: number) => {
    currentEditIndex.value = index
    const rank = handRankings.value[index]

    // Load existing data into form
    editForm.no = index + 1
    editForm.nameKey = rank.nameKey
    editForm.value = rank.value
    editForm.color = rank.color

    isDialogVisible.value = true
}

// Save changes
const saveChanges = () => {
    if (currentEditIndex.value !== -1) {
        // Ensure value is not negative and within range
        const validValue = Math.max(0, Math.min(100, editForm.value || 0))

        // Update the ranking with edited values
        handRankings.value[currentEditIndex.value] = {
            nameKey: editForm.nameKey,
            value: validValue,
            color: editForm.color
        }

        console.log('Saved changes for index:', currentEditIndex.value)
        console.log('Updated data:', handRankings.value[currentEditIndex.value])
    }

    isDialogVisible.value = false
}
</script>