<template>
    <div>
        <v-toolbar>
            <v-spacer></v-spacer>
            <v-btn class="blue darken-4" dark @click="logout()">Logout</v-btn>
        </v-toolbar>
        <v-container>
            <v-app>
            <v-sheet width="50%" class="ma-auto">
                <span class="font-wegiht-bold text-h4">Welcome, {{this.$session.get('user')?.firstName}} !</span>
            </v-sheet>
        </v-app>
        </v-container>
    </div>
</template>

<script>
export default {
    methods: {
        async logout(){
            try{
                await this.$axios({
                    method: 'post',
                    url:"/unsetToken",
                    data: {
                        token: this.$session.get('token')
                    }
                }).then(response => {
                    if(response.data){
                        this.$session.destroy();
                        setTimeout(() => {
                            this.$router.push({path: '/'}).catch(()=>{})
                        }, 100);
                    }
                })
            }catch(err){}
        }
    }
}
</script>