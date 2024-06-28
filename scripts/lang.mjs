import { $ } from "bun";
const res = await $`xkblayout-state print "%s"`.text();

const map = {
  "us":"\uDBB9\uDCE6",
  "ru":"\uDBB9\uDCEC",
}

const flag = map[res] || "unknown code"

console.log(flag)
