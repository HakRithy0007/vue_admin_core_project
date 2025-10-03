<template>
    <div>
        <VMenu location="bottom" offset-y>

            <template #activator="{ props }">
                <VBtn v-bind="props" icon variant="text" class="hover:bg-gray-100">
                    <Icon icon="ion:language-outline" class="text-[25px]" />
                </VBtn>
            </template>

            <!-- Dropdown Content -->
            <VCard class="min-w-[120px]">
                <VList>
                    <VListItem>
                        <VBtn @click="changeLanguage('km')" variant="text"
                            class="w-full flex justify-center items-center">
                            <img :src="flag1" alt="flag1" class="w-10 h-6 object-contain rounded" />
                        </VBtn>
                    </VListItem>
                    <VListItem>
                        <VBtn @click="changeLanguage('en')" variant="text" class="w-full flex justify-center items-center">
                            <img :src="flag2" alt="flag2" class="w-10 h-6 object-contain rounded" />
                        </VBtn>
                    </VListItem>
                </VList>
            </VCard>
        </VMenu>
    </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
import flag1 from "@/assets/images/flag/cambodia-flag.png"
import flag2 from "@/assets/images/flag/usa-flag.webp"
import { ref } from "vue";

import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const selectedLang = ref(locale.value);

const changeLanguage = (value: string) => {
    locale.value = value;
    selectedLang.value = value;
    localStorage.setItem("lang", value);
};

</script>
