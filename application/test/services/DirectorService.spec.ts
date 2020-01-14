import { expect } from "chai";
import "mocha";

import { instance, mock, verify, when } from "ts-mockito/lib/ts-mockito";
import Director from "../../database/entity/Director";
import DirectorRepository from "../../repositories/DirectorRepository";
import DirectorService from "../../services/DirectorService";
import DirectorTestBuilder from "../testutils/DirectorTestBuilder";
import { Pagination } from "../../shared/models/pagination";

describe("DirectorService", () => {

    let serviceUnderTest: DirectorService;
    let directorRepository: DirectorRepository;

    const testId = '912e99b4-3e7a-4894-aaef-793312094fff';
    const testDirectorList = DirectorTestBuilder.getListOfDefaultDirectors(5);
    const testDirectorWithId = DirectorTestBuilder.newDirector().withDefaultValues().withId(testId).build();
    const testDirectorWithoutId = DirectorTestBuilder.newDirector().withDefaultValues().build();

    beforeEach(() => {
        directorRepository = mock(DirectorRepository);
        serviceUnderTest = new DirectorService(
            instance(directorRepository),
        );
    });

    describe("findAll", () => {

        it("should return the 5 dummy directors", async () => {
            const response = {
                pagination: new Pagination(),
                records: testDirectorList
            };
            when(directorRepository.findAll(1)).thenReturn(Promise.resolve(response));
            const actual = await serviceUnderTest.findAll(1);
            expect(actual.records).to.include(testDirectorList[0]);
        });
    });

    describe("findById", () => {

        it("should return the director with given Id if the director exists", async () => {
            when(directorRepository.findById(testId)).thenReturn(Promise.resolve(testDirectorWithId));
            const actual = await serviceUnderTest.findById(testId);
            expect(actual).to.equal(testDirectorWithId);
        });

    });

});