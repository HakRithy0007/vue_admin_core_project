<template>
    <VCard>
        <VDataTable :items-per-page-text="t('ITEMS_PER_PAGE')" :headers="headers" :items="paginatedData" item-value="id"
            class="text-no-wrap custom-data-table audit-table">
            <!-- Row Index -->
            <template #item.n°="{ index }">
                {{ (page - 1) * UserPerPage + index + 1 }}
            </template>

            <!-- Account -->
            <template #item.account="{ item }">
                <span class="flex justify-center items-center gap-2">
                    <Icon icon="material-symbols:account-box" class="text-[20px] text-primary" />
                    {{ item.Account }}
                </span>
            </template>

            <!-- Context -->
            <template #item.context="{ item }">
                <span class="flex justify-center items-center gap-2">
                    <Icon icon="material-symbols-light:contextual-token" class="text-[20px] text-warning" />
                    {{ item.Context }}
                </span>
            </template>

            <!-- Description -->
            <template #item.description="{ item }">
                <span class="flex justify-center items-center gap-2">
                    <Icon icon="material-symbols:description-rounded" class="text-[20px] text-error" />
                    {{ item.Description }}
                </span>
            </template>

            <!-- Date -->
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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const page = ref(1)
const UserPerPage = ref(100)

const headers = computed(() => [
    { title: t("NO"), key: "n°", align: "center" as const, sortable: false },
    { title: t("ACCOUNT"), key: "account", align: "center" as const, sortable: false },
    { title: t("CONTEXT"), key: "context", align: "center" as const, sortable: false },
    { title: t("DESCRIPTION"), key: "description", align: "center" as const, sortable: false },
    { title: t("DATE"), key: "date", align: "center" as const, sortable: false },
])

const userData = ref([
    { id: 1, Account: "Galasasen", Context: "Slixby", Description: "galasasen.slixby", Date: "12/08/2025" },
    { id: 2, Account: "Galasasen", Context: "Slixby", Description: "galasasen.slixby", Date: "12/08/2025" },
    { id: 3, Account: "Galasasen", Context: "Slixby", Description: "galasasen.slixby", Date: "12/08/2025" },
    { id: 4, Account: "Galasasen", Context: "Slixby", Description: "galasasen.slixby", Date: "12/08/2025" },
    { id: 5, Account: "Galasasen", Context: "Slixby", Description: "galasasen.slixby", Date: "12/08/2025" },
])

const paginatedData = computed(() => {
    const start = (page.value - 1) * UserPerPage.value
    const end = start + UserPerPage.value
    return userData.value.slice(start, end)
})


</script>


<style lang="css" scoped>
.custom-data-table :deep(tbody tr:hover) {
    background-color: rgba(var(--v-theme-primary), 0.08) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.custom-data-table :deep(tbody tr:hover td) {
    color: rgb(var(--v-theme-primary));
}

.custom-data-table :deep(th) {
    font-family: 'Kantumruy Pro', serif !important;
}

.custom-data-table :deep(td) {
    font-family: 'Poppins', sans-serif !important;
}

.custom-data-table :deep(td.khmer) {
    font-family: 'Kantumruy Pro', serif !important;
}

.audit-table :deep(th) {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
}

.audit-table :deep(th span) {
    font-size: 16px;
}
</style>