<template>
    <div class="login">
        <div class="contaier pt-5">
            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6 m-auto pt-5">
                    <div class="card card-bg">
                        <div class="card-header text-center border">
                            <h4>管理后台登陆</h4>
                        </div>
                        <div class="card-body">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                                <el-form-item prop="username">
                                    <el-input size="small" v-model="ruleForm.username" placeholder="请输入你的账号">
                                        <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="password">
                                    <el-input
                                        size="small"
                                        v-model="ruleForm.password"
                                        type="password"
                                        placeholder="请输入你的秘密"
                                        @keyup.enter.native="handleLogin"
                                    >
                                        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                                    </el-input>
                                </el-form-item>
                                <el-button
                                    type="primary"
                                    :loading="btnLoading"
                                    class="w-100"
                                    size="small"
                                    @click="handleLogin"
                                >立即登录</el-button>
                            </el-form>
                        </div>
                    </div>
                    <div class="tab-way text-white mt-3 float-right">
                        <el-button size="small" type="primary" @click="goRegister">注册</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "login",
    data() {
        return {
            btnLoading: false,
            ruleForm: {
                username: "",
                password: ""
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        // 登陆
        handleLogin() {
            // 校验表单内容
            this.$refs.ruleForm.validate(val => {
                if (val) {
                    this.btnLoading = true;
                    setTimeout(() => {
                        this.btnLoading = false;
                        this.$axios({
                            method: "GET",
                            url: "http://121.42.14.221:3001/login",
                            params: this.ruleForm
                        }).then(({ data }) => {
                            const code = data.code;
                            switch (code) {
                                case 0:
                                    this.$message.error(
                                        "对不起，用户名不存在！"
                                    );
                                    break;
                                case 1:
                                    this.$message.success("恭喜你，登录成功！");
                                    this.$router.push({ path: "/" });
                                    //保存token
                                    localStorage.token = data.token;
                                    break;
                                case 2:
                                    this.$message.error("对不起，密码错误！");
                                    break;
                                default:
                                    break;
                            }
                        });
                    }, 1000);
                } else {
                    this.$message.error("对不起，账号或者密码不能为空！");
                }
            });
        },
        // 路由跳转注册页面
        goRegister() {
            this.$router.push({ path: "/register" });
        }
    }
};
</script>
<style lang="sass" scoped>
.login
    position: fixed
    top: 0
    bottom: 0
    right: 0
    left: 0
    background-color: #0c093c
</style>