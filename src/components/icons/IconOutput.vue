<script>
import * as CustomIcon from './index'
import { h } from 'vue'
const icons = Object.assign({}, CustomIcon)
export default {
	props: {
		iconName: {
			type: String,
			default: ''
		},
		style: {
			type: Object,
			default: () => ({})
		}
	},

	render() {
		return h(icons[this.iconName], {
			style: this.style
		})
	}
}
</script>
