export const saveToLocalStorage = (key: string, data: any) => {
	try {
		const jsonData = JSON.stringify(data);
		localStorage.setItem(key, jsonData);
	} catch (error) {
		console.error("Error saving to local storage", error);
	}
};

export const loadFromLocalStorage = (key: string) => {
	try {
		const storedData = localStorage.getItem(key);
		if (storedData) {
			return JSON.parse(storedData);
		}
		return null;
	} catch (error) {
		console.error("Error loading from local storage", error);
		return null;
	}
};
