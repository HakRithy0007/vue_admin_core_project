<template>
    <div
        class="flex flex-col sm:flex-row sm:gap-2 md:gap-6 justify-between items-center w-full h-[100px] md:h-[50px] lg:h-[50px]">

        <!-- Date Picker Dropdown -->
        <div class="left w-full lg:w-[20%] h-full justify-start items-center">
            <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y>
                <template #activator="{ props }">
                    <v-text-field v-bind="props" v-model="formattedDate" :label="t('SELECT_DATE')" readonly
                        clearable></v-text-field>
                </template>

                <!-- Date Picker -->
                <v-date-picker v-model="selectedDate" @update:model-value="updateDate"></v-date-picker>
            </v-menu>
        </div>

        <!-- Right Section -->
        <div class="right w-full lg:w-[80%] grid grid-cols-3 gap-4 lg:flex lg:justify-end lg:items-center">
            <v-btn :ripple="false" v-for="btn in buttons" :key="btn.value" type="submit" :class="[
                '!h-[40px] sm:!h-[48px] lg:!w-[150px] !text-[18px] !rounded-[4px] flex justify-center items-center gap-2',
                activeButton === btn.value ? 'bg-warning text-white' : ''
            ]" @click="setActive(btn.value)">
                <div>{{ t(btn.label) }}</div>
            </v-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const menu = ref(false)
const selectedDate = ref<string | null>(null)
const formattedDate = ref('')
const activeButton = ref<string>('today')

const buttons = [
    { label: 'TODAY', value: 'today' },
    { label: 'YESTERDAY', value: 'yesterday' },
    { label: 'WEEK', value: 'week' },
]

const setActive = (val: string) => {
    activeButton.value = val
}

const updateDate = (val: string | null) => {
    if (val) {
        formattedDate.value = dayjs(val).format('YYYY-MM-DD')
    } else {
        formattedDate.value = ''
    }
    menu.value = false
}
</script>
