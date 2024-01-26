<script setup lang="ts">
import { Menu, Close } from '@element-plus/icons-vue'
import type { TAdminSettingTab } from '~/types';

const activeMenu = ref<boolean>(false)
const activeSettingTab = ref<TAdminSettingTab>('AdminMain')

const menuClickHandle = (settingTab: TAdminSettingTab) => {
    activeSettingTab.value = settingTab
    activeMenu.value = false
}

provide('settingTab', activeSettingTab)

</script>

<template>
    <div class="common-layout">
        <el-container>
            <div class="aside-admin"
                :class="{'aside-active' : activeMenu}"
            >
                <div class="menu-open-button" @click="activeMenu = !activeMenu">
                    <el-icon size="28" color="blue" v-if="!activeMenu"><Menu /></el-icon>
                    <el-icon size="28" color="blue" v-else><Close /></el-icon> 
                 </div>
                <AdminLeftSideMenu @menu-click="menuClickHandle"/>
            </div>
            <el-main>
                <div class="main-block">
                    <slot />
                </div>
            </el-main>
        </el-container>
  </div>
</template>

<style scoped>
.aside-admin {
    overflow: visible;
    position: fixed;
    width: 300px;
    transition: left 0.4s ease;
    z-index: 99;
}

.main-block {
    margin-left: 300px;
}

.menu-open-button {
        position: absolute;
        top: 5px;
        right: -45px;
        padding: 5px;
        cursor: pointer;
        transition: all 0.4s ease;
        display: none;
}
.menu-open-button:hover {
       transform: scale(1.1);
}

 .aside-active {
    left: 0 !important;
}

@media screen and (max-width: 950px) {
    .aside-admin {
        position: fixed;
        left: -300px;
    }

    .main-block {
        margin-left: 0;
    }
    .menu-open-button {
        display: block;
    }      
}
</style>