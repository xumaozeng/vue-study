<template>
  <div>
    <!-- <ElementTest></ElementTest> -->
    <!-- KInput -->
    <k-form :model="model" :rules="rules" ref="loginForm">
      <k-form-item label="用户名" prop="username">
        <k-input v-model="model.username" placeholder="用户名" />
        <!-- 等效于 -->
        <!-- <k-input :value="model.username" @input="model.username=$event" /> -->
      </k-form-item>
      <k-form-item label="密码" prop="password">
        <k-input v-model="model.password" placeholder="密码" />
      </k-form-item>
      <k-form-item>
        <button @click="onLogin">登录</button>
      </k-form-item>
    </k-form>
  </div>
</template>

<script>
import KForm from "./KForm.vue";
import KFormItem from "./KFormItem.vue";
// import ElementTest from "@/components/form/ElementTest.vue";
import KInput from "./KInput.vue";

// 导入弹窗和create方法
/* import Notice from "@/components/Notice.vue";
import create from "@/utils/create"; */

export default {
  provide() {
    // 隔代传参给KFormItem
    return {
      form: this,
    };
  },
  components: {
    // ElementTest
    KInput,
    KFormItem,
    KForm,
  },
  data() {
    return {
      model: {
        username: "tom",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输⼊⽤户名" }],
        password: [{ required: true, message: "请输⼊密码" }],
      },
    };
  },
  methods: {
    onLogin() {
      // 全局校验
      this.$refs.loginForm.validate((isValid) => {
        /* if (isValid) {
          console.log("submit login");
        } else {
          alert("校验失败");
        } */
        /* create(Notice, {
          title: "搬砖",
          message: isValid ? "请求登录" : "校验失败",
        }).show(); */

        // 用封装插件形式
        this.$notice({
          title: "测试",
          message: isValid ? "过" : "不过",
        });
      });
    },
  },
};
</script>

<style scoped>
</style>