<template>
  <div>
    <avue-data-tabs :option="option"></avue-data-tabs>
    <el-divider class="flowing-divider"></el-divider>
    <userOnlineCrud></userOnlineCrud>
  </div>
</template>

<script>
import userOnlineCrud from "./userOnlineCrud"
export default {
    components: {userOnlineCrud},
    data() {
        return {
            option: {
                data: [
                    {
                        title: '当前在线用户量',
                        subtitle: '在线',
                        count: 56,
                        allcount: 56,
                        text: '当前系统中活动的用户数量',
                        color: 'rgb(27, 201, 142)',
                        key: '在线'
                    },
                    {
                        title: '系统在线用户量最大值',
                        subtitle: '最大值',
                        count: 432,
                        allcount: 432,
                        text: '配置项中配置的在线用户量的最大值',
                        color: 'rgb(144 27 201)',
                        key: '最大值'
                    },
                    {
                        title: '系统总用户量',
                        subtitle: '总量',
                        count: 5435,
                        allcount: 5435,
                        text: '数据库中注册的用户数量',
                        color: 'rgb(56 148 255)',
                        key: '总量'
                    }
                ]
            },
        }
    }
}
</script>

<style scoped>
.flowing-divider {
  /* background: linear-gradient(to right, rgb(27, 201, 142), rgb(144 27 201), rgb(56 148 255)); */
  background: linear-gradient(to right, rgb(27, 201, 142), rgb(144 27 201), rgb(56 148 255), rgb(56 207 255), rgb(56 255 211), rgb(56 255 134), rgb(56 148 255), rgb(144 27 201));
  background-size: 200% 100%;
  animation: flow 7s steps(100) infinite;
}

@keyframes flow {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;
  }
}
.el-divider--horizontal {
    height: 3px;
}
</style>