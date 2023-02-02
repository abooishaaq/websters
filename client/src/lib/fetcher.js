import { API_URL } from "@/constants";

export const fetcher = (url) => fetch(`${API_URL}/${url}`).then((res) => res.json());
