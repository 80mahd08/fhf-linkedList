const wasmPath: string = "/wasm/main.wasm?url" as string;
export default class LinkedList {
	static head: any = null;
	static memory: WebAssembly.Memory = new WebAssembly.Memory({
		initial: 250,
		maximum: 560,
	});
	static exports: any = null;

	static async init(): Promise<void> {
		const resp: Response = await fetch(wasmPath);
		const res: WebAssembly.WebAssemblyInstantiatedSource =
			await WebAssembly.instantiateStreaming(resp, {
				js: {
					mem: LinkedList.memory,
				},
				env: {
					emscripten_resize_heap: LinkedList.memory.grow,
					print_int: (i: number) => {
						console.log(i);
					},
				},
			});
		LinkedList.exports = res.instance.exports;
		LinkedList.memory = LinkedList.exports.memory;
	}

	async display(): Promise<void> {
		await LinkedList.initIfNeeded();
		LinkedList.exports.display(LinkedList.head);
	}

	async append(data: number): Promise<void> {
		await LinkedList.initIfNeeded();
		LinkedList.exports.append(LinkedList.head, data);
	}

	async push(data: number): Promise<void> {
		await LinkedList.initIfNeeded();
		LinkedList.head = LinkedList.exports.push(LinkedList.head, data);
	}

	async length(): Promise<number> {
		await LinkedList.initIfNeeded();
		return LinkedList.exports.length(LinkedList.head);
	}

	async reverse(): Promise<void> {
		await LinkedList.initIfNeeded();
		LinkedList.head = LinkedList.exports.reverse(LinkedList.head);
	}

	async freeList(): Promise<void> {
		await LinkedList.initIfNeeded();
		LinkedList.exports.freeList(LinkedList.head);
		LinkedList.head = null;
	}

	async get(index: number): Promise<any> {
		await LinkedList.initIfNeeded();
		return LinkedList.exports.get(LinkedList.head, index);
	}

	async deleteNode(index: number): Promise<void> {
		await LinkedList.initIfNeeded();
		LinkedList.exports.deleteNode(LinkedList.head, index);
	}

	async insert(index: number, data: number): Promise<void> {
		await LinkedList.initIfNeeded();
		LinkedList.exports.insert(LinkedList.head, index, data);
	}

	async toArray(): Promise<any[]> {
		await LinkedList.initIfNeeded();
		const out: any[] = [];
		const len: number = await this.length();
		for (let i = 0; i < len; i++) {
			out.push(await this.get(i));
		}
		return out;
	}

	static async initIfNeeded(): Promise<void> {
		if (!LinkedList.exports) {
			await LinkedList.init();
		}
	}
}
