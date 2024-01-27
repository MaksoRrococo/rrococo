<script setup lang="ts">
import { DeleteFilled, Message } from '@element-plus/icons-vue'

interface Props {
    title: string
    isRead: boolean
}

defineProps<Props>()
defineEmits(['deleteItem'])

</script>

<template>
    <div class="service-list-item">
        <div class="service-list-item-left">
            <div class="service-list-item-img">
                <div class="unread-message" v-if="!isRead"></div>
                <el-icon size="24"><Message /></el-icon>
            </div>
            <div class="service-list-item-title">
                {{title}}
            </div>
        </div>
        <div class="service-list-item-actions">
            <el-icon 
                size="24" 
                color="red"
                class="service-list-item-action"
                @click.stop="$emit('deleteItem')"
            >
                <DeleteFilled />
            </el-icon>
        </div>
    </div>
</template>

<style scoped>
.service-list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px;
    border-bottom: 1px solid rgb(214, 214, 214);
    cursor: pointer;
    transition: all 0.4s ease;
}

.service-list-item:hover {
    background: rgb(225, 225, 225);
} 

.service-list-item-left {
    display: flex;
    align-items: center;
    gap: 20px;
}

.service-list-item-img {
    position: relative;
}

.unread-message {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: red;
}
.service-list-item-img img{
    width: 50px;
    height: 50px;
}

.service-list-item-title {
    font-size: 16px;
    font-weight: 700;
}

.service-list-item-actions {
    display: flex;
    gap: 15px;
}

.service-list-item-action {
    cursor: pointer;
    transition: all 0.4s ease;
}

.service-list-item-action:hover {
    transform: scale(1.1);
}

.service-add-form {
    margin-top: 20px;
}
</style>