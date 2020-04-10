<template>
  <!-- 文章评论 -->
  <div class="article-comment white pa-3">
    <!-- 标题 -->
    <v-row class="mb-3 pl-3 pr-3">
      <v-col class="text-center grey lighten-3 border-r-4">
        共 26 条评论关于 “我的后台管理系统终于有了第一版”
      </v-col>
    </v-row>
    <!-- 文章评论框 -->
    <v-row>
      <v-col cols="2" md="1" sm="1" class="pr-0">
        <v-avatar>
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
          />
        </v-avatar>
      </v-col>
      <v-col cols="10" md="11" sm="11" class="pl-4">
        <v-textarea
          dense
          rows="3"
          name="comment"
          hide-details
          shaped
          solo
          value="来吐槽一下吧！"
        ></v-textarea>
        <div class="d-flex mt-2 justify-end">
          <v-btn small @click="handleShowLogin" color="primary">提交评论</v-btn>
        </div>
      </v-col>
    </v-row>
    <!-- 评论列表 -->
    <v-row v-for="(list, listIndex) in commentList" :key="listIndex">
      <v-col cols="2" md="1" sm="1" class="pr-0">
        <v-avatar>
          <img
            :src="list.avatar"
            alt="用户头像"
          />
        </v-avatar>
      </v-col>
      <v-col cols="10" md="11" sm="11" class="pl-4">
        <!-- 用户信息 -->
        <div class="user-info d-flex">
          <div class="user-name subtitle-2 mr-2">{{list.name}}</div>
          <div class="time caption">{{list.time}}</div>
          <div class="reply">
            <v-btn
              text
              x-small
              @click="showInput(list, listIndex)"
              color="primary"
              >回复</v-btn
            >
          </div>
        </div>
        <!-- 用户评论内容 -->
        <div class="user-comment-content">
          {{list.content}}
        </div>
        <!-- 用户二级回复 -->
        <div
          v-for="(item, index) in list.items"
          :key="index"
          class="grey lighten-3 d-flex pl-2 pt-2 pb-1 border-r-4"
        >
          <img
            width="30px"
            height="30px"
            src="https://q1.qlogo.cn/g?b=qq&nk=279708284&s=100"
            alt="sds"
            style="border-radius:100%"
          />
          <div class="ml-2">
            <div class="user-info d-flex">
              <div class="user-name subtitle-2 mr-2">{{item.name}}</div>
              <div class="time caption">{{item.time}}</div>
              <div class="reply">
                <v-btn
                  text
                  x-small
                  @click="showInput(item, listIndex)"
                  color="primary"
                  >回复</v-btn
                >
              </div>
            </div>
            <!-- 用户二级回复内容 -->
            <p class="mb-0">
              <span class="subtitle-2 subname">@{{list.name}}:</span>
              <span>{{item.content}}</span>
            </p>
          </div>
        </div>
        <!-- 二级回复输入框 -->
        <v-row v-if="activeIndex == listIndex">
          <v-col cols="2" md="1" sm="1" class="pr-0 pb-0">
            <v-avatar>
              <img
                
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="John"
              />
            </v-avatar>
          </v-col>
          <v-col cols="10" md="11" sm="11" class="pl-4 pb-0">
            <v-textarea
              dense
              rows="3"
              name="comment"
              hide-details
              shaped
              solo
              value="@xuanyu"
            ></v-textarea>
            <div class="d-flex justify-end mt-2">
              <v-btn small @click="handleShowLogin" color="primary"
                >提交评论</v-btn
              >
            </div>
          </v-col>
        </v-row>
        <!-- 换行线 -->
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <!-- 评论用户登录 -->
    <v-dialog v-model="showLogin" max-width="400">
      <v-form v-model="valid" ref="loginForm">
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                :counter="10"
                label="昵称"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="qq"
                :rules="qqRules"
                :counter="10"
                label="QQ"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="url"
                :rules="urlRules"
                label="网址"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <div class="pl-3 pr-3">
            <v-btn @click="handleLogin" small block>提交登录</v-btn>
          </div>
        </v-container>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLogin: false,
      valid: false,
      activeIndex: null,
      userInfo: {
        
      },
      name: "",
      nameRules: [
        v => !!v || "请输入昵称",
        v => v.length <= 10 || "昵称过于太长!"
      ],
      email: "",
      emailRules: [
        v => !!v || "请输入Email",
        v => /.+@.+/.test(v) || "Email格式不正确!"
      ],
      qq: "",
      qqRules: [
        v => !!v || "请输入QQ号",
        v => /^[0-9]*$/.test(v) || "QQ不正确!"
      ],
      url: "",
      urlRules: [
        v => !!v || "请输入网址",
        v => v.length <= 20 || "网址过于太长!"
      ],
      commentList: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/john.jpg",
          name: "轩宇",
          time: "2020-03-08 10:03",
          content: "文章写得不错哦!继续坚持,加油!",
          items: [
            {
              avatar: "https://cdn.vuetifyjs.com/images/john.jpg",
              name: "小鱼",
              time: "2020-03-08 10:03",
              content: "我挺你啊"
            },
            {
              avatar: "https://cdn.vuetifyjs.com/images/john.jpg",
              name: "阿宇",
              time: "2020-03-08 10:03",
              content: "666,优秀,优秀啊!"
            },
          ]
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/john.jpg",
          name: "轩宇",
          time: "2020-03-08 10:03",
          content: "文章写得不错哦!继续坚持,加油!",
          items: [
            {
              avatar: "https://cdn.vuetifyjs.com/images/john.jpg",
              name: "小鱼",
              time: "2020-03-08 10:03",
              content: "我挺你啊"
            },
            {
              avatar: "https://cdn.vuetifyjs.com/images/john.jpg",
              name: "阿宇",
              time: "2020-03-08 10:03",
              content: "666,优秀,优秀啊!"
            },
          ]
        }
      ]
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async handleShowLogin() {
      const isLogin = localStorage.getItem("userUid");
      if (!isLogin) {
        this.showLogin = true;
      } else {
        // const res = await this.$axios.$post('http://localhost:3000/web/api/article/comment')
        console.log("评论成功");
      }
    },
    async handleLogin() {
      // 表单验证
      const valudata = this.$refs.loginForm.validate();
      if (valudata) {
        const data = {
          name: this.name,
          email: this.email,
          qq: this.qq,
          url: this.url
        };
        const res = await this.$axios.$post(
          "userUid",
          data
        );
        if (res) {
          localStorage.setItem("userUid", JSON.stringify(res));
          this.showLogin = false;
        }
      }
    },
    async getUserInfo() {
      const userInfo = await JSON.parse(localStorage.getItem("userUid"));
      this.userInfo = userInfo;
    },
    showInput(item, index) {
      console.log(item)
      this.activeIndex = index;
    }
  }
};
</script>

<style lang="scss">
.article-comment {
  color: #333;
  border-radius: 4px;
  .user-name {
    color: #ffb929;
  }
  .subname {
    color: #268bd2;
  }
}
</style>
