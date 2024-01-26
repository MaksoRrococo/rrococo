<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import type { ITestimonial } from '~/types';

interface Props {
    submitFunc: Function
    funcButtonLabel: string
    defaultItem?: ITestimonial
}

const props = defineProps<Props>()


const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<Partial<ITestimonial>>({
  clientName: props.defaultItem?.clientName as string,
  jobTitle: props.defaultItem?.jobTitle as string,
  testimonial: props.defaultItem?.testimonial as string
})

const rules = reactive<FormRules<ITestimonial>>({
    clientName: [
        { required: true, message: 'Please input Client Name', trigger: 'blur' },
    ],

    jobTitle: [
        {
        required: true,
        message: 'Please input text',
        trigger: 'blur',
        }
    ],

    testimonial: [
        {
        required: true,
        message: 'Please input text',
        trigger: 'blur',
        }
  ],
})

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
        const item: ITestimonial = {
            clientName: ruleForm.clientName as string,
            jobTitle: ruleForm.jobTitle as string,
            testimonial: ruleForm.testimonial as string
        }
        props.submitFunc(item, props.defaultItem?.id)
        resetForm(ruleFormRef.value)
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>

<template>
    <div class="service-add-form">
        <el-form
             ref="ruleFormRef"
             :model="ruleForm"
             :rules="rules"
             label-width="120px"
             class="demo-ruleForm"
             label-position="top"
             size="large"
             status-icon
        >
             <el-form-item label="Client Name:" prop="clientName">
               <el-input v-model="ruleForm.clientName" />
             </el-form-item>
             <el-form-item label="Client position:" prop="jobTitle">
               <el-input v-model="ruleForm.jobTitle" />
             </el-form-item>
             <el-form-item label="Testimonial:" prop="testimonial">
               <el-input v-model="ruleForm.testimonial" type="textarea" />
             </el-form-item>
             <el-form-item>
               <el-button type="primary" @click="submitForm(ruleFormRef)">
                 {{funcButtonLabel}}
               </el-button>
               <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
             </el-form-item>
        </el-form>
    </div>
</template>