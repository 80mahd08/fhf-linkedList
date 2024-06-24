import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import fhfLinkedlist from "./fhf-linkedlist.png";
import LinkedList from "./fhf-linkedlist";

document.querySelector("#app").innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <a href="https://github.com/80mahd08/fhf-linkedList" target="_blank">
      <img src="${fhfLinkedlist}" class="logo" alt="fhf-linkedlist logo" />
    </a>
    <div class="list"></div>
  </div>
`;

const list = new LinkedList();
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
	divList.appendChild(p);
}

await list.freeList();
