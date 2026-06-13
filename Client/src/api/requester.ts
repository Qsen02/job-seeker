const host = "http://localhost:3000/";

async function request(method: string, url: string, data?: object) {
	const headers: Record<string, string> = {};

	const options: RequestInit = {
		method: method,
		headers: headers,
		credentials: "include",
	};

	if (data) {
		headers["Content-Type"] = "application/json";
		options.body = JSON.stringify(data);
	}

	try {
		const res = await fetch(url, options);
		if (!res.ok) {
			const err = await res.json();
			if (res.status === 429) {
				throw new Error("Too many requests");
			}
			throw new Error(err.message);
		}
		const data = await res.json();
		return data;
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		} else {
			throw new Error("Error occurd!");
		}
	}
}

export async function get(url: string) {
	return await request("GET", host + url);
}

export async function post(url: string, data: object) {
	return await request("POST", host + url, data);
}

export async function del(url: string) {
	return await request("DELETE", host + url);
}

export async function put(url: string, data: object) {
	return await request("PUT", host + url, data);
}
