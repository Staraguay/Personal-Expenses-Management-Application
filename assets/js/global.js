import { initialize } from "./libs/initializeMockData.js";
import { afterInitEvent } from "./main.js";
window.addEventListener("DOMContentLoaded", async (event) => {

  await initialize();
  window.dispatchEvent(afterInitEvent)


});