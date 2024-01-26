<script setup lang="ts">
import { adminMenu } from '~/constants/adminMenu'
import type { IAdminMenuItem } from '~/types';

const activeTab = ref<number>(0)

const emits = defineEmits(['menuClick'])

const itemClickHandle = (item: IAdminMenuItem) => {
    activeTab.value = item.id
    emits('menuClick', item.page)
}
</script>

<template>
    <div class="admin-bar">
        <div class="bar-header">
            <span class="bar-header-main">Admin</span>
            <span>Panel.</span>
        </div>
        <nav>
            <ul>
                <li
                    v-for="item in adminMenu"
                    :key="item.id"
                    class="item-admin-menu"
                    :class="{'active': item.id === activeTab}"
                    @click="itemClickHandle(item)"
                >
                    {{item.text}}
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
    .admin-bar {
        width: 100%;
        height: 100vh;
        background: rgb(57, 57, 181);
        color: white;
        position: relative;
    }
    .bar-header {
        display: flex;
        padding: 30px 0px;
        justify-content: center;
    }
    .bar-header-main {
        font-size: 28px;
        font-weight: 700;
    }
    .item-admin-menu {
        padding: 15px 20px;
        cursor: pointer;
        font-size: 18px;
        transition: background 0.6s ease;
    }
    .item-admin-menu:hover {
        background: rgb(97, 97, 153);
    }
    .active {
        background: rgb(90, 90, 255);
    }
</style>