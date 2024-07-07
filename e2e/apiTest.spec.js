const { test, expect } = require('@playwright/test');
import testData from '../fixtures/testData.json'
import utils from "../utilities/utilities";

let createdPostId;

test("Get all posts", async ()=>{
    const url = `${testData.baseUrl}${testData.endpoint}`;
    const response = await utils.getRequest(url);
    await utils.verifyStatusCode(response,200)
    await utils.storePostsCount(response)
})

test("Create new post", async ()=>{
    const url = `${testData.baseUrl}${testData.endpoint}`;
    const response = await utils.createPost(url, testData.postBody);
    await utils.verifyStatusCode(response, 201);
    const body = await response.json();
    createdPostId = body.id; // Store the ID of the created post to use in later tests
    await utils.storeCreatedPostField(response, 'id');
})

test.skip("Get post with id", async ()=>{
    const url = `${testData.baseUrl}${testData.endpoint}`;
    const response = await utils.getRequest(url,[testData.createdPostId]);
    await utils.verifyStatusCode(response,200)
    await utils.verifyFields(response,'title',testData.postBody.title)
    await utils.verifyFields(response,'userId',testData.postBody.userId)
    await utils.verifyFields(response,'body',testData.postBody.userId)
})

test("Update created post", async ()=>{
    const url = `${testData.baseUrl}${testData.endpoint}/3`;
    const response = await utils.updatePost(url,{data:testData.patchBody.title});
    await utils.verifyStatusCode(response,200);
    await utils.verifyFields(response,'title',testData.patchBody.title);
})

test("Delete post", async ()=>{
    const url = `${testData.baseUrl}${testData.endpoint}/${createdPostId}`; // Use the stored post ID for deletion
    let response = await utils.deletePost(url);
    await utils.verifyStatusCode(response,200);

    response = await utils.getRequest(url);
    await utils.verifyStatusCode(response,404);
})

test("Get all posts after delete", async ()=>{
    const url = `${testData.baseUrl}${testData.endpoint}`;
    const response = await utils.getRequest(url);
    await utils.verifyStatusCode(response,200);
    const body = await response.json();
    await utils.verifyPostsCount(body.length,testData.allPostsCount);
})