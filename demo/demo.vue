<template>
    <div>
        <rangepicker :start-date.sync="startDate" :end-date.sync="endDate"></rangepicker>
    </div>
</template>

<script>
    import rangepicker from '../dist/rangepicker.js'
    export default {
        data() {
            return {
                startDate: '',
                endDate: '',
            }
        },
        components: { rangepicker }
    }
</script>
