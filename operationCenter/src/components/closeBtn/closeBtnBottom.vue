<template>
    <div class="closedInforContent">
        <span class="closeDetailsBtn" @click="closeSelectedTag">关闭</span>
    </div>
</template>
<script>
export default {
    methods: {
        closeSelectedTag() {
        let view = this.$route
        this.$store.dispatch('delView', view).then(({ visitedViews }) => {
            // if (this.isActive(view)) {
              this.toLastView(visitedViews)
            // }
        })
        },
       toLastView(visitedViews) {
            const latestView = visitedViews.slice(-1)[0]
            if (latestView) {
                this.$router.push(latestView)
            } else {
                // You can set another route
                this.$router.push('/')
            }
        },
    }
}
</script>
<style scoped>
.closedInforContent{
    background-color: #ffffff;
    height: 70px;
    line-height: 70px;
    text-align: center;
}
.closedInforContent .closeDetailsBtn{
    display: inline-block;
    width: 120px;
    height: 38px;
    line-height: 38px;
	background-color: #c8000a;
    border-radius: 10px;
    font-size: 16px;
    color: #ffffff;
    cursor: pointer;
}
</style>
