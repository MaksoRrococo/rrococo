<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import type { IAdditionalInfo } from '~/types';

const contacts = useContactsStore()
const { additionalInfo } = storeToRefs(contacts)

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<IAdditionalInfo>({
  tel: additionalInfo.value?.tel as string,
  portfolioUrl: additionalInfo.value?.portfolioUrl as string
})

const rules = reactive<FormRules<IAdditionalInfo>>({
  tel: [
    { required: true, message: 'Please input Tel', trigger: 'blur' },
  ],

  portfolioUrl: [
    {
      required: true,
      message: 'Please input potfolio Url',
      trigger: 'blur',
    },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
       contacts.updateAdditionalInfo({id: additionalInfo.value?.id as string, ...ruleForm})
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>

<template>
    <div>
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
            <el-form-item label="Tel:" prop="tel">
              <el-input v-model="ruleForm.tel" />
            </el-form-item>
            <el-form-item label="Portfolio Url:" prop="portfolioUrl">
              <el-input v-model="ruleForm.portfolioUrl" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm(ruleFormRef)">
                Save
              </el-button>
              <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>

</style>