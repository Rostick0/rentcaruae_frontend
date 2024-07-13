
<template>
    <div class='card' style="height: 100%;">
        <div
            class="card__body"
            style="height: 100%;"
            :class='[`card-padding-${padding}`]'
        >
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    padding?: "0" | "1" | "2" | "3" | "4" | "5"
}
defineProps<Props>()
</script>

<style lang="scss" >

</style>

