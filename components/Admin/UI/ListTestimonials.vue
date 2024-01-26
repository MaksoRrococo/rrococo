<script setup lang="ts">
import { Edit, DeleteFilled, Box } from '@element-plus/icons-vue'

interface Props {
    title: string
    image?: string
}

defineProps<Props>()
defineEmits(['updateItem', 'deleteItem'])

</script>

<template>
    <div class="service-list-item">
        <div class="service-list-item-left">
            <div class="service-list-item-img">
                <img :src="image" alt="image" v-if="image">
                <el-icon color="blue" size="24" v-else><Box /></el-icon>
            </div>
            <div class="service-list-item-title">
                {{title}}
            </div>
        </div>
        <div class="service-list-item-actions">
            <el-icon 
                size="24" 
                color="blue"
                class="service-list-item-action"
                @click="$emit('updateItem')"
            >
                <Edit />
            </el-icon>
            <el-icon 
                size="24" 
                color="red"
                class="service-list-item-action"
                @click="$emit('deleteItem')"
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
    padding: 10px 0px;
    border-bottom: 1px solid rgb(214, 214, 214);
}

.service-list-item-left {
    display: flex;
    align-items: center;
    gap: 20px;
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