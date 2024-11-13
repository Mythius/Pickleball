import PromptBox from "./components/PromptBox/PromptBox";
import { createRoot } from "react-dom/client";

const createPromptBox = function (name, confirm = "") {
  return new Promise((res, rej) => {
    function onSubmit(data) {
      res(data);
      c.remove();
    }
    let t = (
      <PromptBox label={name} confirmText={confirm} callback={onSubmit} />
    );
    let c = document.createElement("container");
    document.body.appendChild(c);
    createRoot(c).render(t);
  });
};

export { createPromptBox };
