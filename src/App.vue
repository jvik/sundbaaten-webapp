<template>
  <v-app id="app">
    <v-tooltip top>
      <v-btn
        v-if="updateExists"
        block
        max-height="4em"
        @click="refreshApp"
      >
        Update to latest version
      </v-btn>
      <span>Tooltip</span>
    </v-tooltip>
    <h1>Sundbåten</h1>
    <Entur />
    <v-row>
      <v-col>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              v-on="on"
            >
              <v-icon color="grey lighten-1">mdi-information</v-icon>
            </v-btn>
          </template>
          <Span>refreshing: {{ refreshing }}
            Registration: {{ registration }}
            UpdateExists: {{ updateExists }}</Span>
        </v-tooltip>

      </v-col>
    </v-row>
  </v-app>
</template>

<script>
// import ApolloExample from "./components/ApolloExample.vue";
import Entur from "./components/Entur";

export default {
  name: "App",
  components: {
    // ApolloExample
    Entur
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
  margin-top: 0.5em;
}
</style>
