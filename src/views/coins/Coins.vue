<template>
    <div class="w-full h-full">

        <VCard class="mb-6">
            <div class="flex justify-center items-center poppins text-[2rem]">COINS</div>
        </VCard>

        <div class="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center">
            <VCard v-for="(coin, index) in allCoins" :key="'coin-' + index">
                <div class="h-[120px] w-full grid grid-cols-2">
                    <div class="coins-image flex justify-center items-center p-2 relative ">
                        <img :src="coin.image" alt="Coins" class="max-w-[100px] max-h-[100px] object-contain" />
                        <span
                            class="absolute top-1/2 left-1/2 -translate-x-1/2 poppins font-bold -translate-y-[70%] text-black poppins text-md">
                            <span>{{ coin.value }} {{ coin.currency }}</span>
                        </span>
                    </div>

                    <div class="w-full grid py-3">
                        <div class="w-full h-full flex justify-start items-center poppins gap-4">
                            <span class="w-[60px] text-[12px] flex justify-center items-center rounded-[2px]">VALUE
                                OF</span>:
                            <span class="w-[60px] text-[12px] flex justify-center items-center rounded-[2px]">
                                <span>{{ coin.value }} {{ coin.currency }}</span>
                            </span>
                        </div>
                        <div class="w-full h-full flex justify-start items-center poppins gap-4">
                            <span
                                class="w-[60px] text-[12px] flex justify-center items-center rounded-[2px]">COLOR</span>:
                            <span class="w-[60px] text-[12px] flex justify-center items-center rounded-[2px]">{{
                                coin.color }}</span>
                        </div>
                        <div class="w-full h-full flex justify-start items-center poppins gap-4">
                            <span
                                class="w-[60px] text-[12px] flex justify-center items-center rounded-[2px]">DATE</span>:
                            <span class="w-[60px] text-[12px] flex justify-center items-center rounded-[2px]">{{
                                coin.date }}</span>
                        </div>
                        <div class="w-full h-full flex justify-start items-center poppins gap-4">
                            <span
                                class="w-[60px] text-[12px] flex justify-center items-center rounded-[2px]">EDIT</span>:

                            <v-tooltip text="Edit Coin">
                                <template v-slot:activator="{ props }">
                                    <v-btn v-bind="props"
                                        class="!w-[60px] bg-info border-none !h-[18px] !text-[12px] !flex !justify-center !items-center !rounded-[2px]"
                                        @click="openEditDialog(index)">
                                        <Icon :icon="coin.icon" width="24" height="24" />
                                    </v-btn>

                                </template>
                            </v-tooltip>
                        </div>
                    </div>
                </div>
            </VCard>
        </div>


        <!-- Edit Dialog -->
        <VDialog v-model="isDialogVisible" max-width="600" opacity="0.7">
            <VCard title="Edit Coin" class="pa-4 flex justify-center items-center poppins">
                <DialogCloseBtn variant="text" size="default" @click="isDialogVisible = false" />


                <VCardText>
                    <VRow>
                        <!-- Coin Image Preview -->
                        <VCol cols="12" class="flex justify-center items-center">
                            <div class="relative">
                                <img :src="editForm.image" alt="Coin Preview"
                                    class="max-w-[120px] max-h-[120px] object-contain" />
                                <span
                                    class="absolute top-1/2 left-1/2 -translate-x-[40%] -translate-y-[73%] poppins font-bold text-black text-lg">
                                    {{ editForm.value }} {{ editForm.currency }}
                                </span>
                            </div>
                        </VCol>

                        <VCol cols="12">
                            <VDivider class="my-2" />
                        </VCol>

                        <!-- Value -->
                        <VCol cols="12" sm="6">
                            <VTextField v-model="editForm.value" label="Value" placeholder="Enter coin value"
                                type="text" />
                        </VCol>

                        <!-- Currency -->
                        <VCol cols="12" sm="6">
                            <VSelect v-model="editForm.currency" label="Currency" :items="currencyOptions"
                                item-title="label" item-value="symbol" />
                        </VCol>

                        <!-- Color -->
                        <VCol cols="12" sm="6">
                            <VSelect v-model="editForm.color" label="Color" :items="colorOptions" />
                        </VCol>

                        <!-- Image Selection -->
                        <VCol cols="12">
                            <VSelect v-model="editForm.image" label="Coin Image" :items="imageOptions" item-title="name"
                                item-value="url">
                                <template v-slot:selection="{ item }">
                                    <div class="flex items-center gap-2">
                                        <img :src="item.value" alt="coin" class="w-8 h-8 object-contain" />
                                        <span>{{ item.title }}</span>
                                    </div>
                                </template>
                                <template v-slot:item="{ props, item }">
                                    <v-list-item v-bind="props">
                                        <template v-slot:prepend>
                                            <img :src="item.value" alt="coin" class="w-8 h-8 object-contain mr-2" />
                                        </template>
                                    </v-list-item>
                                </template>
                            </VSelect>
                        </VCol>
                    </VRow>
                </VCardText>

                <VCardActions>
                    <VSpacer />
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
import { Icon } from "@iconify/vue"
import coin1 from '@/assets/images/coins/coin1.svg?url';
import coin2 from '@/assets/images/coins/coin2.svg?url';
import coin3 from '@/assets/images/coins/coin3.svg?url';
import coin4 from '@/assets/images/coins/coin4.svg?url';
import coin5 from '@/assets/images/coins/coin5.svg?url';
import coin6 from '@/assets/images/coins/coin6.svg?url';

