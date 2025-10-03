<script setup lang="ts">
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import avatar5 from '@images/avatars/avatar-5.png'
import avatar6 from '@images/avatars/avatar-6.png'
import avatar7 from '@images/avatars/avatar-7.png'
import avatar8 from '@images/avatars/avatar-8.png'

const headers = [
  { title: 'Active Player', key: 'membername' },
  { title: 'Phone', key: 'phone' },
  { title: 'Role', key: 'role' },
  { title: 'Status', key: 'status' },
]

const userData = [
  {
    id: 1,
    fullName: 'Galasasen Slixby',
    company: 'Yotz PVT LTD',
    role: 'Player',
    membername: 'gslixby0',
    country: 'El Salvador',
    contact: '(479) 232-9151',
    phone: '0123456789',
    currentPlan: 'enterprise',
    status: 'inactive',
    avatar: avatar1,
  },
  {
    id: 2,
    fullName: 'Halsey Redmore',
    company: 'Skinder PVT LTD',
    role: 'Player',
    membername: 'hredmore1',
    country: 'Albania',
    contact: '(472) 607-9137',
    phone: '0123456789',
    currentPlan: 'team',
    status: 'pending',
    avatar: avatar2,
  },
  {
    id: 3,
    fullName: 'Marjory Sicely',
    company: 'Oozz PVT LTD',
    role: 'Player',
    membername: 'msicely2',
    country: 'Russia',
    contact: '(321) 264-4599',
    phone: '0123456789',
    currentPlan: 'enterprise',
    status: 'active',
    avatar: avatar3,
  },
  {
    id: 4,
    fullName: 'Cyrill Risby',
    company: 'Oozz PVT LTD',
    role: 'Player',
    membername: 'crisby3',
    country: 'China',
    contact: '(923) 690-6806',
    phone: '0123456789',
    currentPlan: 'team',
    status: 'inactive',
    avatar: avatar4,
  },
  {
    id: 5,
    fullName: 'Maggy Hurran',
    company: 'Aimbo PVT LTD',
    role: 'Player',
    membername: 'mhurran4',
    country: 'Pakistan',
    contact: '(669) 914-1078',
    phone: '0123456789',
    currentPlan: 'enterprise',
    status: 'pending',
    avatar: avatar5,
  },
  {
    id: 6,
    fullName: 'Silvain Halstead',
    company: 'Jaxbean PVT LTD',
    role: 'Player',
    membername: 'shalstead5',
    country: 'China',
    contact: '(958) 973-3093',
    phone: '0123456789',
    currentPlan: 'company',
    status: 'active',
    avatar: avatar6,
  },
  {
    id: 7,
    fullName: 'Breena Gallemore',
    company: 'Jazzy PVT LTD',
    role: 'Player',
    membername: 'bgallemore6',
    country: 'Canada',
    contact: '(825) 977-8152',
    phone: '0123456789',
    currentPlan: 'company',
    status: 'pending',
    avatar: avatar7,
  },
  {
    id: 8,
    fullName: 'Kathryne Liger',
    company: 'Pixoboo PVT LTD',
    role: 'Player',
    membername: 'kliger7',
    country: 'France',
    contact: '(187) 440-0934',
    phone: '0123456789',
    currentPlan: 'enterprise',
    status: 'pending',
    avatar: avatar8,
  },
]

const resolveUserRoleVariant = (role: string) => {
  const roleLowerCase = role.toLowerCase()

  if (roleLowerCase === 'subscriber')
    return { color: 'success', icon: 'ri-user-line' }
  if (roleLowerCase === 'author')
    return { color: 'error', icon: 'ri-computer-line' }
  if (roleLowerCase === 'maintainer')
    return { color: 'info', icon: 'ri-pie-chart-line' }
  if (roleLowerCase === 'editor')
    return { color: 'warning', icon: 'ri-edit-box-line' }
  if (roleLowerCase === 'admin')
    return { color: 'primary', icon: 'ri-vip-crown-line' }

  return { color: 'success', icon: 'ri-user-line' }
}

const resolveUserStatusVariant = (stat: string) => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === 'pending')
    return 'warning'
  if (statLowerCase === 'active')
    return 'success'
  if (statLowerCase === 'inactive')
    return 'secondary'

  return 'primary'
}
</script>

<template>
  <VCard>
    <VDataTable :headers="headers" :items="userData" item-value="id" class="text-no-wrap">
      <!-- User -->
      <template #item.membername="{ item }">
        <div class="d-flex align-center gap-x-4 poppins">
          <VAvatar size="34" :variant="!item.avatar ? 'tonal' : undefined"
            :color="!item.avatar ? resolveUserRoleVariant(item.role).color : undefined">
            <VImg v-if="item.avatar" :src="item.avatar" />
          </VAvatar>

          <div class="d-flex flex-column">
            <h6 class="text-h6 font-weight-medium member-list-name poppins">
              {{ item.fullName }}
            </h6>

            <span class="text-sm text-medium-emphasis poppins">@{{ item.membername }}</span>
          </div>
        </div>
      </template>
      <!-- Role -->
      <template #item.role="{ item }">
        <div class="d-flex gap-4 poppins">
          <VIcon :icon="resolveUserRoleVariant(item.role).icon" :color="resolveUserRoleVariant(item.role).color"
            size="22" />
          <div class="text-capitalize text-high-emphasis poppins">
            {{ item.role }}
          </div>
        </div>
      </template>
      <!-- Plan -->
      <template #item.plan="{ item }">
        <span class="text-capitalize text-high-emphasis poppins">{{ item.currentPlan }}</span>
      </template>
      <!-- Status -->
      <template #item.status="{ item }">
        <VChip :color="resolveUserStatusVariant(item.status)" size="small" class="text-capitalize poppins">
          {{ item.status }}
        </VChip>
      </template>

      <template #bottom />
    </VDataTable>
  </VCard>
</template>
