<template>
    <div :class="$style.root">
        <div :class="$style.line"></div>
    </div>
</template>

<script>
export default {
    name: 'TitleLine',
};
</script>

<style lang="stylus" module>
.root {
    position: relative;
    overflow: hidden;
    height: 2px;
    width: 24rem;
    box-sizing: border-box;
    margin: auto;
}

.line {
    position: relative;
    width: 4rem;
    height: 100%;
    text-align: center;
    opacity: 0.6;
    margin: 0;
    border: 0;
    background: linear-gradient(90deg, rgba(24, 144, 255, 0) 0, $accentColor);
    transform: translateX(-100%);
    animation: pageLine 3s ease-in-out 1.5s infinite;
}

@keyframes pageLine {
    0%, 25% {
        transform: translateX(-100%);
    }

    75%, 100% {
        transform: translateX(600%);
    }
}
</style>
