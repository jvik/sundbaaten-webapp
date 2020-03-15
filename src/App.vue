<template>
  <v-app id="app">
    <AppBar />
    <v-snackbar :timeout="0" v-model="updateExists">
      Oppdater til siste versjon
      <v-btn color="green" text @click="refreshApp">Oppdater</v-btn>
      <v-btn color="pink" text @click="updateExists = false">Lukk</v-btn>
    </v-snackbar>
    <Entur />
    <v-row justify="center">
      <v-col cols="auto" md="3">
        <v-btn href="https://jvik.no" text color="deep-purple accent-4">jvik.no</v-btn>
        <v-btn
          href="https://github.com/jvik/sundbaaten-webapp"
          text
          color="deep-purple accent-4"
        >Github repo</v-btn>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import Entur from "./components/Entur";
import AppBar from "./components/AppBar";

export default {
  name: "App",
  components: {
    Entur,
    AppBar
  },
  data() {
    return {
      refreshing: false,
      registration: null,
      updateExists: false
    };
  },
  created() {
    // Listen for swUpdated event and display refresh snackbar as required.
    document.addEventListener("swUpdated", this.showRefreshUI, { once: true });
    // Refresh all open app tabs when a new service worker is installed.
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      this.refreshing = true;
      window.location.reload();
    });
  },
  methods: {
    showRefreshUI(e) {
      // Display a snackbar inviting the user to refresh/reload the app due
      // to an app update being available.
      // The new service worker is installed, but not yet active.
      // Store the ServiceWorkerRegistration instance for later use.
      this.registration = e.detail;
      this.updateExists = true;
    },
    refreshApp() {
      // Protect against missing registration.waiting.
      if (!this.registration || !this.registration.waiting) {
        return;
      }
      this.registration.waiting.postMessage({ type: "SKIP_WAITING" });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  overflow-x: hidden !important;
}
</style>
