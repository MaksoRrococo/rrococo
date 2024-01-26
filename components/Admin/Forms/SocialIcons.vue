<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import type { ISocialsContacts, TSocial } from '~/types';

interface Props {
    submitFunc: Function
    funcButtonLabel: string
    defaultItem?: ISocialsContacts
}

const props = defineProps<Props>()


const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<Partial<ISocialsContacts>>({
  social: props.defaultItem?.social,
  link: props.defaultItem?.link
})
1
const rules = reactive<FormRules<ISocialsContacts>>({
    social: [
        {
            required: true,
            message: 'Please select a Social Network',
            trigger: 'change',
        },
    ],
     link: [
        {
            required: true,
            message: 'Please input link',
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
        const item: ISocialsContacts = {
            social: ruleForm.social as TSocial,
            link: ruleForm.link as string,
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
            <el-form-item label="Select social:" prop="social">
                <el-select v-model="ruleForm.social" placeholder="Social Networks">
                    <el-option label="Viber" value="Viber" />
                    <el-option label="WhatsApp" value="WhatsApp" />
                    <el-option label="Instagram" value="Instagram" />
                    <el-option label="Telegram" value="Telegram" />
                    <el-option label="Facebook" value="Facebook" />
                </el-select>
            </el-form-item>
            <el-form-item label="Link to social:" prop="link">
                <el-input v-model="ruleForm.link" />
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