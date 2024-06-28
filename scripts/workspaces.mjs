import { $ } from "bun";

const query =
  await $`i3-msg -t get_workspaces | jq '[.[] | {visible, focused, name, urgent, open:true}]'`.text();

/**
 * @typedef {object} Workspace
 * @property {string} name
 * @property {bool} visible
 * @property {bool} open
 * @property {bool} urgent
 * @property {bool} focused
 */

/** @type {Array<Workspace>} */
const json = JSON.parse(query);
const ids = json.map((x) => x.name);

/** @type {Array<Workspace>} */
const array = new Array(10)
  .fill({
    visible: false,
    focused: false,
    name: "0",
    urgent: false,
    open: false,
  })
  .map((x, i) => {
    if (ids.includes(`${i + 1}`)) {
      return json.find((x) => x.name === `${i + 1}`);
    } else {
      return {
        ...x,
        name: `${i + 1}`,
      };
    }
  });

//(button :onclick "i3-msg workspace 1" (box :class "active" 1))

const result = array
  .map((x) => {
    let classStr = "closed";
    if (x.open) {
      classStr = "inactive";
    }
    if (x.visible) {
      classStr = "active";
    }
    if (x.urgent) {
      classStr = "urgent";
    }

    return `(button :onclick "i3-msg workspace ${x.name}" (box :class "${classStr}" ${x.name}))`;
  })
  .join("\n");
console.log(`(box :class "workspaces box" :orientation "h" :space-evenly true :halign "start" :spacing 5 ${result})`);
