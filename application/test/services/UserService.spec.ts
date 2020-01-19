import { expect } from 'chai';
import 'mocha';

import { instance, mock, verify, when, reset, resetCalls } from 'ts-mockito/lib/ts-mockito';
import UserRepository from '../../repositories/UserRepository';
import UserService from '../../services/UserService';
import UsersTestBuildrer from '../testutils/UsersTestBuildrer';
import { Pagination } from '../../shared/models/pagination';
import { exec } from 'child_process';

describe('UserService', () => {

	let serviceUnderTest: UserService;
	let userRepository: UserRepository;

	const testId = '0d4849e6-e855-4c7e-8792-8bd338338ec3';
	const testUserList = UsersTestBuildrer.getListOfDefaultUsers(5);
	const testUserWithId = UsersTestBuildrer.newUser().withDefaultValues().withId(testId).build();
	const testDirectorWithoutId = UsersTestBuildrer.newUser().withDefaultValues().build();

	beforeEach(() => {
		userRepository = mock(UserRepository);
		serviceUnderTest = new UserService(
			instance(userRepository),
		);
	});

	describe('findAll', () => {

		it('should return the 5 dummy users', async () => {
			const response = {
				pagination: new Pagination(),
				records: testUserList
			};
			when(userRepository.findAll(1)).thenReturn(Promise.resolve(response));
			const actual = await serviceUnderTest.findAll(1);
			expect(actual.records).to.include(testUserList[0]);
		});
	});

	describe('findById', () => {

		it('should return the user with given Id if the user exists', async () => {
			when(userRepository.findById(testId)).thenReturn(Promise.resolve(testUserWithId));
			const actual = await serviceUnderTest.findById(testId);
			expect(actual).to.equal(testUserWithId);
		});

	});

	describe('login Succes', () => {

		it('should return token with user', async () => {
			when(userRepository.findByEmail(testUserWithId.Email)).thenReturn(Promise.resolve(testUserWithId));
			const actual = await serviceUnderTest.login(testUserWithId.Email, 'password');
			expect(actual).to.be.a('string');
		});

	});

	describe('login error', () => {
		it('should return message error for password incorrectt', async () => {
			when(userRepository.findByEmail(testUserWithId.Email)).thenReturn(Promise.resolve(testUserWithId));
			try {
				const actual = await serviceUnderTest.login(testUserWithId.Email, 'passwordIncorrect');
				expect(actual).to.be.a('null');
			} catch(e) {
				expect(e.message).to.equal('Password incorrecto');
			}
		});

	});

	describe('login error', () => {
		it('should return message error for email incorrect', async () => {
			when(userRepository.findByEmail(testUserWithId.Email)).thenReturn(Promise.resolve(testUserWithId));
			try {
				const actual = await serviceUnderTest.login('emailFake@gmailt.com', 'password');
				expect(actual).to.be.a('null');
			} catch(e) {
				expect(e.message).to.equal('Usuario incorrecto');
			}
		});

	});

});