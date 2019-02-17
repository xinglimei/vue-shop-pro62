<template>
  <el-container>
    <el-header>
      <div id="logo-box">
        <img src="../assets/img/heima.png" alt>
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="menushow ?'65px' : '200px'">
        <div
          style="background-color:rgb(74,80,100);height:25px;font-size:12px;
          text-align:center;color:white;letter-spacing:0;user-select:none;cursor:pointer;"
          @click="menushow=!menushow"
        >|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :style="menushow ? 'width:65px' : 'width:200px'"
          :collapse="menushow"
          :collapse-transition="false"
        >
          <el-submenu :index="item.id" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i class="iconfont icon-user"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item
              index="item.id+'-'+item2.id"
              v-for="item2 in item.children"
              :key="item2.id"
            >{{item2.authName}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  //生命周期函数
  created() {
    this.getMenuList();
  },
  data() {
    return {
      //左侧按钮导航是否显示
      menushow: false,
      menuList: [], //接收后端返回的左侧显示的权限信息
      //设置左侧图标
     // menuicon: ["user", "tijikongjian", "shangpin", "danju"]
    };
  },
  methods: {
    //获得用户显示的左侧导航权限信息
    async getMenuList() {
      const { data: res } = await this.$http.get("/menus");
      //获取失败处理
      if (res.meta.status != 200) {
        //获取失败处理
        return this.$message.error(res.meta.msg);
      }
      //把权限数据赋值给menulist
      this.menuList = res.data;
    },
    //退出系统
    logout() {
      this.$confirm("确认退出系统?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //确认退出
          //清除token
          //页面跳转道login
          window.sessionStorage.removeItem("token");
          this.$router.push("/login");
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header {
    background-color: rgb(55, 61, 65);
    padding: 0;
    padding-right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    #logo-box {
      color: #fff;
      font-size: 22px;
      display: flex;
      align-items: center;
      user-select: none; //css控制页面文字不能被选中
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
  }
  .el-main {
    background-color: #eaedf1;
  }
}
</style>
