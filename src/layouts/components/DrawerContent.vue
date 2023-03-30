<script setup lang="ts">
import upgradeBannerDark from '@/assets/images/pro/upgrade-banner-dark.png';
import upgradeBannerLight from '@/assets/images/pro/upgrade-banner-light.png';
import logo from '@/assets/logo.svg?raw';
import {
VerticalListGroup, VerticalListItem,
VerticalListSection
} from "@layouts";
import { useTheme } from 'vuetify';

const vuetifyTheme = useTheme()
const upgradeBanner = computed(() => {
  return vuetifyTheme.global.name.value === 'light'
    ? upgradeBannerLight
    : upgradeBannerDark
})
const optionsMenu = ref<ItemMenu[]>([])
const open = ref(["Users"]);

optionsMenu.value = [
  //54652071756965726f206d7563686f20636f6e2064656d61736961646f
  {
    title: "Dashboard",
    to: "/index",
    icon: { icon: "mdi-home-outline" },
  },
  { heading: "Modules" },

  {
    title: "Accounts",
    to: "/accounts-user",
    icon: { icon: "mdi-account-cash" },
  },
  {
    title: 'Deposits',
    to: '/deposit',
    icon: { icon: 'mdi-cash-fast' }
  },
  {
      title: "Transfers",
      to: "/dashboard-analytics",
      icon: { icon: "mdi-key-outline" },
      children: [
        {
          title: "Internas",
          to: "/transfers/inner-transfers",
          icon: { icon: "mdi-circle-outline" },
        },
        {
          title: "Propias",
          to: "/transfers/own-transfers",
          icon: { icon: "mdi-circle-outline" },
        },
        {
          title: "Otros",
          to: "/transfers/outer-transfers",
          icon: { icon: "mdi-circle-outline" },
        },
        {
          title: "Crypto",
          to: "/transfers/crypto-transfers",
          icon: { icon: "mdi-circle-outline" },
        }
        
      ],
    },]
  const options = computed(() => {
  return optionsMenu.value;
});

interface ItemMenu {
    heading?: string 
    title?: string,
    to?: string,
    icon?: { icon: string },
    children?: ItemMenu[]
}
</script>

<template>
  <!-- 👉 Nav header -->
  <div class="nav-header mx-auto" style="padding:1rem 0.25rem 1rem 0.3em !important">
    <RouterLink to="/" class="app-logo d-flex align-center gap-x-3 app-title-wrapper">
      <!-- ℹ️ You can also use img tag or VImg here -->
      <div v-html="logo" />


    </RouterLink>
  </div>

  <!-- 👉 Nav items -->
  <!-- <ul>
      <VerticalNavLink
        :item="{
          title: 'Dashboard',
          to: 'index',
          icon: { icon: 'mdi-home-outline' }
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Accounts',
          to: 'accounts-user',
          icon: { icon: 'mdi-account-cash' }
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Deposits',
          to: 'deposit',
          icon: { icon: 'mdi-cash-fast' }
        }"></VerticalNavLink>
    </ul> -->
  <VList class="nav-list" v-model:opened="open" v-if="options && options.length > 0">
    <div v-for="(item, i) in options" :key="i">
      <VerticalListGroup :item="item" v-if="item.children" />
      <VerticalListItem :item="item" v-else-if="!item.children && item.to
      " />
      <VerticalListSection :item="item" v-else-if="item.heading" />
    </div>
  </VList>
</template>

<style lang="scss">
// .v-navigation-drawer {
//   height: 100%;

//   .v-navigation-drawer__content {
//     display: flex;
//     flex-direction: column;

//     > ul {
//       flex-grow: 1;
//     }
//   }
// }

.upgrade-banner {
  margin-top: auto;
  // position: absolute;
  // bottom: 13px;
  // left: 50%;
  // transform: translateX(-50%);
}
</style>
