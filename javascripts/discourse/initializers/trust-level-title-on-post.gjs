import I18n from "I18n";

import Component from "@glimmer/component";
import { withPluginApi } from "discourse/lib/plugin-api";

function trustLevelTitleOnPost(api) {
  api.addTrackedPostProperties("trust_level");

  api.renderAfterWrapperOutlet(
    "post-meta-data-poster-name", 
    class extends Component {

      get trustLevelTitle() {        
        const trustLevel = this.args.post?.trust_level;
        if (trustLevel === undefined || trustLevel === null) return "";
        
        const titles = {
          0: I18n.t(themePrefix("trust_levels.newuser.title")),
          1: I18n.t(themePrefix("trust_levels.basicuser.title")), 
          2: I18n.t(themePrefix("trust_levels.member.title")),
          3: I18n.t(themePrefix("trust_levels.regular.title")),
          4: I18n.t(themePrefix("trust_levels.leader.title")),
        };
        const titleKey = titles[trustLevel];
        return titleKey ? titleKey : "";
      }

      <template>
        <span class="trust-level">{{this.trustLevelTitle}}</span>
      </template>
    }
  );
}

export default {
  name: "trust-level-title-on-post",
  initialize() {
    withPluginApi((api) => trustLevelTitleOnPost(api));
  }
};