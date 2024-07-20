<template>
    <div
        class="loader"
        :class="{ fixed: fixed }"
    >
        <span></span>
    </div>
</template> 

<script setup lang="ts">

interface Props {
    fixed?: boolean
}

defineProps<Props>()
</script>

<styles lang="scss">

</styles>