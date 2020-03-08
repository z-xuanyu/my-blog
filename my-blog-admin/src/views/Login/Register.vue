<template>
    <!-- 注册页面 -->
    <div class="register">
        <div class="contaier pt-5">
            <div class="row">
                <div class="col-lg-3 col-md-6 m-auto pt-5">
                    <div class="card card-bg">
                        <div class="card-header text-center border">
                            <h4>管理员注册</h4>
                        </div>
                        <div class="card-body">
                            <el-form
                                :model="ruleForm"
                                :rules="rules"
                                ref="ruleForm"
                                label-width="100px"
                            >
                                <el-form-item label="用户名：" prop="username">
                                    <el-input size="small" v-model="ruleForm.username" placeholder="请输入你的账号"></el-input>
                                </el-form-item>
                                <el-form-item label="密码：" prop="password">
                                    <el-input
                                        v-model="ruleForm.password"
                                        type="password"
                                        size="small"
                                        placeholder="请输入你的密码"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="确认密码：" prop="password">
                                    <el-input
                                        v-model="ruleForm.confirmpassword"
                                        type="password"
                                        size="small"
                                        placeholder="请确认你的密码"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱：" prop="email">
                                    <el-input
                                        v-model="ruleForm.email"
                                        type="email"
                                        size="small"
                                        placeholder="请输入你的邮箱"
                                        @keyup.enter.native="handleRegister"
                                    ></el-input>
                                </el-form-item>
                                <el-button size="small" type="primary" class="w-100" @click="handleRegister">立即注册</el-button>
                            </el-form>
                        </div>
                    </div>
                    <div class="tab-way text-white mt-3 float-right">
                        <el-button size="small" type="primary" @click="goLogin">去登陆</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ruleForm: {
                username: "",
                password: "",
                confirmpassword: "",
                email: ""
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: ["blur", "change"]
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: ["blur", "change"]
                    }
                ],
                email: [
                    {
                        type: "email",
                        message: "请输入正确的邮箱地址",
                        trigger: ["blur", "change"]
                    }
                ]
            }
        };
    },
    methods: {
        // 注册
        handleRegister() {
            // 校验表单规则
            this.$refs.ruleForm.validate(val => {
                if (val) {
                    this.$axios
                        .post("http://localhost:3000/regist", this.ruleForm)
                        .then(({ data }) => {
                            const code = data.code;
                            switch (code) {
                                case 0:
                                    this.$message.error(
                                        "对不起，用户名已存在！"
                                    );
                                    break;
                                case 1:
                                    this.$message.success("恭喜你，注册成功！");
                                    this.$router.push({ path: "/login" });
                                    break;
                                case 2:
                                    this.$message.error(
                                        "对不起，两次的密码不一致！"
                                    );
                                    break;
                                case 3:
                                    this.$message.error("对不起，邮箱已存在！");
                                    break;
                                case 4:
                                    this.$message.error(
                                        "服务器异常，请重新试试o(╥﹏╥)o"
                                    );
                                    break;
                                default:
                                    break;
                            }
                        });
                }else{
                    this.$message.error("对不起，注册失败，请重新注册！")
                }
            });
        },
        // 路由跳转登录页
        goLogin() {
            this.$router.push({ path: "/login" });
        }
    }
};
</script>

<style lang="sass" scoped>
.register 
    position: fixed
    top: 0
    bottom: 0
    right: 0
    left: 0
    background-color: #0c093c
    box-sizing:border-box
</style>