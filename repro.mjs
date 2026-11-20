// node --conditions=browser --conditions=development repro.mjs
// Both conditions are needed: without `browser`, solid-js resolves to its server build.
import { action, createRoot, createSignal, flush, mapArray, onCleanup, createRenderEffect } from "solid-js";

function run(label, release) {
  const [rows, setRows] = createSignal([1, 2]);
  createRoot(() => {
    const mapped = mapArray(rows, r => {
      onCleanup(release);
      return r;
    });
    createRenderEffect(mapped, () => {});
  });
  flush();
  setRows([2]);
  try {
    flush();
  } catch (e) {
    console.log(`${label}: flush() threw ${e.message.slice(0, 60)}…`);
  }
}

const [count, setCount] = createSignal(0);
run("write", () => setCount(n => n + 1)); // allowed since #4165
flush();
console.log("write:  count =", count());

const [acted, setActed] = createSignal(0);
const release = action(function* () {
  yield Promise.resolve(); // e.g. tell the server
  setActed(n => n + 1);
});
run("action", () => void release());
await new Promise(r => setTimeout(r, 0));
flush();
console.log("action: acted =", acted());
