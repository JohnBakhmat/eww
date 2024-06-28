import { $ } from "bun";
const res = await $`xkblayout-state print "%s"`.text();

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

console.log(getFlagEmoji(res));
