import I18n from "I18n";
import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "trust-level-title-on-post",
  initialize(container) {
    withPluginApi("0.8.7", trustLevelTitleOnPost);
  },
};

const trustLevelTitleOnPost = (api) => {
  api.includePostAttributes("trust_level");

  api.decorateWidget("poster-name:after", (decorator) => {
    const titles = {
      0: I18n.t(themePrefix("trust_levels.newuser.title")),
      1: I18n.t(themePrefix("trust_levels.basicuser.title")),
      2: I18n.t(themePrefix("trust_levels.member.title")),
      3: I18n.t(themePrefix("trust_levels.regular.title")),
      4: I18n.t(themePrefix("trust_levels.leader.title")),
    };

    let trust_level = decorator.attrs.trust_level;
    let trust_level_title = titles[trust_level];
    return decorator.h("span.trust-level", trust_level_title);
  });
};
