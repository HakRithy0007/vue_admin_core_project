<template>
    <div class="w-full h-full flex flex-col">
        <!-- header -->
        <div
            class="header-content h-[80px] sm:h-[150px] md:h-[50px] sm:flex sm:flex-col md:flex md:flex-row md:justify-center md:items-center justify-end gap-2 flex-shrink-0">

            <!-- Search input -->
            <div class="w-full">
                <input type="text" class="border outline-none text-gray-200 h-[37px] 2xl:w-[320px] rounded w-full px-4"
                    placeholder="Search" />
            </div>

            <div class="w-full flex sm:flex md:flex gap-2 lg:mt-2 2xl:flex 2xl:justify-end 2xl:items-center">
                <!-- Activator slot button -->
                <div class="w-full sm:w-[50%] my-2 md:w-[100%] 2xl:w-[25%]">
                    <v-menu>
                        <template v-slot:activator="{ props }">
                            <v-btn color="primary" v-bind="props" class="w-full">
                                FILTER
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item v-for="(item, index) in items" :key="index" :value="index">
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>

                <!-- Other Button -->
                <div class="w-full sm:w-[50%] my-2 md:w-[100%] 2xl:[w-50%] 2xl:w-[25%]">
                    <v-btn color="blue" class="w-full">
                        CREATE USER
                    </v-btn>
                </div>
            </div>
        </div>

        <!-- table - takes remaining space -->
        <div class="table-content flex-grow overflow-hidden mt-4">
            <div class="h-full">
                <v-table fixed-header class="border border-gray-500 h-full w-full"
                    :style="{ height: `calc(100vh - ${headerHeight}px - ${paginationHeight}px - 2rem)` }">
                    <table class="w-full border-collapse border border-gray-500">
                        <thead>
                            <tr class="bg-[#303030] text-white">
                                <th
                                    class="text-[1rem] text-gray-300 md:text-[1.3rem] text-nowrap text-center border border-gray-500 px-2 py-1">
                                    NAME
                                </th>
                                <th
                                    class="text-[1rem] text-gray-300 md:text-[1.3rem] text-nowrap text-center border border-gray-500 px-2 py-1">
                                    CATEGORIES</th>
                                <th
                                    class="text-[1rem] text-gray-300 md:text-[1.3rem] text-nowrap text-center border border-gray-500 px-2 py-1">
                                    NUMBER
                                </th>
                                <th
                                    class="text-[1rem] text-gray-300 md:text-[1.3rem] text-nowrap text-center border border-gray-500 px-2 py-1">
                                    NUMBER
                                </th>
                                <th
                                    class="text-[1rem] text-gray-300 md:text-[1.3rem] text-nowrap text-center border border-gray-500 px-2 py-1">
                                    NUMBER
                                </th>
                                <th
                                    class="text-[1rem] text-gray-300 md:text-[1.3rem] text-nowrap text-center border border-gray-500 px-2 py-1">
                                    NUMBER
                                </th>
                                <th
                                    class="text-[1rem] text-gray-300 md:text-[1.3rem] text-nowrap text-center border border-gray-500 px-2 py-1">
                                    NUMBER
                                </th>
                                <th
                                    class="text-[1rem] text-gray-300 md:text-[1.3rem] text-nowrap text-center border border-gray-500 px-2 py-1">
                                    NUMBER
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in desserts" :key="item.name"
                                class="hover:bg-gray-800 transition-colors duration-200">
                                <td
                                    class="text-[0.7rem] text-gray-300 md:text-[1rem] text-nowrap text-center border border-gray-500 px-2 py-1">
                                    {{ item.name }}
                                </td>
                                <td
                                    class="text-[0.7rem] text-gray-300 md:text-[1rem] text-nowrap text-center border border-gray-500 px-2 py-1">
                                    {{ item.calories }}
                                </td>
                                <td
                                    class="text-[0.7rem] text-gray-300 md:text-[1rem] text-nowrap text-center border border-gray-500 px-2 py-1">
                                    {{ item.sasj }}
                                </td>
                                <td
                                    class="text-[0.7rem] text-gray-300 md:text-[1rem] text-nowrap text-center border border-gray-500 px-2 py-1">
                                    {{ item.sdkf }}
                                </td>
                                <td
                                    class="text-[0.7rem] text-gray-300 md:text-[1rem] text-nowrap text-center border border-gray-500 px-2 py-1">
                                    {{ item.wer }}</td>
                                <td
                                    class="text-[0.7rem] text-gray-300 md:text-[1rem] text-nowrap text-center border border-gray-500 px-2 py-1">
                                    {{ item.ewxs }}
                                </td>
                                <td
                                    class="text-[0.7rem] text-gray-300 md:text-[1rem] text-nowrap text-center border border-gray-500 px-2 py-1">
                                    {{ item.sdv }}</td>
                                <td
                                    class="text-[0.7rem] text-gray-300 md:text-[1rem] text-nowrap text-center border border-gray-500 px-2 py-1">
                                    {{ item.sxcv }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </v-table>
            </div>
        </div>

        <!-- Pagination - sticky at bottom -->
        <div class="flex-shrink-0">
            <v-pagination :length="2"></v-pagination>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const items = ref([
    { title: 'Item #1', value: 1 },
    { title: 'Item #2', value: 2 },
    { title: 'Item #3', value: 3 },
])

interface Dessert {
    name: string;
    calories: number;
    sdkf: number;
    sasj: number;
    wer: number;
    ewxs: number;
    sdv: number;
    sxcv: number;
}

const desserts = ref<Dessert[]>([
    { name: "Frozen Yogurt", calories: 159, sdkf: 10, sasj: 5, wer: 3, ewxs: 2, sdv: 1, sxcv: 4 },
    { name: "Ice cream sandwich", calories: 237, sdkf: 12, sasj: 6, wer: 4, ewxs: 3, sdv: 2, sxcv: 5 },
    { name: "Eclair", calories: 262, sdkf: 15, sasj: 8, wer: 6, ewxs: 4, sdv: 3, sxcv: 7 },
    { name: "Cupcake", calories: 305, sdkf: 20, sasj: 9, wer: 7, ewxs: 5, sdv: 4, sxcv: 8 },
    { name: "Gingerbread", calories: 356, sdkf: 18, sasj: 11, wer: 8, ewxs: 6, sdv: 5, sxcv: 9 },
    { name: "Jelly bean", calories: 375, sdkf: 14, sasj: 7, wer: 5, ewxs: 3, sdv: 2, sxcv: 6 },
    { name: "Lollipop", calories: 392, sdkf: 19, sasj: 10, wer: 9, ewxs: 7, sdv: 6, sxcv: 10 },
    { name: "Lollipop", calories: 392, sdkf: 19, sasj: 10, wer: 9, ewxs: 7, sdv: 6, sxcv: 10 },
    { name: "Lollipop", calories: 392, sdkf: 19, sasj: 10, wer: 9, ewxs: 7, sdv: 6, sxcv: 10 },
    { name: "Lollipop", calories: 392, sdkf: 19, sasj: 10, wer: 9, ewxs: 7, sdv: 6, sxcv: 10 },
    { name: "Lollipop", calories: 392, sdkf: 19, sasj: 10, wer: 9, ewxs: 7, sdv: 6, sxcv: 10 },
    { name: "Lollipop", calories: 392, sdkf: 19, sasj: 10, wer: 9, ewxs: 7, sdv: 6, sxcv: 10 },
    { name: "Lollipop", calories: 392, sdkf: 19, sasj: 10, wer: 9, ewxs: 7, sdv: 6, sxcv: 10 },
    { name: "Lollipop", calories: 392, sdkf: 19, sasj: 10, wer: 9, ewxs: 7, sdv: 6, sxcv: 10 },
    { name: "Lollipop", calories: 392, sdkf: 19, sasj: 10, wer: 9, ewxs: 7, sdv: 6, sxcv: 10 },
    { name: "Lollipop", calories: 392, sdkf: 19, sasj: 10, wer: 9, ewxs: 7, sdv: 6, sxcv: 10 },
    { name: "Lollipop", calories: 392, sdkf: 19, sasj: 10, wer: 9, ewxs: 7, sdv: 6, sxcv: 10 },
    { name: "Lollipop", calories: 392, sdkf: 19, sasj: 10, wer: 9, ewxs: 7, sdv: 6, sxcv: 10 },
    { name: "Lollipop", calories: 392, sdkf: 19, sasj: 10, wer: 9, ewxs: 7, sdv: 6, sxcv: 10 },
    { name: "Lollipop", calories: 392, sdkf: 19, sasj: 10, wer: 9, ewxs: 7, sdv: 6, sxcv: 10 },
    { name: "Lollipop", calories: 392, sdkf: 19, sasj: 10, wer: 9, ewxs: 7, sdv: 6, sxcv: 10 },
    { name: "Lollipop", calories: 392, sdkf: 19, sasj: 10, wer: 9, ewxs: 7, sdv: 6, sxcv: 10 },
    { name: "Lollipop", calories: 392, sdkf: 19, sasj: 10, wer: 9, ewxs: 7, sdv: 6, sxcv: 10 },
    { name: "Lollipop", calories: 392, sdkf: 19, sasj: 10, wer: 9, ewxs: 7, sdv: 6, sxcv: 10 },
    { name: "Lollipop", calories: 392, sdkf: 19, sasj: 10, wer: 9, ewxs: 7, sdv: 6, sxcv: 10 },
    { name: "Lollipop", calories: 392, sdkf: 19, sasj: 10, wer: 9, ewxs: 7, sdv: 6, sxcv: 10 },
    { name: "Lollipop", calories: 392, sdkf: 19, sasj: 10, wer: 9, ewxs: 7, sdv: 6, sxcv: 10 },
    { name: "Lollipop", calories: 392, sdkf: 19, sasj: 10, wer: 9, ewxs: 7, sdv: 6, sxcv: 10 },
]);

// Calculate heights for proper spacing
const headerHeight = computed(() => {
    return 150;
});

const paginationHeight = computed(() => {
    return 20;
});
</script>