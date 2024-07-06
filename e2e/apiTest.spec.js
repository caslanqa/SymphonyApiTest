const { test, expect } = require('@playwright/test');
import testData from '../fixtures/testData.json'


const {
    getRequest,
    verifyStatusCode,
    storePostsCount,
    createPost,
    storeCreatedPostField,
    verifyFields,
    updatePost,
    deletePost} = require('../utilities/utilities');

test("Get all posts", async ()=>{
    const url = `${testData.baseUrl}${testData.endpoint}`;
    const response = await getRequest(url);
    await verifyStatusCode(response,200)
    await storePostsCount(response)
})

test("Create new post", async ()=>{
    const url = `${testData.baseUrl}${testData.endpoint}`;
    const response = await createPost(url,testData.postBody);
    await verifyStatusCode(response,201)
    await storeCreatedPostField(response,"id");
})

test.skip("Get post with id", async ()=>{
    const url = `${testData.baseUrl}${testData.endpoint}`;
    const response = await getRequest(url,[testData.createdPostId]);
    await verifyStatusCode(response,200)
    await verifyFields(response,'title',testData.postBody.title)
    await verifyFields(response,'userId',testData.postBody.userId)
    await verifyFields(response,'body',testData.postBody.userId)
    // const body = await response.json();
    // expect(body.title).toBe("ea molestias quasi exercitationem repellat qui ipsa sit aut");
    // expect(body.body).toBe("et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut");
    // expect(body.userId).toBe(1);
})

test("Update created post", async ()=>{
    const url = `${testData.baseUrl}${testData.endpoint}/3`;
    const response = await updatePost(url,{data:testData.patchBody.title});
    await verifyStatusCode(response,200);
    await verifyFields(response,'title',testData.patchBody.title);
})

test("Delete post", async ()=>{
    const url = `${testData.baseUrl}${testData.endpoint}`;
    let response = await deletePost(url,[testData.createdPostId]);
    await verifyStatusCode(response,200);

    response = await getRequest(url,[testData.createdPostId]);

    await verifyStatusCode(response,404);
})

test("Get all posts after delete", async ()=>{
    const url = `${testData.baseUrl}${testData.endpoint}`;
    const response = await getRequest(url);
    await verifyStatusCode(response,200);
    const body = await response.json();
    expect(body.length).toBe(testData.allPostsCount);
})