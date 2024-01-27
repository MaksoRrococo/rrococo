<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import type { IQuestion } from '~/types';

interface Props {
    submitFunc: Function
    funcButtonLabel: string
    defaultQuestion?: string
    defaultAnswer?: string
    defaultAnswerTitle?: string
    id?: string 
}

const props = defineProps<Props>()


const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<Partial<IQuestion>>({
  question: props.defaultQuestion,
  answer: props.defaultAnswer,
  answerTitle: props.defaultAnswerTitle
})

const rules = reactive<FormRules<IQuestion>>({
  question: [
    { required: true, message: 'Please input Title', trigger: 'blur' },
  ],

  answer: [
    {
      required: true,
      message: 'Please input text',
      trigger: 'blur',
    },
  ],

  answerTitle: [
    {
      required: true,
      message: 'Please input text',
      trigger: 'blur',
    },
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
        const item: IQuestion = {
            question: ruleForm.question as string,
            answer: ruleForm.answer as string,
            answerTitle: ruleForm.answerTitle as string
        }
        props.submitFunc(item, props.id)
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
             <el-form-item label="Question:" prop="question">
               <el-input v-model="ruleForm.question" />
             </el-form-item>
             <el-form-item label="Answer title:" prop="answerTitle">
               <el-input v-model="ruleForm.answerTitle" />
             </el-form-item>
             <el-form-item label="Answer:" prop="answer">
               <el-input v-model="ruleForm.answer" type="textarea" />
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