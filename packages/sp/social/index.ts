import { ISocial, Social } from "./types.js";
import { SPRest } from "../rest.js";

export {
    IMySocial,
    ISocial,
    IMySocialData,
    ISocialActor,
    ISocialActorInfo,
    MySocial,
    Social,
    SocialActorType,
    SocialActorTypes,
    SocialFollowResult,
    SocialStatusCode,
} from "./types.js";

declare module "../rest" {
    interface SPRest {
    /**
     * Access to the social instance which allows you to track followed sites, people and docs.
     */
        readonly social: ISocial;
    }
}

Reflect.defineProperty(SPRest.prototype, "social", {
    configurable: true,
    enumerable: true,
    get: function (this: SPRest) {
        return this.childConfigHook(({ options, baseUrl, runtime }) => {
            return Social(baseUrl).configure(options).setRuntime(runtime);
        });
    },
});
