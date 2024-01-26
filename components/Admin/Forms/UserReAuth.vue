<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const user = useUserStore()

const emits = defineEmits(['submit'])

interface ILogin {
    email: string
    password: string
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<ILogin>({
    email: '',
    password: ''
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
  password: [
    {
      required: true,
      message: 'Please input password',
      trigger: 'blur',
    },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
       emits('submit', ruleForm.email, ruleForm.password)
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
            <el-form-item label="Email:" prop="email">
                <el-input v-model="ruleForm.email" />
            </el-form-item>
            <el-form-item label="Password:" prop="password">
              <el-input v-model="ruleForm.password" type="password"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm(ruleFormRef)">
                Log In
              </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>

</style>