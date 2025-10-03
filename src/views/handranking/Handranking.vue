<template>
    <div class="w-full h-full p-6">
        <div class="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <!-- Card Item -->
            <VCard v-for="(rank, i) in handRankings" :key="i" class="overflow-hidden">
                <div class="pa-6">

                    <!-- Row 1: No -->
                    <div class="flex items-center justify-between py-3 border-b">
                        <span class="font-medium poppins">No</span>
                        <span>{{ i + 1 }}</span>
                    </div>

                    <!-- Row 2: Ranking Name -->
                    <div class="flex items-center justify-between py-3 border-b">
                        <span class="font-medium poppins">Ranking Name</span>
                        <span class="poppins">{{ rank.name }}</span>
                    </div>

                    <!-- Row 3: Rank Value -->
                    <div class="flex items-center justify-between py-3 border-b gap-8">
                        <span class="font-medium poppins text-nowrap">Rank Value</span>
                        <VProgressLinear v-model="rank.value" height="20" color="warning"
                            class="rounded-full w-[180px] border-2 !border-amber-400">
                            <span class="text-sm poppins text-primary">{{ Math.ceil(rank.value) }}%</span>
                        </VProgressLinear>
                    </div>

                    <!-- Row 4: Probability -->
                    <div class="flex items-center justify-between py-3 border-b">
                        <span class="poppins">Probability</span>
                        <span class="poppins">{{ (rank.value / 100).toFixed(2) }}</span>
                    </div>

                    <!-- Row 5: Color -->
                    <div class="flex items-center justify-between py-3 border-b">
                        <span class="poppins">Color</span>
                        <div class="flex items-center gap-2">
                            <div class="w-6 h-6 rounded-full border-2 border-gray-200"
                                :style="{ backgroundColor: rank.color }"></div>
                            <span class="text-sm poppins">{{ rank.color }}</span>
                        </div>
                    </div>

                    <!-- Row 6: Action -->
                    <div class="flex items-center justify-between py-3">
                        <span class="font-medium">Action</span>
                        <div class="flex gap-2">
                            <VBtn size="small" color="warning" variant="outlined" class="poppins !border-2"
                                @click="openEditDialog(i)">
                                EDIT
                            </VBtn>
                        </div>
                    </div>

                </div>
            </VCard>
        </div>

        <!-- Edit Dialog (Outside the loop) -->
        <VDialog v-model="isDialogVisible" max-width="600" opacity="0.7">
            <VCard title="Edit Ranking" class="flex justify-center items-center pa-4 poppins">
                <DialogCloseBtn variant="text" size="default" @click="isDialogVisible = false" />
                <VCardText>
                    <VRow>
                        <!-- Row 1: No (Read-only) -->
                        <VCol cols="12">
                            <VTextField v-model="editForm.no" label="No" readonly />
                        </VCol>

                        <!-- Row 2: Ranking Name -->
                        <VCol cols="12">
                            <VTextField v-model="editForm.name" label="Ranking Name" placeholder="Enter ranking name" />
                        </VCol>

                        <!-- Row 3: Rank Value -->
                        <VCol cols="12">
                            <VTextField v-model.number="editForm.value" label="Rank Value (%)" type="number"
                                placeholder="0-100" min="0" max="100"
                                :rules="[v => v >= 0 && v <= 100 || 'Value must be between 0 and 100']" />
                            <VProgressLinear v-model="editForm.value" height="20" color="warning"
                                class="rounded-full border-2 !border-amber-400 mt-2">
                                <span class="text-sm poppins text-primary">{{ Math.ceil(editForm.value) }}%</span>
                            </VProgressLinear>
                        </VCol>

                        <!-- Row 4: Probability -->
                        <VCol cols="12">
                            <VTextField :model-value="(editForm.value / 100).toFixed(2)" label="Probability" readonly />
                        </VCol>

                        <!-- Row 5: Color -->
                        <VCol cols="12">
                            <VTextField v-model="editForm.color" label="Color (Hex)" placeholder="#05f050"
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
                                        class="mt-4 text-sm poppins !text-[12px] !w-[100px] !h-[30px]">
                                        Choose Color
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
                    <VBtn variant="outlined" color="primary" class="poppins !border-2 !w-[80px]"
                        @click="isDialogVisible = false">
                        CANCEL
                    </VBtn>
                    <VBtn variant="outlined" color="success" class="poppins !border-2 !w-[80px]" @click="saveChanges">
                        SAVE
                    </VBtn>
                </VCardActions>
            </VCard>
        </VDialog>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface HandRanking {
    name: string
    value: number
    color: string
}

const isDialogVisible = ref(false)
const currentEditIndex = ref(-1)
const showColorPicker = ref(false)

// Dialog form fields
const editForm = reactive({
    no: 0,
    name: '',
    value: 0,
    color: ''
})

const handRankings = ref<HandRanking[]>([
    { name: "7 BETTER", value: 33, color: "#05f050" },
    { name: "TWO PAIR", value: 45, color: "#FFFFFF" },
    { name: "3 OF KIND", value: 55, color: "#ffe900" },
    { name: "STRAIGHT", value: 60, color: "#FFFFFF" },
    { name: "FLUSH", value: 65, color: "#ffe900" },
    { name: "FULL HOUSE", value: 70, color: "#FFFFFF" },
    { name: "4 OF KIND", value: 80, color: "#05f050" },
    { name: "STRAIGHT FLUSH", value: 85, color: "#FFFFFF" },
    { name: "5 OF A KIND", value: 90, color: "#ffe900" },
    { name: "ROYAL FLUSH", value: 95, color: "#FFFFFF" },
    { name: "FIVE BARS", value: 100, color: "#ffe900" }
])

// Open dialog and load data for the selected card
const openEditDialog = (index: number) => {
    currentEditIndex.value = index
    const rank = handRankings.value[index]

    // Load existing data into form
    editForm.no = index + 1
    editForm.name = rank.name
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
            name: editForm.name,
            value: validValue,
            color: editForm.color
        }

        console.log('Saved changes for index:', currentEditIndex.value)
        console.log('Updated data:', handRankings.value[currentEditIndex.value])
    }

    isDialogVisible.value = false
}
</script>