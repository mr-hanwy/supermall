import {debounce} from "./utils";

export const imageLoadedMixin = {
  data() {
    return {
      imageLoadedListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.imageLoadedListener = () => {
      refresh();
    };
    this.$eventBus.$on('imageLoaded', this.imageLoadedListener);
  }
}
