import axios from "axios";

const BASE_URL = "https://api.artic.edu/api/v1/artworks";

export const fetchArtworks = async () => {
	try {
		const response = await axios.get(`${BASE_URL}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching artworks:", error);
		return null;
	}
};

export const fetchArtworksSearch = async (query: string) => {
	try {
		const response = await fetch(
			`https://api.artic.edu/api/v1/artworks/search?q=${query}&limit=20&fields=id,title,image_id,thumbnail`
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching artworks:", error);
		return null;
	}
};
