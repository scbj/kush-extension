<template>
  <div>
    <input type="email" name="username" v-model="username">
    <input type="password" name="password" v-model="password">
    <button @click="onSubmitClick">Login</button>
    <p>{{ statusMessage }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import { ACCOUNT_AUTHENTICATED } from '@/constants'
import message from '@/message'

export default {
  name: 'App',

  data () {
    return {
      statusMessage: '',
      username: 'jock',
      password: 'd6s45AFpJA92ZAo'
    }
  },

  methods: {
    ...mapActions([
      'createExtension',
      'login'
    ]),

    async onSubmitClick () {
      const { accessToken } = await this.login({
        username: this.username,
        password: this.password
      })
      const { extension } = await this.createExtension()
      console.log('🐞: extension', extension)

      if (extension) {
        message.notifyBackground(ACCOUNT_AUTHENTICATED, {
          accessToken,
          extension
        })
      }
    }
  }
}
</script>

<style>
html {
  width: 400px;
  height: 400px;
}
</style>
