import { withPluginApi } from "discourse/lib/plugin-api";
import { h } from "virtual-dom";

export default {
  name: "trust-level-title-on-post",
  initialize(container) {
    withPluginApi("0.8.7", trustLevelTitleOnPost);
  },
};

const trustLevelTitleOnPost = (api) => {
  api.reopenWidget("poster-name", {
    html(attrs) {
      let titles = new Map([
        [0, "new user"],
        [1, "basic user"],
        [2, "member"],
        [3, "regular"],
        [4, "leader"],
      ]);
      let model = api._lookupContainer("controller:topic").model;
      let myPost = model.get("postStream.posts").find((x) => x.id === attrs.id);
      let trust_level = myPost.trust_level;
      let trust_level_title = titles.get(trust_level);
      const contents = this._super(...arguments);
      contents.push(h("span.trust-level", trust_level_title));
      return contents;
    },
  });
};
