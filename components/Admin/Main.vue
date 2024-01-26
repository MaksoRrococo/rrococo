<script setup lang="ts">
import type { ISocialsContacts } from '~/types';
import { DeleteFilled } from '@element-plus/icons-vue';

const contacts = useContactsStore()
const { additionalInfo, socials } = storeToRefs(contacts)

const selectedItem = ref<ISocialsContacts>()

const deleteDialogVisible = ref<boolean>(false)

const addSocialNetwork = async(item: ISocialsContacts) => {
    await contacts.AddSocialItemItem(item)
}

const deleteItemSocial = (item: ISocialsContacts) => {
    selectedItem.value = item
    deleteDialogVisible.value = true
}

const confirmItemDelete = async() => {
    await contacts.deleteSocialItem(selectedItem.value as ISocialsContacts)
    deleteDialogVisible.value = false
}
</script>

<template>
    <div>

        <el-dialog v-model="deleteDialogVisible" title="Warning" width="320px" draggable>
            <span>Are you sure you want to delete the Social Network?</span>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="deleteDialogVisible = false">Cancel</el-button>
                <el-button type="danger" @click="confirmItemDelete">
                    Delete
                </el-button>
            </span>
            </template>
        </el-dialog>

        <AdminUIPageHeader title="Главная"/>
        <div class="main-admin-content">
            <div class="socials-icons">
                <h3 class="header-service-item">Ссылки на социальные сети:</h3>
                <div class="social-content">
                    <div v-if="socials.length === 0" class="no-items">
                       В данный момент нет ссылок на социальные сети, но вы можете добавить их ниже
                    </div>
                    <div v-else>
                        <TransitionGroup name="list" tag="ul" class="sosials-list">
                            <li
                                v-for="icon in socials"
                                :key="icon.id" 
                                class="icon-list"
                                @click="deleteItemSocial(icon)"      
                            >   
                                <UISocialIcon class="icon" :social="icon.social" :link="icon.link"/>
                                <el-icon 
                                    color="#fff" 
                                    size="20" class="icon-delete">
                                    <DeleteFilled />
                                </el-icon>
                            </li>
                        </TransitionGroup>
                    </div>
                    <div class="social-icon-form">
                        <AdminFormsSocialIcons 
                            func-button-label="Add Social"
                            :submit-func="addSocialNetwork"
                        />
                    </div>
                </div>              
            </div>

            <div class="additional-info">
                <h3 class="header-service-item">Additional Info:</h3>
                <div class="additional-form">
                    <AdminFormsAdditionalInfo :info="additionalInfo"/>
                </div>
            </div>

            <div class="user-settings">
                <h3 class="header-service-item">Change admin password:</h3>
                <div class="settings-content">
                    <AdminFormsUserSettings />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.main-admin-content {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    justify-content: center;
}
.no-items {
    display: flex;
    justify-content: center;
    padding: 40px 5px;
    font-style: italic;
    text-align: center;
}

.header-service-item {
    font-size: 18px;
    font-weight: 800;
    font-style: italic;
    padding-bottom: 20px;
    color: #707070;
    text-align: center;
}

.social-content {
    width: 310px;
    border: 1px solid rgb(206, 205, 205);
    border-radius: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.socials-icons {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.sosials-list {
    display: flex;
    align-items: center;
    gap: 10px;
}

.additional-info {
    width: 310px;
}

.user-settings {
    width: 310px;
}

.settings-content {
    border: 1px solid rgb(251, 50, 50);
    border-radius: 5px;
    padding: 10px;
}


.additional-form {
    border: 1px solid rgb(206, 205, 205);
    border-radius: 5px;
    padding: 10px;
}

.icon-list {
    position: relative;
}

.icon-list:hover {
    background: black;
    border-radius: 50%;
} 

.icon-list:hover .icon {
    opacity: 0.2;
}

.icon-list:hover .icon-delete {
    display: block;
}

.icon-delete {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
}



.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>