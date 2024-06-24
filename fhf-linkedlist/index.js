import wasmPath from "/wasm/main.wasm?url";
export default class LinkedList {
	static head = null;
	static memory = new WebAssembly.Memory({
		initial: 250,
		maximum: 560,
	});
	static exports = null;

	static async init() {
		const resp = await fetch(wasmPath);
		const res = await WebAssembly.instantiateStreaming(resp, {
			js: {
				mem: LinkedList.memory,
			},
			env: {
				emscripten_resize_heap: LinkedList.memory.grow,
				print_int: (i) => {
					console.log(i);
				},
			},
		});
		LinkedList.exports = res.instance.exports;
		LinkedList.memory = LinkedList.exports.memory;
	}
	async display() {
		await LinkedList.initIfNeeded();
		LinkedList.exports.display(LinkedList.head);
	}

	async append(data) {
		await LinkedList.initIfNeeded();
		LinkedList.exports.append(LinkedList.head, data);
	}

	async push(data) {
		await LinkedList.initIfNeeded();
		LinkedList.head = LinkedList.exports.push(LinkedList.head, data);
	}

	async length() {
		await LinkedList.initIfNeeded();
		return LinkedList.exports.length(LinkedList.head);
	}

	async reverse() {
		await LinkedList.initIfNeeded();
		LinkedList.head = LinkedList.exports.reverse(LinkedList.head);
	}

	async freeList() {
		await LinkedList.initIfNeeded();
		LinkedList.exports.freeList(LinkedList.head);
		LinkedList.head = null;
	}

	async get(index) {
		await LinkedList.initIfNeeded();
		return LinkedList.exports.get(LinkedList.head, index);
	}

	async deleteNode(index) {
		await LinkedList.initIfNeeded();
		LinkedList.exports.deleteNode(LinkedList.head, index);
	}

	async insert(index, data) {
		await LinkedList.initIfNeeded();
		LinkedList.exports.insert(LinkedList.head, index, data);
	}

	async toArray() {
		await LinkedList.initIfNeeded();
		const out = [];
		const len = await this.length();
		for (let i = 0; i < len; i++) {
			out.push(await this.get(i));
		}
		return out;
	}

	static async initIfNeeded() {
		if (!LinkedList.exports) {
			await LinkedList.init();
		}
	}
}
