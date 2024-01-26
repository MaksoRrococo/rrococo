<script setup lang="ts">
import type { ITestimonial } from '~/types';

const testimonialsStore = useTestimonialsStore()
const { testimonials } = storeToRefs(testimonialsStore)

const selectedItem = ref<ITestimonial>()
const deleteDialogVisible = ref<boolean>(false)
const updateDialogVisible = ref<boolean>(false)

const deleteItemHandle = (item: ITestimonial) => {
    selectedItem.value = item
    deleteDialogVisible.value = true
}

const updateItemHandle = (item: ITestimonial) => {
  selectedItem.value = item
  updateDialogVisible.value = true
}

const confirmItemDelete = async () => {
   await testimonialsStore.deleteTestimonialSectionItem(selectedItem.value as ITestimonial)
   deleteDialogVisible.value = false
}


const saveTestimonial = async(item: ITestimonial) => {
    await testimonialsStore.AddTestimonialSectionItem(item)
}

const updateTestimonial = async(item :ITestimonial, id: string) => {
    item.id = id
    await testimonialsStore.updateTestimonialSectionItem(item)
    updateDialogVisible.value = false
} 
</script>

<template>
<div>
    <el-dialog v-model="deleteDialogVisible" title="Warning" width="320px" draggable>
        <span>Are you sure you want to delete the service?</span>
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
            <AdminFormsTestimonialItem 
                :submit-func="updateTestimonial"
                func-button-label="Update Testimonial"
                :default-item="selectedItem"
            />
        </div>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="updateDialogVisible = false">Cancel</el-button>
        </span>
        </template>
    </el-dialog>

    <div>
        <AdminUIPageHeader title="Section Testimonials"/>
        <div 
            v-if="testimonials.length == 0"
            class="no-items"
        >
            There are no testimonials at the moment, but you can add them.
        </div>
        <div v-else>
            <h3 class="header-service-item">List of testimonials:</h3>
            <TransitionGroup name="list" tag="ul">
                <li
                    v-for="testimonial in testimonials"
                    :key="testimonial.id" 
                    class="list-sevices"      
                >   
                  <AdminUIListTestimonials
                    :title="testimonial.clientName"
                    @update-item="updateItemHandle(testimonial)"
                    @delete-item="deleteItemHandle(testimonial)"
                  />
                </li>
            </TransitionGroup>
        </div>
        <div style="margin-top: 40px;">
            <h3 class="header-service-item">Add new testimonials:</h3>
            <AdminFormsTestimonialItem 
                :submit-func="saveTestimonial"
                func-button-label="Add Testimonial"
            />
        </div>
    </div>
  </div>
</template>

<style scoped>
.header-service-item {
    font-size: 18px;
    font-weight: 800;
    font-style: italic;
    padding-bottom: 20px;
    color: #707070;
    text-align: center;
}

.no-items {
    display: flex;
    justify-content: center;
    padding: 40px 5px;
    font-style: italic;
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