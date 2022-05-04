import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database.js";

export function createInsertRecommendationData() {
	return {
		name: faker.name.firstName(),
		youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
	};
}

export async function createRecommendation() {
	const data = createInsertRecommendationData();

	const recommendation = await prisma.recommendation.create({
		data,
	});

	return recommendation;
}
