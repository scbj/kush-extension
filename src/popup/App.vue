<template>
  <div>
    <input type="email" name="email">
    <input type="password" name="password">
    <button @click="login">Login</button>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import message from '@/message'

export default {
  name: 'App',

  data () {
    return {
      message: ''
    }
  },

  methods: {
    login () {
      this.message = browser.i18n.getMessage('"popupConfirmation"')
      message.notifyBackground('account:authenticated', {
        accessToken: 'zefoefpejzfoezfoazdzajdoiazdaizuoidzaidoh'
      })
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
