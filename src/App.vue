<template>
	<div id="app">
		<span>
			<siteMap v-if="showNav"></siteMap>
			<router-view/>
		</span>
	</div>
</template>
<script>
	import siteMap from '@/components/siteMap.vue'
	import { mapState } from "vuex"
	export default {
		components: {
			siteMap,
		},
		computed: {
			...mapState(["userProfile"]),
			showNav() {
				return Object.keys(this.userProfile).length > 0
			}
		}
	}
</script>

<sytle>
</style>
