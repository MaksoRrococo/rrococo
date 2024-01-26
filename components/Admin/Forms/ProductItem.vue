<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { uploadFile, deleteFile } from '~/services/uploadFile'
import { v4 as uuid} from 'uuid'
import type { FormInstance, FormRules, UploadProps } from 'element-plus';
import type { IProduct, IProductImage, IProductSize } from '~/types';

interface Props {
    submitFunc: Function
    funcButtonLabel: string
    defaultTitle?: string
    defaultDesc?: string
    defaultImage?: string
    defaultSize?: string
    defaultPrice?: number
    defaultImages?: IProductImage[] 
    id?: string 
}

const props = defineProps<Props>()

const notify = useNotificationStore()

const addImagesToProductModalActive = ref<boolean>(false)

const defaultImage = ref<string | undefined>(props.defaultImage)
const imageUrl = ref<string>()
const uploadImage = ref<File>()


const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  uploadImage.value = uploadFile.raw
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<Partial<IProduct>>({
  title: props.defaultTitle,
  description: props.defaultDesc,
  price: props.defaultPrice,
  size: props.defaultSize,

})

const rules = reactive<FormRules<IProduct>>({
  title: [
    { required: true, message: 'Please input Title', trigger: 'blur' },
  ],

  description: [
    {
      required: true,
      message: 'Please input text',
      trigger: 'blur',
    },
  ],

  price: [
    { required: true, message: 'Please input Title', trigger: 'blur' },
  ],

  size: [
    { required: true, message: 'Please input Title', trigger: 'blur' },
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
        if(uploadImage.value && !defaultImage.value) {
            uploadFile(uploadImage.value, `images/products/${uuid()}`, addProductItem)
        } else if(defaultImage.value && !uploadImage.value) {
            addProductItem(defaultImage.value)
        } else if(defaultImage.value && uploadImage.value) {
          deleteFile(`images/services/${defaultImage.value.match('[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}')?.[0]}`)
          uploadFile(uploadImage.value, `images/products/${uuid()}`, addProductItem)
        } else {
            notify.SetNofication('Error', 'Image not selected or load', 'error')
        }
    } else {
      console.log('error submit!', fields)
    }
  })
}


const addProductItem = async (src: string) => {
    const item: IProduct = {
        title: ruleForm.title as string,
        description: ruleForm.description as string,
        image: src,
        price: ruleForm.price as number,
        size: ruleForm.size as string,
        images: []
    }
    await props.submitFunc(item, props.id)
    resetForm(ruleFormRef.value)
    imageUrl.value = ''
}

const addImagesToProduct = () => {
    addImagesToProductModalActive.value = true
}
</script>

<template>

    <AdminImagesUploadModal 
        v-model="addImagesToProductModalActive" 
        :images="defaultImages!" 
        :productId="id!"
    />

    <div>
        <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
        >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <img v-else-if="defaultImage" :src="defaultImage" class="avatar"/>
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
    </div>
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
             <el-form-item label="Title:" prop="title">
               <el-input v-model="ruleForm.title" />
             </el-form-item>
             <el-form-item label="Description" prop="description">
               <el-input v-model="ruleForm.description" type="textarea" />
             </el-form-item>
             <el-form-item label="Price:" prop="price">
               <el-input v-model="ruleForm.price" />
             </el-form-item>
             <el-form-item label="Size:" prop="size">
               <el-input v-model="ruleForm.size" />
             </el-form-item>
             <el-form-item>
               <el-button type="primary" @click="submitForm(ruleFormRef)">
                 {{funcButtonLabel}}
               </el-button>
               <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
               <el-button @click="addImagesToProduct" v-if="id">Add/Edit Images</el-button>
             </el-form-item>
        </el-form>
    </div>
</template>

<style>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>