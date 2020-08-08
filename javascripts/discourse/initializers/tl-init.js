import { withPluginApi } from "discourse/lib/plugin-api";
import { h } from "virtual-dom";
import I18n from "I18n";

export default {
  name: "tl-init",
  initialize(container) {
    withPluginApi("0.8.7", postTlInit);
  },
};

const postTlInit = (api) => {
  api.reopenWidget("poster-name", {
    html(attrs) {
      let model = api._lookupContainer("controller:topic").model;
      let myPost = model.get("postStream.posts").find((x) => x.id === attrs.id);
      let trust_level = myPost.trust_level;
      const contents = this._super(...arguments);
      contents.push(
        h("span.trust-level", I18n.t(themePrefix("tl"), { level: trust_level }))
      );
      return contents;
    },
  });
};
