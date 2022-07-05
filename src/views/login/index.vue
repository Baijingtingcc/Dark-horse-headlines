<template>
  <div class="login-container">
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        placeholder="请填写手机号"
        type="tel"
        name="mobile"
        required
        :maxlength="11"
        :rules="rules.mobile"
      >
        <template #left-icon> <my-icon icon="shouji"></my-icon> </template
      ></van-field>
      <van-field
        v-model="user.code"
        placeholder="请填写验证码"
        :rules="rules.code"
        required
        type="number"
        :maxlength="6"
      >
        <template #left-icon> <my-icon icon="yanzhengma"></my-icon> </template>
        <template #button>
          <van-count-down
            :time="5000"
            v-if="isDown"
            @finish="isDown = false"
            format="ss s"
          />
          <van-button
            v-else
            size="mini"
            type="primary"
            class="send-sms-btn"
            native-type="button"
            @click="goCode"
            :disabled="isShow"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { goLogin, goSmsCode } from "@/api/user";
import MyIcon from "@/components/MyIcon.vue";
import { Toast } from "vant";
export default {
  name: "LoginPage",
  components: { MyIcon },
  props: {},
  data() {
    return {
      isDown: false,
      isShow: false,
      user: {
        mobile: "",
        code: "",
      },
      rules: {
        mobile: [
          {
            required: true,
            message: "请填写手机号",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "请填写验证码",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        const res = await goLogin(this.user);
        console.log(res);
        Toast.success("登录成功");
      } catch (e) {
        Toast.fail(e?.response?.data?.message || "服务器端错误");
      }
    },
    async goCode() {
      try {
        await this.$refs.form.validate("mobile");
      } catch (e) {
        return;
      }
      try {
        this.isShow = true;
        const res = await goSmsCode(this.user.mobile);
        console.log(res);
        this.isDown = true;
        Toast.success("发送验证码成功");
      } catch (e) {
        console.log(e);
        Toast.fail(e.response.data.message || "出错了");
        this.isDown = false;
      } finally {
        this.isShow = false;
      }
    },
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less">
/deep/.toutiao {
  font-size: 30px;
}
.send-sms-btn {
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
}
</style>
