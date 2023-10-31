<template>
    <div class="flex flex-center ">
        <history-component/>
    </div>
</template>

<script>
import HistoryComponent from 'components/HistoryComponent.vue';
import { defineComponent } from "vue";

export default defineComponent({
    name:'StudentsPage',
    components:{
        HistoryComponent
    }

})
</script>