interface Coin {
    image: string
    value: string
    currency: string
    color: string
    date: string
    icon: string
}

const isDialogVisible = ref(false)
const currentEditIndex = ref(-1)

const editForm = reactive({
    image: '',
    value: '',
    currency: '',
    color: '',
    date: '',
    icon: 'si:edit-detailed-fill'
})

const currencyOptions = [
    { label: 'Khmer Riel', symbol: '៛' },
    { label: 'US Dollar', symbol: '$' },
    { label: 'Thai Baht', symbol: '฿' },
    { label: 'Vietnamese Dong', symbol: '₫' },
    { label: 'Chinese Yuan', symbol: '¥' },
]

const colorOptions = ['Gold', 'Silver', 'Bronze', 'Copper', 'Platinum']
const imageOptions = [
    { name: 'Coin 1', url: coin1 },
    { name: 'Coin 2', url: coin2 },
    { name: 'Coin 3', url: coin3 },
    { name: 'Coin 4', url: coin4 },
    { name: 'Coin 5', url: coin5 },
    { name: 'Coin 6', url: coin6 },
]

const rielCoins = ref<Coin[]>([
    { image: coin1, value: '50', currency: '៛', color: 'Gold', date: '2024', icon: 'si:edit-detailed-fill' },
    { image: coin2, value: '100', currency: '៛', color: 'Silver', date: '2024', icon: 'si:edit-detailed-fill' },
    { image: coin3, value: '200', currency: '៛', color: 'Bronze', date: '2024', icon: 'si:edit-detailed-fill' },
    { image: coin4, value: '500', currency: '៛', color: 'Gold', date: '2024', icon: 'si:edit-detailed-fill' },
    { image: coin5, value: '1000', currency: '៛', color: 'Silver', date: '2024', icon: 'si:edit-detailed-fill' },
    { image: coin6, value: '2000', currency: '៛', color: 'Bronze', date: '2024', icon: 'si:edit-detailed-fill' },
]);

const dollarCoins = ref<Coin[]>([
    { image: coin1, value: '0.25', currency: '$', color: 'Silver', date: '2024', icon: 'si:edit-detailed-fill' },
    { image: coin2, value: '0.50', currency: '$', color: 'Gold', date: '2024', icon: 'si:edit-detailed-fill' },
    { image: coin3, value: '1.00', currency: '$', color: 'Silver', date: '2024', icon: 'si:edit-detailed-fill' },
    { image: coin4, value: '2.00', currency: '$', color: 'Bronze', date: '2024', icon: 'si:edit-detailed-fill' },
    { image: coin5, value: '5.00', currency: '$', color: 'Gold', date: '2024', icon: 'si:edit-detailed-fill' },
    { image: coin6, value: '10.00', currency: '$', color: 'Silver', date: '2024', icon: 'si:edit-detailed-fill' },
]);

const allCoins = ref<Coin[]>([...rielCoins.value, ...dollarCoins.value]);
const openEditDialog = (index: number) => {
    currentEditIndex.value = index
    const coin = allCoins.value[index]
    editForm.image = coin.image
    editForm.value = coin.value
    editForm.currency = coin.currency
    editForm.color = coin.color
    editForm.date = coin.date
    editForm.icon = coin.icon
    isDialogVisible.value = true
}

// Save changes
const saveChanges = () => {
    if (currentEditIndex.value !== -1) {
        allCoins.value[currentEditIndex.value] = {
            image: editForm.image,
            value: editForm.value,
            currency: editForm.currency,
            color: editForm.color,
            date: editForm.date,
            icon: editForm.icon
        }
    }

    isDialogVisible.value = false
}
</script>

<style scoped></style>