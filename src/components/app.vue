<template>
  <f7-app v-bind="f7params">

    <!-- Left panel with cover effect-->
    <f7-panel left cover>
      <f7-navbar title="Chat"></f7-navbar>
      <f7-list menu-list strong-ios outline-ios>
        <f7-list-item link="/home" title="Home" :selected="selected === 'home'" @click="() => (selected = 'home')">
          <template #media>
            <f7-icon md="material:home" ios="f7:house_fill" />
          </template>
        </f7-list-item>
        <f7-list-item link="/profile" title="Profile" :selected="selected === 'profile'"
          @click="() => (selected = 'profile')">
          <template #media>
            <f7-icon md="material:person" ios="f7:person_fill" />
          </template>
        </f7-list-item>
        <f7-list-item link="/settings/" title="Settings" :selected="selected === 'settings'"
          @click="() => (selected = 'settings')">
          <template #media>
            <f7-icon md="material:settings" ios="f7:gear_alt_fill" />
          </template>
        </f7-list-item>
        <f7-list-item link="/logout" title="Logout" :selected="selected === 'logout'"
          @click="() => (selected = 'logout')">
          <template #media>
            <f7-icon md="material:logout" ios="f7:arrow_right_square_fill" />
          </template>
        </f7-list-item>
      </f7-list>
    </f7-panel>

    <!-- Your main view, should have "view-main" class -->
    <f7-view main class="safe-areas" url="/"></f7-view>


    <!-- Popup -->
    <f7-popup id="my-popup">
      <f7-view>
        <f7-page>
          <f7-navbar title="Popup">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>
            <p>Popup content goes here.</p>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <f7-login-screen id="my-login-screen">
      <f7-view>
        <f7-page login-screen>
          <f7-login-screen-title>Login</f7-login-screen-title>
          <f7-list form>
            <f7-list-input type="text" name="username" placeholder="Your username"
              v-model:value="username"></f7-list-input>
            <f7-list-input type="password" name="password" placeholder="Your password"
              v-model:value="password"></f7-list-input>
          </f7-list>
          <f7-list>
            <f7-list-button title="Sign In" @click="alertLoginData"></f7-list-button>
            <f7-block-footer>
              Some text about login information.<br>Click "Sign In" to close Login Screen
            </f7-block-footer>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-login-screen>
  </f7-app>
</template>
<script>
import { ref, onMounted } from 'vue';
import { f7, f7ready } from 'framework7-vue';

import { getDevice } from 'framework7/lite-bundle';
import capacitorApp from '../js/capacitor-app.js';
import routes from '../js/routes.js';
import store from '../js/store';

export default {
  setup() {
    const device = getDevice();
    // Framework7 Parameters
    const f7params = {
      name: 'Chat by Peable', // App name
      theme: 'auto', // Automatic theme detection
      colors: {
        primary: '#00ff56',
      },



      // App store
      store: store,
      // App routes
      routes: routes,

      // Register service worker (only on production build)
      serviceWorker: process.env.NODE_ENV === 'production' ? {
        path: '/service-worker.js',
      } : {},
      // Input settings
      input: {
        scrollIntoViewOnFocus: device.capacitor,
        scrollIntoViewCentered: device.capacitor,
      },
      // Capacitor Statusbar settings
      statusbar: {
        iosOverlaysWebView: true,
        androidOverlaysWebView: false,
      },
    };
    // Login screen data
    const username = ref('');
    const password = ref('');

    const alertLoginData = () => {
      f7.dialog.alert('Username: ' + username.value + '<br>Password: ' + password.value, () => {
        f7.loginScreen.close();
      });
    }
    onMounted(() => {
      f7ready(() => {

        // Init capacitor APIs (see capacitor-app.js)
        if (device.capacitor) {
          capacitorApp.init(f7);
        }
        // Call F7 APIs here
      });
    });

    return {
      f7params,
      username,
      password,
      alertLoginData
    }
  }
}
</script>