export default class LinkedList {
	static head = null;
	static memory = new WebAssembly.Memory({
		initial: 250,
		maximum: 560,
	});
	static exports = null;

	constructor(data) {
		LinkedList.init(); // Call initialization method automatically
		if (data) {
			for (let i = 0; i < data.length; i++) {
				LinkedList.exports.append(LinkedList.head, data[i]);
			}
		}
	}

	static async init() {
		const modulePath = new URL(
			"public/wasm/main.wasm",
			document.baseURI
		).toString();
		console.log(modulePath);
		const resp = await fetch(modulePath);
		console.log(resp);
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
	display() {
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

	// Other methods go here...

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

	static async initIfNeeded() {
		if (!LinkedList.exports) {
			await LinkedList.init();
		}
	}
}
