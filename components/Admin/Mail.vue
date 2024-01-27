<script setup lang="ts">
import type { IMail, IOrderMail,IContactMail } from '~/types';

const contactMailComponent = resolveComponent('AdminMailContact')
const orderMailComponent = resolveComponent('AdminMailOrder')

type TMailType = IOrderMail | IContactMail

const mailStore = useMailStore()
const { mails } = storeToRefs(mailStore)
const selectedItem = ref<IMail<TMailType>>()

const deleteDialogVisible = ref<boolean>(false)
const showMailContentDialogVisible = ref<boolean>(false)

const deleteMailHandler = (item : IMail<TMailType>) => {
    selectedItem.value = item
    deleteDialogVisible.value = true
}

const confirmItemDelete = async () => {
    await mailStore.deleteMail(selectedItem.value as IMail<TMailType>)
    deleteDialogVisible.value = false
}

const mailClickHandler = async (mail: IMail<TMailType>) => {
    selectedItem.value = mail
    showMailContentDialogVisible.value = true
    await mailStore.setMailIsRead(mail)
}
</script>

<template>
    <div>
        <el-dialog v-model="deleteDialogVisible" title="Warning" width="320px" draggable>
            <span>Are you sure you want to delete this Mail?</span>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="deleteDialogVisible = false">Cancel</el-button>
                <el-button type="danger" @click="confirmItemDelete">
                    Delete
                </el-button>
            </span>
            </template>
        </el-dialog>

        <el-dialog v-model="showMailContentDialogVisible" title="Mail Content" width="98%" draggable>
            <div>
                <component 
                    :is="selectedItem?.type === 'contact' ? contactMailComponent : orderMailComponent"
                    :mail="selectedItem"
                />
            </div>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="showMailContentDialogVisible = false">Cancel</el-button>
            </span>
            </template>
        </el-dialog>

    <div>
       <AdminUIPageHeader title="Mails"/>
       <div>
            <div v-if="mails.length === 0" class="no-items">
                There are no mails at the moment.
            </div>
                    <div v-else>
                        <TransitionGroup name="list" tag="ul" class="sosials-list">
                            <li
                                v-for="mail in mails"
                                :key="mail.id" 
                                class="list-services"
                                @click="mailClickHandler(mail)"
                            >                      
                              <AdminUIMailList 
                                    :title="mail.mail.username"  
                                    :is-read="mail.isRead"
                                    @delete-item="deleteMailHandler(mail)"
                                /> 
                            </li>
                        </TransitionGroup>
                    </div> 
       </div>
    </div>
</div>
</template>

<style scoped>
.list-sevices {
    padding: 0px 10px;
    transition: background 0.6s ease;
}
.list-sevices:hover {
    background: rgb(243, 243, 243);
}

.additional-info {
    border: 1px solid blue;
    border-radius: 5px;
    padding: 10px;
    margin: 30px 0px 10px 30px;
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