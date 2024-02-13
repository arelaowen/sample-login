<template>
    <div>
        <v-snackbar v-model="data.status" centered class="pa-0" color="white">
            <v-alert 
            :type="data.type == undefined ? 'info' : data.type"
            class="mb-0"
            :duration="data.duration == undefined ? 500 : data.duration"
            >
            <span class="text-overline">
                {{data.text == undefined ? '' : data.text}}
            </span>
            </v-alert>
        </v-snackbar>
    </div>
</template>

<script>
export default {
    props: [
        'data'
    ],
}
</script>

<style scoped>
:deep(.v-snack__wrapper){
    display: unset;
}
:deep(.v-snack__content){
    padding: 0;
    height: 100% !important;
}
:deep(.v-alert__wrapper, .v-alert){
    height: 100% !important;
}
:deep(.v-alert__icon.v-icon){
    height: 100% !important;
    font-size: 58px;
}
</style>