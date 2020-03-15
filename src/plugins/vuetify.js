import Vue from "vue";
import Vuetify from "vuetify/lib";
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

Vue.use(Vuetify);

const mq = window.matchMedia('(prefers-color-scheme: dark)')

export default new Vuetify({
    icons: {
    iconfont: 'mdiSvg'
		},
		theme: { dark: mq.matches, themes: {
			light: {
				primary: '#4caf50',
				secondary: '#cddc39',
				accent: '#ffeb3b',
				error: '#f44336',
				warning: '#ff9800',
				info: '#607d8b',
				success: '#8bc34a'
			},
			dark: {
				primary: '#4caf50',
				secondary: '#cddc39',
				accent: '#ffeb3b',
				error: '#f44336',
				warning: '#ff9800',
				info: '#607d8b',
				success: '#8bc34a'
			}
		}
	}
});

mq.addEventListener('change', (e) => {
  Vuetify.framework.theme.dark = e.matches
})