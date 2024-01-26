<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { getAuth, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

const ruleFormRef = ref<FormInstance>()

const user = useUserStore()


const reauthenticateUserDialog = ref<boolean>(false)

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  pass: '',
  checkPass: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
}) 

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      user.updateUser(ruleForm.pass, reauthenticateUserShowDialog)
      resetForm(ruleFormRef.value)
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const reauthenticateUserShowDialog = () => {
  reauthenticateUserDialog.value = true
}

const reauthenticateUser = (email: string, password: string) => {
  const auth = getAuth()
  const userCurrent = auth.currentUser

  const credential = EmailAuthProvider.credential(email, password)

  reauthenticateWithCredential(userCurrent!, credential).then(() => {
    user.updateUser(ruleForm.pass)
    reauthenticateUserDialog.value = false
  })

} 
</script>

<template>
    <div>

      <el-dialog v-model="reauthenticateUserDialog" title="Login" width="320px" draggable>
            <div>
                <AdminFormsUserReAuth @submit="reauthenticateUser"/>
            </div>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="reauthenticateUserDialog = false">Cancel</el-button>
            </span>
            </template>
        </el-dialog>

        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-position="top"
            label-width="120px"
            class="demo-ruleForm"
        >
            <el-form-item label="Password" prop="pass">
                <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Confirm" prop="checkPass">
                <el-input
                    v-model="ruleForm.checkPass"
                    type="password"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)"
                    >Submit</el-button
                >
                <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>

</style>