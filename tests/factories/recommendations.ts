import { Recommendation } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database.js";

export function recommendationData(score: number): Recommendation {
	return {
		id: 434,
		name: "Jasen",
		youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
		score,
	};
}

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
