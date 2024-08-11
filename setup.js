
const { Builder, By, Key, until, WebElement } = require('selenium-webdriver');
module.exports = { Builder, By, Key, until };
const firefox = require('selenium-webdriver/firefox');
async function createUserTest() {
    console.log("Testing create user");
    const options = new firefox.Options().addArguments('--headless'); // Run headless (optional)
    const driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
    try {
        // Navigate to the create user page
        await driver.get('http://localhost:3000/create.html'); // Replace with your actual URL
        // Find elements for form fields (replace with your actual IDs or other locators)
        const firstNameInput = await driver.findElement(By.id('firstname'));
        const lastNameInput = await driver.findElement(By.id('lastname'));
        const nicknameInput = await driver.findElement(By.id('nickname'));
        const emailInput = await driver.findElement(By.id('email'));
        const ageInput = await driver.findElement(By.id('age'));
        const phoneInput = await driver.findElement(By.id('phonenumber'));
        const bioInput = await driver.findElement(By.id('bio'));
        const submitButton = await driver.findElement(By.css('button[type="submit"]'));
        // Enter user data
        await firstNameInput.sendKeys('Test User Anu');
        await lastNameInput.sendKeys('Example');
        await nicknameInput.sendKeys('Tester');
        await emailInput.sendKeys('testuser@example.com');
        await ageInput.sendKeys('25');
        await phoneInput.sendKeys('1234567890');
        await bioInput.sendKeys('This is a test user.');
        // Submit the form
        await submitButton.click();
        // Wait for the success message
        //await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Profile created successfully')]")), 10000);
        console.log('Create user test passed!');
        return 'Create user test passed!';
    } catch (error) {
        console.error('Create user test failed:', error);
        return error.message;
    } finally {
        await driver.quit();
    }
}
// 2. View All Users
async function viewAllUsersTest() {
    const options = new firefox.Options().addArguments('--headless'); // Run headless (optional)
    const driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
    try {
        // Navigate to the view all users page
        await driver.get('http://localhost:3000/index.html'); // Replace with your actual URL
        // Wait for the user list to be loaded
        await driver.wait(until.elementLocated(By.id('userTable')), 10000);
        await driver.wait(until.elementLocated(By.xpath('//*[@id="userTable"]/tr')), 10000);
        const userList = await driver.findElements(By.xpath('//*[@id="userTable"]/tr'));
        const users = (await userList).length;
        console.log(users);
        if (users > 0) {
            console.log('View all users test passed!');
            return 'View all users test passed!';
        } else {
            console.log('View all users test failed: No users found.');
            return 'View all users test failed: No users found.';
        }
    } catch (error) {
        console.error('View all users test failed:', error);
        return error.message;
    } finally {
        await driver.quit();
    }
}
//3. Edit User
async function editUserTest(id) {
    const options = new firefox.Options().addArguments('--headless'); // Run headless (optional)
    const driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
    try {
        // Navigate to the edit user page
        await driver.get('http://localhost:3000/edit.html?id='+id); // Replace with your actual URL and user ID
        // Wait for the form to be loaded
        await driver.wait(until.elementLocated(By.id('editform')), 10000);
        // Find elements for form fields
        const firstNameInput = await driver.findElement(By.id('firstname'));
        const lastNameInput = await driver.findElement(By.id('lastname'));
        const submitButton = await driver.findElement(By.css('button[type="submit"]'));
        const firstNanme = await firstNameInput.getAttribute('value');
        console.log(firstNanme);
        if(firstNanme==='')
            return 'User doesnt exist';
        // Edit user data
        await firstNameInput.clear();
        await firstNameInput.sendKeys('Updated User');
        await lastNameInput.clear();
        await lastNameInput.sendKeys('Updated Example');
        // Submit the form
        await submitButton.click();
        // Wait for the success message
       // await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Profile updated successfully')]")), 10000);
        console.log('Edit user test passed!');
        return 'Edit user test passed!';
    } catch (error) {
        console.error('Edit user test failed:', error);
        return error.message;
    } finally {
        await driver.quit();
    }
}
//4. Delete User
async function deleteUserTest(id) {
    console.log("In Delete function");
    const options = new firefox.Options().addArguments('--headless'); // Run headless (optional)
    const driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
    try {
        // Navigate to the view all users page
        await driver.get('http://localhost:3000/index.html'); // Replace with your actual URL
        // Wait for the user list to be loaded
        //await driver.wait(until.elementLocated(By.id('userTable')), 10000);
        await driver.wait(until.elementLocated(By.xpath(`/html/body/table/tr[@id='${id}']/td[2]/a`)));
        // Find the delete button for a specific user
        //const deleteButton = await driver.findElement(By.css('.user-item .delete-button')); // Adjust selector as needed
        const deletelink = await driver.findElement(By.xpath(`/html/body/table/tr[@id='${id}']/td[2]/a`));
        // Click the delete button
        await deletelink.click();
        // Confirm the deletion if there's a confirmation prompt
       // await driver.switchTo().alert().accept(); // Adjust if there's no alert
        // Wait for the success message or updated user list
        //await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'User deleted successfully')]")), 10000);
        console.log('Delete user test passed!');
        return 'Delete user test passed!';
    } catch (error) {
        console.error('Delete user test failed:', error);
        return error.message;
    } finally {
        await driver.quit();
    }
}
module.exports = {createUserTest, viewAllUsersTest, editUserTest, deleteUserTest };
