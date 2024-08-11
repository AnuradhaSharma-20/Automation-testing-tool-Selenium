let setupmodule ;
let expect;
let createUserTest,viewAllUsersTest,editUserTest,deleteUserTest;
before(async function() {
    const chaiModule = await import('chai');
    expect = chaiModule.expect;
    setupmodule = await import('../../setup.js');
    createUserTest = setupmodule.createUserTest;
    viewAllUsersTest = setupmodule.viewAllUsersTest;
    editUserTest = setupmodule.editUserTest;
    deleteUserTest = setupmodule.deleteUserTest;
  });
describe('E2E Test', function () {
    this.timeout(30000); // Optional: Set timeout to 30 seconds
    it('should create a user successfully', async function () {
        const results = await createUserTest();
        console.log(results);
        expect(results).to.equal('Create user test passed!',results);
    });
});
describe('E2E Test', function () {
    this.timeout(30000); // Optional: Set timeout to 30 seconds
    it('should view all users successfully', async function () {
        const results = await viewAllUsersTest();
        expect(results).to.equal('View all users test passed!',results);
    });
});
describe('E2E Test', function () {
    this.timeout(30000); // Optional: Set timeout to 30 seconds
    it('should edit a user successfully', async function () {
        const results = await editUserTest(26);
        expect(results).to.equal('Edit user test passed!',results);
    });
});
describe('E2E Test', function () {
    this.timeout(30000); // Optional: Set timeout to 30 seconds
    it('should delete a user successfully', async function () {
        const results = await deleteUserTest(51);
        expect(results).to.equal('Delete user test passed!',results);
    });
});
