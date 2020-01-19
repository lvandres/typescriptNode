import { expect } from "chai";
import { Context, Request } from "koa";
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

	interface ICustomRequest extends Request {
		body: object;
		header: object;
	}
	interface ICustomRouterContext extends IRouterContext {
		request: ICustomRequest
	}

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


	describe("login user", () => {
		const body = { email: userWithId.Email, password: "password" };
		const response = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliMzFkY2ZhLTA2MmMtNDI5My1hMGZhLWQxNzBhODMzNzI2YiIsIm5hbWUiOiJ0ZXN0IiwibGFzdE5hbWUiOiJ0ZXN0IGxhc3QgbmFtZSIsInJvbGUiOjIsImlhdCI6MTU3OTMxOTQxNywiZXhwIjoxNTc5NDA1ODE3fQ.6jz3rZGC_VTLl87YiS-zlXDVkAW8pQCxBVpuPWuv3Pk';

		it("puts the token on the header", async () => {
			when(userService.login(body.email, body.password)).thenReturn(Promise.resolve(response));
			const ctx: ICustomRouterContext = {
				request: { body },
				throw: () => null,
				header: Object,
				set: (key: string, value: string) => { ctx.header[key]= value; }
			} as ICustomRouterContext;
			await controllerUnderTest.login(ctx);
			expect(ctx.header['x-token']).to.equal(response);
		});
	});

});