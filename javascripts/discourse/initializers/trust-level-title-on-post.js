import I18n from "I18n";
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
      const titles = {
        0: I18n.t(themePrefix("trust_levels.newuser.title")),
        1: I18n.t(themePrefix("trust_levels.basicuser.title")),
        2: I18n.t(themePrefix("trust_levels.member.title")),
        3: I18n.t(themePrefix("trust_levels.regular.title")),
        4: I18n.t(themePrefix("trust_levels.leader.title")),
      };
      let model = api._lookupContainer("controller:topic").model;
      let myPost = model.get("postStream.posts").find((x) => x.id === attrs.id);
      let trust_level = myPost.trust_level;
      let trust_level_title = titles[trust_level];
      const contents = this._super(...arguments);
      contents.push(h("span.trust-level", trust_level_title));
      return contents;
    },
  });
};
