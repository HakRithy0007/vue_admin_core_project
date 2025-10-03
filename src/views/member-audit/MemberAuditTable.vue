<template>
    <VCard>
        <VDataTable :headers="headers" :items="paginatedData" item-value="id"
            class="text-no-wrap custom-data-table poppins">
            <template #item.n°="{ index }">
                {{ (page - 1) * UserPerPage + index + 1 }}
            </template>

            <template #item.account="{ item }">
                <span class="flex justify-center items-center gap-2">
                    <Icon icon="material-symbols:account-box" class="text-[20px] text-primary" />
                    {{ item.Account }}
                </span>
            </template>

            <template #item.context="{ item }">
                <span class="flex justify-center items-center gap-2">
                    <Icon icon="material-symbols-light:contextual-token" class="text-[20px] text-warning" />
                    {{ item.Context }}
                </span>
            </template>

            <template #item.description="{ item }">
                <span class="flex justify-center items-center gap-2">
                    <Icon icon="material-symbols:description-rounded" class="text-[20px] text-error" />
                    {{ item.Description }}
                </span>
            </template>
            <template #item.date="{ item }">
                <span class="flex justify-center items-center gap-2">
                    <Icon icon="clarity:date-solid" class="text-[20px] text-info" />
                    {{ new Date(item.Date).toLocaleDateString() }}

                </span>
            </template>
        </VDataTable>
    </VCard>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { Icon } from "@iconify/vue"

const page = ref(1)
const UserPerPage = ref(100)

const headers = [
    { title: "N°", key: "n°", align: "center" as const, class: "font-poppins", sortable: false },
    { title: "Account", key: "account", align: "center" as const, class: "font-poppins", sortable: false },
    { title: "Context", key: "context", align: "center" as const, class: "font-poppins", sortable: false },
    { title: "Description", key: "description", align: "center" as const, class: "font-poppins", sortable: false },
    { title: "Date", key: "date", align: "center" as const, class: "font-poppins", sortable: false },
]

const userData = ref([
    { id: 1, Account: "Galasasen", Context: "Slixby", Description: "galasasen.slixby", Date: "12/08/2025" },
    { id: 2, Account: "Galasasen", Context: "Slixby", Description: "galasasen.slixby", Date: "12/08/2025" },
    { id: 3, Account: "Galasasen", Context: "Slixby", Description: "galasasen.slixby", Date: "12/08/2025" },
    { id: 4, Account: "Galasasen", Context: "Slixby", Description: "galasasen.slixby", Date: "12/08/2025" },
    { id: 5, Account: "Galasasen", Context: "Slixby", Description: "galasasen.slixby", Date: "12/08/2025" },
    { id: 6, Account: "Galasasen", Context: "Slixby", Description: "galasasen.slixby", Date: "12/08/2025" },
    { id: 7, Account: "Galasasen", Context: "Slixby", Description: "galasasen.slixby", Date: "12/08/2025" },
    { id: 8, Account: "Galasasen", Context: "Slixby", Description: "galasasen.slixby", Date: "12/08/2025" },
    { id: 8, Account: "Galasasen", Context: "Slixby", Description: "galasasen.slixby", Date: "12/08/2025" },
    { id: 8, Account: "Galasasen", Context: "Slixby", Description: "galasasen.slixby", Date: "12/08/2025" },
])

const paginatedData = computed(() => {
    const start = (page.value - 1) * UserPerPage.value
    const end = start + UserPerPage.value
    return userData.value.slice(start, end)
})
</script>

<style scoped>
.custom-data-table :deep(.v-data-table__wrapper) {
    overflow-x: hidden;
}

.custom-data-table :deep(th) {
    text-align: center !important;
}

.custom-data-table :deep(.v-data-table__wrapper),
.custom-data-table :deep(.v-table__wrapper) {
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.custom-data-table :deep(.v-data-table__wrapper)::-webkit-scrollbar,
.custom-data-table :deep(.v-table__wrapper)::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
}

/* Hover effect for table rows */
.custom-data-table :deep(tbody tr) {
    transition: all 0.2s ease-in-out;
}

.custom-data-table :deep(tbody tr:hover) {
    background-color: rgba(var(--v-theme-primary), 0.08) !important;
    transform: scale(1.01);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.custom-data-table :deep(tbody tr:hover td) {
    color: rgb(var(--v-theme-primary));
}
</style>
