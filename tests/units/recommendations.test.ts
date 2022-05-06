import { recommendationService } from "./../../src/services/recommendationsService.js";
import supertest from "supertest";
import app from "../../src/app.js";
import { jest } from "@jest/globals";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";

const agent = supertest(app);

beforeEach(() => {
	jest.clearAllMocks();
	jest.resetAllMocks();
});

describe("GET /recommendations/random", () => {
	it("should answer with throw error - not_found", async () => {
		const random = 0.6;

		jest.spyOn(global.Math, "random").mockReturnValue(random);
		jest.spyOn(recommendationRepository, "findAll").mockResolvedValue([]);

		expect(async () => {
			await recommendationService.getRandom();
		}).rejects.toEqual({
			message: "",
			type: "not_found",
		});
	});

	// it("should call getByScore with parameter 'gt'", async () => {
	// 	const random = 0.6;

	// 	jest.spyOn(global.Math, "random").mockReturnValue(random);
	// 	const findAll = jest
	// 		.spyOn(recommendationRepository, "findAll")
	// 		.mockResolvedValue([]);

	// 	expect(findAll).toBeCalledWith("gt");
	// });
});

// describe("getScoreFilter()", () => {
// 	it("should answer with 'gt'", async () => {
// 		const random = 0.6;

// 		const getScore = recommendationService.getScoreFilter(random);

// 		expect(getScore).toEqual("gt");
// 	});

// 	it("should answer with 'gt'", async () => {
// 		const random = 0.8;

// 		const getScore = recommendationService.getScoreFilter(random);

// 		expect(getScore).toEqual("lte");
// 	});
// });

describe("POST /down vote", () => {
	it("should answer with throw - not_found", async () => {
		jest.spyOn(recommendationRepository, "find").mockResolvedValue(null);

		expect(async () => {
			await recommendationService.downvote(3);
		}).rejects.toEqual({
			message: "",
			type: "not_found",
		});
	});

	it("should called function remove recommendation", async () => {
		const recommendation = {
			id: 434,
			name: "Jasen",
			youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
			score: -6,
		};

		jest.spyOn(recommendationRepository, "find").mockResolvedValue(recommendation);
		jest.spyOn(recommendationRepository, "updateScore").mockResolvedValue(null);

		const remove = jest
			.spyOn(recommendationRepository, "remove")
			.mockResolvedValue(null);

		await recommendationService.downvote(434);

		expect(remove).toBeCalled();
	});
});

describe("POST /down vote", () => {
	it("should answer with throw - not_found", async () => {
		jest.spyOn(recommendationRepository, "find").mockResolvedValue(null);

		expect(async () => {
			await recommendationService.upvote(3);
		}).rejects.toEqual({
			message: "",
			type: "not_found",
		});
	});
});
