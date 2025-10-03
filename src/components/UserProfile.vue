<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import avatar1 from "@images/avatars/avatar-1.png"

const logoutDialog = ref(false)
const profileDialog = ref(false)
const router = useRouter()

function handleLogout() {
  logoutDialog.value = false
  router.push("/login") // logout logic
}
</script>

<template>
  <VBadge dot location="bottom" offset-x="1" offset-y="2" color="success" bordered>
    <VAvatar class="cursor-pointer" color="primary" variant="tonal">
      <VImg :src="avatar1" />

      <!-- SECTION Menu -->
      <VMenu activator="parent" width="240" location="bottom end" offset="14px">
        <VList class="px-6">
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge dot location="bottom" offset-x="1" offset-y="2" color="success">
                  <VAvatar color="primary" variant="tonal">
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              John Doe
            </VListItemTitle>
            <VListItemSubtitle>Admin</VListItemSubtitle>
          </VListItem>
          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem link @click="profileDialog = true">
            <template #prepend>
              <VIcon class="me-2" icon="ri-user-line" size="22" />
            </template>
            <VListItemTitle>Profile</VListItemTitle>
          </VListItem>


          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem @click="logoutDialog = true">
            <template #prepend>
              <VIcon class="me-2" icon="ri-logout-box-r-line" size="22" />
            </template>
            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>

  <!-- 👉 Profile Dialog -->
  <v-dialog v-model="profileDialog" max-width="400" opacity="0.7">
    <v-card>
      <v-card-title class="text-h6 py-2">
        <span class="flex justify-center items-center poppins">
          Profile
        </span>
      </v-card-title>

      <VDivider />

      <v-card-text>
        <span class="flex justify-center items-center pt-4 gap-2">
          <span class="poppins">This is a simple settings dialog</span>
        </span>
      </v-card-text>

      <VDivider />

      <v-card-actions class="pa-2 flex justify-center items-center">
        <v-btn variant="outlined" color="primary" class="poppins !border-2 !w-[80px]" text="CLOSE"
          @click="profileDialog = false" />
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- 👉 Logout Dialog -->
  <v-dialog v-model="logoutDialog" max-width="400" opacity="0.7">
    <v-card>
      <v-card-title class="text-h6 py-2">
        <span class="flex justify-center items-center poppins">
          Confirm Logout
        </span>
      </v-card-title>

      <VDivider />

      <v-card-text>
        <span class="flex justify-center items-center pt-4 gap-2">
          <span class="poppins">Are you sure you want to log out?</span>
        </span>
      </v-card-text>

      <VDivider />

      <v-card-actions class="pa-2 flex justify-center items-center">
        <v-btn variant="outlined" color="primary" class="poppins !border-2 !w-[80px]" text="CANCEL"
          @click="logoutDialog = false" />
        <v-btn variant="outlined" color="success" class="poppins !border-2 !w-[80px]" text="LOGOUT"
          @click="handleLogout" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
