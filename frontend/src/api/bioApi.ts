import { supabase } from "../../supabaseClient";

// Types
interface BioItem {
	id: number;
	title: string;
	start: string;
	end: string | null;
	description: string | null;
	completed: boolean;
	item_category: string;
}

export interface BioCategory {
	category: string;
	items: BioItem[];
}

// Function to fetch all bio data
export async function fetchBioData(): Promise<BioCategory[]> {
	const { data: categories, error: categoryError } = await supabase
		.from("bio_category")
		.select("*");

	if (categoryError) {
		throw new Error(`Error fetching categories: ${categoryError.message}`);
	}

	const bioData: BioCategory[] = [];

	for (const category of categories) {
		const { data: items, error: itemError } = await supabase
			.from("bio_item")
			.select("*")
			.eq("item_category", category.category)
			.order("start", { ascending: false });

		if (itemError) {
			throw new Error(
				`Error fetching items for category ${category.category}: ${itemError.message}`,
			);
		}

		bioData.push({
			category: category.category,
			items: items || [],
		});
	}

	return bioData;
}

// Function to fetch bio data for a specific category
export async function fetchBioCategoryData(
	category: string,
): Promise<BioCategory | null> {
	const { data: items, error } = await supabase
		.from("bio_item")
		.select("*")
		.eq("item_category", category)
		.order("start", { ascending: false });

	if (error) {
		throw new Error(
			`Error fetching items for category ${category}: ${error.message}`,
		);
	}

	return {
		category,
		items: items || [],
	};
}
