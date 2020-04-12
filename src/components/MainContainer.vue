<template>
    <div class="main-layout">
        <section class="top-bar">
            <slot name="topBar"></slot>
        </section>
        <div class="botm-cont">
            <section class="side-bar">
                <slot name="sideBar"></slot>
            </section>
            <section class="container">
                <slot name="container"></slot>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'main-container'
    }
</script>

<style lang="less" scoped>
.main-layout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    
    .top-bar {
        width: 100%;
        height: 60px;
    }
    .botm-cont {
        order: 1;
        display: flex;
        .side-bar {
            width: 200px;
            height: 100%;
        }
        .container {
            order: 1;
            height: 100%;
        }
    }
    
}
</style>