import { initialize } from "./libs/initializeMockData.js";
import { afterInitEvent } from "./main.js";
window.addEventListener("DOMContentLoaded", async (event) => {

  initialize();
  window.dispatchEvent(afterInitEvent)


});