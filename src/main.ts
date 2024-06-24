import LinkedList from "./fhf-linkedlist";
import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import fhfLinkedlist from "./fhf-linkedlist.png";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <a href="https://github.com/80mahd08/fhf-linkedList" target="_blank">
      <img src="${fhfLinkedlist}" class="logo" alt="fhf-linkedlist logo" />
    </a>
    <div class="list"></div>
  </div>
`;

const list: LinkedList = new LinkedList();

const divList = document.querySelector(".list");
await list.append(1);
await list.append(2);
await list.append(3);
await list.append(4);
const len = await list.length();
for (let index = 0; index < len; index++) {
	const data = await list.get(index);
	const p = document.createElement("p");
	p.style.color = "white";
	p.innerText = `index => ${index} | data => ${data}`;
	divList?.appendChild(p);
}
await list.freeList();
