<template>
  <div class="flex-container">
    <div class="title">
        <svg t="1737356063386" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14550" width="35" height="35">
        <path class="circle2" stroke="#FE9700" stroke-width="15" fill="none" d="M507.7 35.67c-261.36 0-473.23 211.87-473.23 473.23S246.35 982.13 507.7 982.13 980.93 770.26 980.93 508.9 769.06 35.67 507.7 35.67z m195.54 601.05H466.63c-21.78 0-39.44-17.66-39.44-39.44 0-3.43 0.57-6.69 1.39-9.86-0.82-3.17-1.39-6.43-1.39-9.86V340.95c0-21.78 17.66-39.44 39.44-39.44 21.78 0 39.44 17.66 39.44 39.44v216.9h197.18c21.78 0 39.44 17.66 39.44 39.44-0.02 21.77-17.67 39.43-39.45 39.43z" p-id="14551"></path></svg>        
        <h2>未使用 {{loginTopicTitle}} 主题的应用系统</h2>
    </div>
    <el-divider></el-divider>
    <not-used ref="notUsed" :loginTopicId="loginTopicId" @onload="onload"></not-used>
    <div class="title">
        <svg t="1737355903603" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7852" id="mx_n_1737355903604" width="35" height="35">
        <path class="circle1" stroke="#108cee" stroke-width="15" fill="none" d="M512 0a512 512 0 1 0 512 512 512 512 0 0 0-512-512z m232.96 442.24l-224 223.36a60.16 60.16 0 0 1-84.48 0L320 548.48a59.52 59.52 0 0 1 84.48-84.48l64 64a17.28 17.28 0 0 0 24.96 0l168.32-168.32a59.52 59.52 0 0 1 84.48 84.48z" p-id="7853"></path></svg>
        <h2>已使用 {{loginTopicTitle}} 主题的应用系统</h2>
    </div>
    <el-divider></el-divider>
    <used ref="used" :loginTopicId="loginTopicId" @onload="onload"></used>
  </div>
</template>

<script>
import used from './used'
import notUsed from './notUsed'
  export default {
    components: {used,notUsed},
    props: {
        loginTopicId: {
            type: String,
            default: ''
        },
        loginTopicTitle: {
            type: String,
            default: ''
        }
    },
    data() {
      return {}
    },
    watch: {
        loginTopicId() {},
        loginTopicTitle() {}
    },
    created() {
    },
    methods: {
        onload() {
            console.log("this.$refsthis.$refs",this.$refs)
            this.$refs.used.onLoad()
            this.$refs.notUsed.onLoad()
        }
    }
  }
</script>

<style lang="scss" scoped>
.title {
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.el-card {
    padding: 0px 0px 0px 0px;
}
/* 外层圆环动画 */
.circle1 {
    stroke-dasharray: 1000; /* 路径总长度 */
    stroke-dashoffset: 1000; /* 初始偏移量 */
    animation: draw-circle 1s ease-in-out forwards; /* 只播放一次 */
} 

/* 外层圆环动画 */
.circle2 {
    stroke-dasharray: 1000; /* 路径总长度 */
    stroke-dashoffset: 1000; /* 初始偏移量 */
    animation: draw-circle 1s ease-in-out forwards; /* 只播放一次 */
} 

/* 关键帧：绘制圆环 */
@keyframes draw-circle {
    0% {
        stroke-dashoffset: 1000; /* 初始状态：完全隐藏 */
    }
    100% {
        stroke-dashoffset: 0; /* 结束状态：完全显示 */
    }
}

/* 颜色填充动画 */
@keyframes fill-color1 {
    0% {
        fill: transparent; /* 初始状态：无填充 */
    }
    100% {
        fill: #108cee; /* 结束状态：填充颜色 */
    }
}

/* 颜色填充动画 */
@keyframes fill-color2 {
    0% {
        fill: transparent; /* 初始状态：无填充 */
    }
    100% {
        fill: #FE9700; /* 结束状态：填充颜色 */
    }
}

/* 在描边完成后触发填充动画 */
.circle1 {
    animation-fill-mode: forwards; /* 保持最终状态 */
}

/* 在描边完成后触发填充动画 */
.circle2 {
    animation-fill-mode: forwards; /* 保持最终状态 */
}

.circle1 {
    animation: draw-circle 1s ease-in-out forwards, fill-color1 0.5s ease-in-out 1s forwards;
}

.circle2 {
    animation: draw-circle 1s ease-in-out forwards, fill-color2 0.5s ease-in-out 1s forwards;
}
</style>