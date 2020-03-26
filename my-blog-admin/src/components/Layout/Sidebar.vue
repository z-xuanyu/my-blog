<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from "../../utils/bus";
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: "el-icon-s-home",
                    index: "/",
                    title: "系统首页"
                },
                {
                    icon: "el-icon-menu",
                    index: "1",
                    title: "分类管理",
                    subs: [
                        {
                            index: "/category/create",
                            title: "新增分类"
                        },
                        {
                            index: "/category/list",
                            title: "分类列表"
                        }
                    ]
                },
                {
                    icon: "el-icon-s-promotion",
                    index: "2",
                    title: "文章管理",
                    subs: [
                        {
                            index: "/article/create",
                            title: "添加文章"
                        },
                        {
                            index: "/article/list",
                            title: "文章列表"
                        }
                    ]
                },
                {
                    icon: "el-icon-files",
                    index: "3",
                    title: "运营管理",
                    subs: [
                        {
                            index: "/ad/create",
                            title: "新增广告"
                        },
                        {
                            index: "/ad/list",
                            title: "广告列表"
                        }
                    ]
                },
                {
                    icon: "el-icon-s-custom",
                    index: "4",
                    title: "用户管理",
                    subs: [
                        {
                            index: "/user/create",
                            title: "新增管理员"
                        },
                        {
                            index: "/user/list",
                            title: "管理员列表"
                        }
                    ]
                },
                {
                    icon: "el-icon-link",
                    index: "5",
                    title: "友情链接",
                    subs: [
                        {
                            index: "/link/create",
                            title: "添加链接"
                        },
                        {
                            index: "/link/list",
                            title: "链接列表"
                        }
                    ]
                },
                {
                    icon: "el-icon-s-comment",
                    index: "6",
                    title: "评论管理",
                    subs: [
                        {
                            index: "/commnet/audited",
                            title: "已审核"
                        },
                        {
                            index: "/comment/unreviewed",
                            title: "未审核"
                        }
                    ]
                },
                {
                    icon: "el-icon-s-tools",
                    index: "7",
                    title: "基本配置",
                    subs: [
                        {
                            index: "/set",
                            title: "博客配置"
                        }
                    ]
                }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace("/", "");
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on("collapse", msg => {
            this.collapse = msg;
            bus.$emit("collapse-content", msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
    overflow: hidden;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
