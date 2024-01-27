<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

interface ILogin {
    email: string
}

const emits = defineEmits(['submit'])

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<ILogin>({
    email: '',
})

const rules = reactive<FormRules<ILogin>>({
  email: [
    {
      required: true,
      message: 'Please input email',
      trigger: 'blur',
    },

    {
        type: 'email',
        message: 'Please input correct email address',
        trigger: ['blur', 'change'],
    },
  ],

})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
       emits('submit', ruleForm.email)
    } else {
      console.log('error submit!', fields)
    }
  })
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
            <el-form-item label="Plaese enter Email:" prop="email">
                <el-input v-model="ruleForm.email" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm(ruleFormRef)">
                Reset Password
              </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
</style>