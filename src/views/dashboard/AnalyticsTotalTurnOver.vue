<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import trophy from '@images/misc/trophy.png'

onMounted(() => {
  const el = document.querySelector("#storage_number")

  if (el) {
    const obj = { value: 0 }
    const targetValue = 42800

    const animateNumber = () => {
      gsap.to(obj, {
        value: targetValue,
        duration: 10,
        ease: "power2.out",
        onUpdate: () => {
          const val = obj.value
          const formatted =
            val >= 1
              ? `$${(val / 1).toFixed(1)}k`
              : `$${val.toFixed(0)}`
          el.textContent = formatted
        },
        onComplete: () => {
          obj.value = 0 // reset
          animateNumber() // restart animation (infinite loop)
        },
      })
    }

    animateNumber()
  }
})
</script>

<template>
  <VCard class="position-relative">
    <VCardText>
      <div class="mb-2">
        <h5 class="text-[20px]">
          TOTAL TURN OVER <span class="text-high-emphasis">🎉</span>
        </h5>
        <div class="text-body-1">Turn over today</div>
      </div>

      <h4 id="storage_number" class="text-h2 text-primary">$0</h4>

      <div class="text-body-1 mb-2">
        78% of target <span class="text-high-emphasis">🚀</span>
      </div>
      <VBtn size="small">View Sales</VBtn>
    </VCardText>

    <VImg :src="trophy" class="trophy" />
  </VCard>
</template>

<style lang="scss">
.v-card .trophy {
  position: absolute;
  inline-size: 5.188rem;
  inset-block-end: 1.25rem;
  inset-inline-end: 1.25rem;
}

#storage_number {
  font-family: Arial;
}
</style>
