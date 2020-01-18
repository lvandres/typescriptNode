import { expect } from "chai";
import { Context } from "koa";
import { IRouterContext } from "koa-router";
import "mocha";
import * as sinon from "sinon";
import { anything, capture, instance, mock, verify, when } from "ts-mockito";
import UserController from "../../controllers/UserController";
import User from "../../database/entity/User";
import UserService from "../../services/UserService";
import UsersTestBuildrer from "../testutils/UsersTestBuildrer";
import UserTestBuilder from "../testutils/UsersTestBuildrer";
import { Pagination } from "../../shared/models/pagination";

describe("UserController", () => {

	let controllerUnderTest: UserController;
	let userService: UserService;

	const testId = '0d4849e6-e855-4c7e-8792-8bd338338ec3';
	const userWithId: User = UserTestBuilder.newUser().withDefaultValues().withId(testId).build();
	const userWithoutId: User = UserTestBuilder.newUser().withDefaultValues().build();

	beforeEach(() => {
		userService = mock(UserService);
		controllerUnderTest = new UserController(instance(userService));
	});

	describe("getAllUsers", () => {

		it("puts the users on the body", async () => {
			const users = UserTestBuilder.getListOfDefaultUsers(5);
			const response = {
				pagination: new Pagination(),
				records: users
			};
			when(userService.findAll(1)).thenReturn(Promise.resolve(response));
			const ctx: IRouterContext = {} as IRouterContext;
			ctx.query = { page: 1 };
			await controllerUnderTest.getAll(ctx);

			expect(ctx.body).to.equal(response);
		});
	});

});