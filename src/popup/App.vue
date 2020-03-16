<template>
  <div>
    <template v-if="alreadyAuthenticated">
      <ul>
        <li>ExtensionId: <span>{{ extension.id }}</span></li>
        <li>IP: <span>{{ extension.ip }}</span></li>
        <li>OS: <span>{{ extension.os }}</span></li>
        <li>Navigator: <span>{{ extension.navigator }}</span></li>
      </ul>
    </template>
    <template v-else>
      <input type="email" name="username" v-model="username">
      <input type="password" name="password" v-model="password">
      <button @click="onSubmitClick">Login</button>
      <p>{{ statusMessage }}</p>
    </template>
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

  computed: {
    alreadyAuthenticated () {
      return !!localStorage.getItem('accessToken')
    },
    extension () {
      return JSON.parse(localStorage.getItem('extension'))
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

      localStorage.setItem('accessToken', JSON.stringify(accessToken))
      localStorage.setItem('extension', JSON.stringify(extension))

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

body {
  font-size: 14px;
}

li {
  margin: 1em 0;
}

li span {
  font-weight: bold;
}
</style>
