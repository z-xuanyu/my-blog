<template>
    <el-container>
        <el-aside width="200px" style="background-color: #545c64;">
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                router
            >
                <el-menu-item index="/">
                    <i class="el-icon-menu"></i>
                    <span slot="title">首台首页</span>
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>分类管理</span>
                    </template>
                    <el-menu-item index="/category/add">新建分类</el-menu-item>
                    <el-menu-item index="/category/list">分类列表</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-picture"></i>
                        <span>物品管理</span>
                    </template>
                    <el-menu-item index="3-1">新增物品</el-menu-item>
                    <el-menu-item index="3-2">物品列表</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-s-promotion"></i>
                        <span>英雄管理</span>
                    </template>
                    <el-menu-item index="4-1">新增英雄</el-menu-item>
                    <el-menu-item index="4-2">英雄列表</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-main class="bg-light">
            <router-view></router-view>
        </el-main>
    </el-container>
</template>
<script>
export default {
    name: "Main",
    methods: {
        handleOpen() {
            // console.log(key, keyPath);
        },
        handleClose() {
            // console.log(key, keyPath);
        }
    }
};
</script>
<style lang="scss" scoped>
section {
    height: calc(100vh - 61px);
    display: flex;
    .menu_navbar {
        width: 200px;
        background-color: #545c64;
        box-sizing: border-box;
        overflow: hidden;
    }
    article {
        flex: 1;
    }
}
</style>