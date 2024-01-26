<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const user = useUserStore()

interface ILogin {
    email: string
    password: string
}

const forgotPasswordDialogVisible = ref<boolean>(false)

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
       user.login(ruleForm.email, ruleForm.password)
    } else {
      console.log('error submit!', fields)
    }
  })
}


const resetPasswordClick = () => {
  forgotPasswordDialogVisible.value = true
}

const resetPasswordHandler = async(email: string) => {
  await user.resetUserPassword(email)
  forgotPasswordDialogVisible.value = false
}
</script>

<template>

      <el-dialog v-model="forgotPasswordDialogVisible" title="Reset Password" width="320px" draggable>
            <AdminFormsEmail @submit="resetPasswordHandler"/>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="forgotPasswordDialogVisible = false">Cancel</el-button>
            </span>
            </template>
      </el-dialog>

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
              <span class="text-forgot" @click="resetPasswordClick">Forgot password?</span>
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
.text-forgot {
  position: absolute;
  top: 35px;
  left: 0;
  width: 100%;
  text-align: right;
  color: blue;
  cursor: pointer;
}

.text-forgot:hover {
  text-decoration: underline;
} 
</style>