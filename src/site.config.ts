// Site-wide toggles.
//
// SHOW_ESSAYS controls whether the Essays nav link, the homepage "Writing"
// teaser, and the /essays routes are active at all. Flip this to `true`
// once there's real essay content ready to publish, then redeploy.
//
// Individual essays also have their own `published` field in the CMS, so
// you can keep drafting essays with SHOW_ESSAYS on and they won't go live
// until you flip `published: true` on that essay specifically.
export const SHOW_ESSAYS = false;
