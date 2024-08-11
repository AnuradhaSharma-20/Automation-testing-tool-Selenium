const assert = require('assert');
const sinon = require("sinon")
const logic = require('../../logic');
const database = require('../../database');
const express = require('express');
describe('Logic tests', () => {
    let connectionStub;
    beforeEach(() => {
        // Stubbing the database.connectDB function
        connectionStub = sinon.stub();
        connectionStub.execute = sinon.stub().resolves(); // Stub the execute method to resolve a promise
        // Stubbing database.connectDB to return a stubbed connection object
        sinon.stub(database, 'connectDB').resolves(connectionStub);
    });
    afterEach(() => {
        // Restoring the original function after each test
        sinon.restore();
    });
    it('getUsers should return all users', async () => {
        const fakeResults = [['user1', 'user2']]; // Mocking results from database
        connectionStub.execute.resolves(fakeResults); // Resolve with fakeResults
        const users = await logic.getUsers();
        assert.equal(users.length > 0, true);
    });
    it('getUser should return a user by id', async () => {
        const fakeId = 1;
        //const fakeUser = "Hema"//{ id: fakeId, firstname: 'John', lastname: 'Doe' };
        const userFromDB = "Hema"//{ id: 1, firstname: 'John', lastname: 'Doe' };
        const fakeResults = [[userFromDB]];
        connectionStub.execute.resolves(fakeResults);
        const user = await logic.getUser(fakeId);
        assert.equal(user, userFromDB);
    });
    it('createUser should insert a new user into the database', async () => {
        const fakeUser = {
            firstname: 'Jane',
            lastname: 'Doe',
            nickname: 'J',
            email: 'jane@example.com',
            age: 30,
            phonenumber: '1234567890',
            bio: 'Test bio'
        };
        await logic.createUser(fakeUser);
        // Assert that connection.execute was called with the correct arguments
        sinon.assert.calledOnce(connectionStub.execute);
        sinon.assert.calledWithMatch(connectionStub.execute, sinon.match.string, [
            fakeUser.firstname,
            fakeUser.lastname,
            fakeUser.nickname,
            fakeUser.email,
            fakeUser.age,
            fakeUser.phonenumber,
            fakeUser.bio
        ]);
    });
    it('updateUser should update an existing user in the database', async () => {
        const fakeUser = {
            id: 1,
            firstname: 'Jane',
            lastname: 'Doe',
            nickname: 'J',
            email: 'jane@example.com',
            age: 30,
            phonenumber: '1234567890',
            bio: 'Test bio'
        };
        await logic.updateUser(fakeUser);
        // Assert that connection.execute was called with the correct arguments
        sinon.assert.calledOnce(connectionStub.execute);
        sinon.assert.calledWithMatch(connectionStub.execute, sinon.match.string, [
            fakeUser.firstname,
            fakeUser.lastname,
            fakeUser.nickname,
            fakeUser.email,
            fakeUser.age,
            fakeUser.phonenumber,
            fakeUser.bio,
            fakeUser.id
        ]);
    });
    it('deleteUser should delete a user from the database', async () => {
        const fakeUserId = 1;
        await logic.deleteUser(fakeUserId);
        // Assert that connection.execute was called with the correct arguments
        sinon.assert.calledOnce(connectionStub.execute);
        sinon.assert.calledWithMatch(connectionStub.execute, sinon.match.string, [fakeUserId]);
    });
});









