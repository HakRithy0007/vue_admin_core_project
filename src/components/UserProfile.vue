<template>
  <VBadge dot location="bottom" offset-x="1" offset-y="2" color="success" bordered>
    <VAvatar class="cursor-pointer" color="primary" variant="tonal">
      <VImg :src="avatar1" />

      <!-- SECTION MENU -->
      <VMenu activator="parent" width="260" location="bottom end" offset="14px">
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
            <VListItemSubtitle>{{ t("ROLE_ADMIN") }}</VListItemSubtitle>
          </VListItem>
          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem link @click="profileDialog = true">
            <template #prepend>
              <VIcon class="me-2" icon="ri-user-line" size="22" />
            </template>
            <VListItemTitle>{{ t("PROFILE") }}</VListItemTitle>
          </VListItem>

          <VDivider class="my-2" />

          <!-- 👉 Change Password -->
          <VListItem link @click="changePass = true">
            <template #prepend>
              <VIcon class="me-2" icon="ri-lock-line" size="22" />
            </template>
            <VListItemTitle>{{ t("CHANGEPASS") }}</VListItemTitle>
          </VListItem>

          <VDivider class="my-2" />


          <!-- 👉 Logout -->
          <VListItem @click="logoutDialog = true">
            <template #prepend>
              <VIcon class="me-2" icon="ri-logout-box-r-line" size="22" />
            </template>
            <VListItemTitle>{{ t("LOGOUT") }}</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>

  <!-- 👉 Profile Dialog -->
  <v-dialog v-model="profileDialog" max-width="500" opacity="0.7">
    <v-card>
      <v-card-title class="text-[18px] py-4">
        <span class="flex justify-center items-center">
          {{ t("PROFILE") }}
        </span>
      </v-card-title>

      <!-- Main Avatar -->
      <div class="flex flex-col justify-center items-center pb-4">
        <!-- Main avatar with spinning dotted border -->
        <div class="avatar-border">
          <img :src="selectedAvatar" alt="profile" class="h-16 w-16 rounded-full">
        </div>

        <!-- Avatar selection -->
        <div class="flex gap-2 mt-4">
          <img v-for="(avatar, index) in avatars" :key="index" :src="avatar"
            :class="['h-12 w-12 rounded-full cursor-pointer border-2', selectedAvatar === avatar ? 'border-primary' : 'border-transparent']"
            @click="selectedAvatar = avatar" />
        </div>

        <!-- Button choose -->
        <v-btn variant="elevated" color="error" class="!mt-4 !w-[150px]" @click="logoutDialog = false">
          Change Avatar
        </v-btn>
      </div>

      <VDivider />

      <v-card-text class="pt-6 pb-4">
        <div class="flex flex-col gap-4">
          <!-- Username -->
          <div class="flex flex-col gap-2">
            <label class="text-sm">{{ t("USERNAME") }}</label>
            <v-text-field v-model="username" variant="outlined" density="comfortable" readonly
              bg-color="grey-lighten-4" />
          </div>

          <!-- Role -->
          <div class="flex flex-col gap-2">
            <label class="text-sm">{{ t("ROLE") }}</label>
            <v-text-field v-model="role" variant="outlined" density="comfortable" readonly bg-color="grey-lighten-4" />
          </div>

          <!-- Phone -->
          <div class="flex flex-col gap-2">
            <label class="text-sm">{{ t("PHONE") }}</label>
            <v-text-field v-model="phone" variant="outlined" density="comfortable" readonly bg-color="grey-lighten-4" />
          </div>
        </div>
      </v-card-text>

      <v-card-actions class="pa-2 flex justify-center items-center">
        <v-btn variant="outlined" color="primary" class="!border-2 !w-[100px]" @click="profileDialog = false">
          {{ t("CLOSE") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- 👉 Change Password Dialog -->
  <v-dialog v-model="changePass" max-width="500" opacity="0.7">
    <v-card>
      <v-card-title class="text-[18px] py-4">
        <span class="flex justify-center items-center">
          {{ t("CHANGEPASS") }}
        </span>
      </v-card-title>

      <VDivider />

      <v-card-text class="pt-6 pb-4">
        <div class="flex flex-col gap-4">
          <!-- Current Password -->
          <div class="flex flex-col gap-2">
            <label class="text-sm">{{ t("CURRENT_PASSWORD") }}</label>
            <v-text-field v-model="currentPassword" type="password" variant="outlined" density="comfortable"
              :placeholder="t('ENTER_CURRENT_PASSWORD')" />
          </div>

          <!-- New Password -->
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold">{{ t("NEW_PASSWORD") }}</label>
            <v-text-field v-model="newPassword" type="password" variant="outlined" density="comfortable"
              :placeholder="t('ENTER_NEW_PASSWORD')" />
          </div>

          <!-- Confirm Password -->
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold">{{ t("CONFIRM_PASSWORD") }}</label>
            <v-text-field v-model="confirmPassword" type="password" variant="outlined" density="comfortable"
              :placeholder="t('ENTER_CONFIRM_PASSWORD')" />
          </div>
        </div>
      </v-card-text>

      <VDivider />

      <v-card-actions class="pa-4 flex justify-center items-center gap-2">
        <v-btn variant="outlined" color="error" class="!border-2 !w-[100px]" @click="changePass = false">
          {{ t("CANCEL") }}
        </v-btn>
        <v-btn variant="outlined" color="success" class="!border-2 !w-[100px]" @click="handleChangePassword">
          {{ t("SAVE") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- 👉 Logout Dialog -->
  <v-dialog v-model="logoutDialog" max-width="400" opacity="0.7">
    <v-card>
      <v-card-title class="text-[16px] py-2">
        <span class="flex justify-center items-center">
          {{ t("CONFIRM_LOGOUT") }}
        </span>
      </v-card-title>

      <VDivider />

      <v-card-text>
        <span class="flex justify-center items-center pt-4 gap-2">
          <span>{{ t("ARE_YOU_SURE_LOGOUT") }}</span>
        </span>
      </v-card-text>

      <VDivider />

      <v-card-actions class="pa-2 flex justify-center items-center gap-2">
        <v-btn variant="outlined" color="error" class="!border-2 !w-[80px]" @click="logoutDialog = false">
          {{ t("CANCEL") }}
        </v-btn>
        <v-btn variant="outlined" color="info" class="!border-2 !w-[80px]" @click="handleLogout">
          {{ t("LOGOUT") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import avatar1 from "@images/avatars/avatar-1.png"

const logoutDialog = ref(false)
const profileDialog = ref(false)
const changePass = ref(false)
const router = useRouter()
const { t } = useI18n()
const username = ref("John Doe")
const role = ref("Admin")
const phone = ref("")
const currentPassword = ref("")
const newPassword = ref("")
const confirmPassword = ref("")


// Predefined avatars
const avatars = [
  '/src/assets/images/avatars/avatar-1.png',
  '/src/assets/images/avatars/avatar-2.png',
  '/src/assets/images/avatars/avatar-3.png',
  '/src/assets/images/avatars/avatar-4.png',
  '/src/assets/images/avatars/avatar-5.png',
  '/src/assets/images/avatars/avatar-6.png'
];

// Selected avatar
const selectedAvatar = ref(avatars[0]);



function handleLogout() {
  logoutDialog.value = false
  router.push("/login")
}

function handleChangePassword() {
  currentPassword.value = ""
  newPassword.value = ""
  confirmPassword.value = ""
  changePass.value = false
}
</script>

<style scoped>
.avatar-border {
  position: relative;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-border::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 4px dotted rgb(47, 255, 0);
  animation: spin 10s linear infinite;
  z-index: 1;
}

.avatar-border img {
  position: relative;
  z-index: 2;
  border-radius: 50%;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>