<script setup lang="ts">
import { Message, Document, CloseBold, SwitchButton } from '@element-plus/icons-vue';

const userStore = useUserStore()
const mailStore = useMailStore()

const { mails } = storeToRefs(mailStore)

const router = useRouter()

const mailPage = ref<boolean>(false)
const activeTab: any = inject('settingTab')

const page = computed(() => {
    if(mailPage.value) {
        return resolveComponent('AdminMail')
    }
    return resolveComponent(activeTab.value)
})

const singOutHandle = () => {
    userStore.singOut()
    router.push('/')
}

const getUnreadMessages = computed(() => {
    return mails.value.filter(m => m.isRead === false).length
})

definePageMeta({
    layout: 'admin',
    middleware: 'auth'
})
</script>

<template>
    <div class="page-main">
        <div class="admin-icons">
            <el-badge :value="getUnreadMessages" class="item" v-if="!mailPage" :hidden="getUnreadMessages === 0">
                <el-icon size="24" class="admin-icon" @click="mailPage = true" ><Message /></el-icon>
            </el-badge>
            <el-icon size="24" class="admin-icon" @click="mailPage = false" v-else><CloseBold /></el-icon>
            <el-icon size="24" class="admin-icon" @click="router.push('/')"><Document /></el-icon>
            <el-icon size="24" class="admin-icon" @click="singOutHandle"><SwitchButton /></el-icon>
        </div>
        <Transition name="fade" mode="out-in">
            <component :is="page" />
        </Transition>
    </div>
</template>

<style scoped>
.page-main {
    position: relative;
}

.admin-icons {
    position: absolute;
    top: -30px;
    right: 0;
    display: flex;
    gap: 10px;
}

.admin-icon {
    cursor: pointer;
    transition: all 0.4s ease;
}

.admin-icon:hover {
    transform: scale(1.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.page-main {
    margin-top: 40px;
}

.item {
  margin-right: 10px;
}
</style>