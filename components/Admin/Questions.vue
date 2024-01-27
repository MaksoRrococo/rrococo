<script setup lang="ts">
import { useQuestionsStore } from '~/stores/questions';
import type { IQuestion } from '~/types';


const quaestionsStore = useQuestionsStore()
const { questions } = storeToRefs(quaestionsStore)

const deleteDialogVisible = ref<boolean>(false)
const updateDialogVisible = ref<boolean>(false)
const selectedItem = ref<IQuestion>()

const dragOtions = computed(() => {
  return {
    animation: 200,
  }
})

const isLoading = ref<boolean>(false)

const updateItemHandle = async (item : IQuestion) => {
    selectedItem.value = item
    updateDialogVisible.value = true
}

const deleteItemHandle = async (item: IQuestion) => {
    selectedItem.value = item
    deleteDialogVisible.value = true
}

const confirmItemDelete = async () => {
    await quaestionsStore.deleteQuestionSectionItem(selectedItem.value as IQuestion)
    deleteDialogVisible.value = false
}

const saveQuestionItem =  async (item: IQuestion) => {
    await quaestionsStore.AddQuestionSectionItem(item)
}

const updateServiceItem = async (item: IQuestion, id: string) => {
  item.id = id
  await quaestionsStore.updateQuestionSectionItem(item)
  updateDialogVisible.value = false
}

const saveOrderItems = async() => {
  isLoading.value = true
   await quaestionsStore.saveQuestionsSectionItemsOrder()
   isLoading.value = false
}
</script>

<template>
    <div>

        <el-dialog v-model="deleteDialogVisible" title="Warning" width="320px" draggable>
            <span>Are you sure you want to delete the question?</span>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="deleteDialogVisible = false">Cancel</el-button>
                <el-button type="danger" @click="confirmItemDelete">
                    Delete
                </el-button>
            </span>
            </template>
        </el-dialog>

        <el-dialog v-model="updateDialogVisible" title="Update Service" width="98%" draggable>
            <div>
                <AdminFormsQuestionItem
                    :submit-func="updateServiceItem"
                    func-button-label="Update Question"
                    :default-question="selectedItem?.question"
                    :default-answer="selectedItem?.answer"
                    v-bind:default-answer-title="selectedItem?.answerTitle"
                    :id="selectedItem?.id"
                    v-if="updateDialogVisible"
                />
            </div>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="updateDialogVisible = false">Cancel</el-button>
            </span>
            </template>
        </el-dialog>

        <AdminUIPageHeader title="Вопросы и ответы" />
        <div 
            v-if="questions.length == 0"
            class="no-items"
        >
            There are no questions at the moment, but you can add them.
        </div>
        <div v-else>
            <h3 class="header-service-item">List of qustions:</h3>
            <draggable v-model="questions" v-bind="dragOtions">
                <TransitionGroup name="list">
                    <div
                        v-for="question in questions"
                        :key="question.id" 
                        class="list-sevices"      
                    >   
                        <AdminUIListItems 
                            :title="question.question"
                            @update-item="updateItemHandle(question)"
                            @delete-item="deleteItemHandle(question)"
                        />
                    </div>
                </TransitionGroup>
            </draggable>
            <div class="order-save-button">
                <el-button type="success" plain @click="saveOrderItems" :loading="isLoading">Save Items Order</el-button>
            </div>   
        </div>
        <div style="margin-top: 40px;">
            <h3 class="header-service-item">Add new question:</h3>
            <AdminFormsQuestionItem 
              :submit-func="saveQuestionItem"
              func-button-label="Add Question"
            />
        </div>
    </div>
</template>

<style scoped>
.no-items {
    display: flex;
    justify-content: center;
    padding: 40px 5px;
    font-style: italic;
    text-align: center;
}

.order-save-button {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.header-service-item {
    font-size: 18px;
    font-weight: 800;
    font-style: italic;
    padding-bottom: 20px;
    color: #707070;
    text-align: center;
}

.list-sevices {
    padding: 0px 10px;
    transition: background 0.6s ease;
}
.list-sevices:hover {
    background: rgb(243, 243, 243);
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