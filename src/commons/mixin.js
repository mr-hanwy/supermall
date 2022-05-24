import BackTop from "components/content/backTop/BackTop";
import {debounce} from "./utils";
import {BACK_TO_TOP_POSITION} from "./constant";

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

export const backToTopMixin = {
  components: {BackTop},
  data() {
    return {
      backToTopBtnIsShow: false,
    }
  },
  methods: {
    backToTopBtnClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    listenerBackToTopButtonShow(currentPositionY) {
      this.backToTopBtnIsShow = currentPositionY > BACK_TO_TOP_POSITION;
    }
  }
}
