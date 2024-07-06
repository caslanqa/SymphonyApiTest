const { request, expect } = require('@playwright/test');
import testData from '../fixtures/testData.json'


    async function getRequest(baseUrl,pathParams=[]){
        try {
            const url = pathParams.length > 0 ? `${baseUrl}/${pathParams.join('/')}`:baseUrl;
            const requestContext = await request.newContext();
            return await requestContext.get(url);             
        } catch (error) {
            console.log('Error making GET request :',error);
            throw error;
        }
    }

    async function verifyStatusCode(response,expectedStatus){
        try {
            const status = await response.status();
            expect(status).toBe(expectedStatus);
        } catch (error) {
            console.log('Error making GET request :',error);
            throw error;
        }
    }

    async function storePostsCount(response){
        try {
            const body = await response.json();
            testData['allPostsCount'] = await body.length;         
        } catch (error) {
            console.log('Error making GET request :',error);
            throw error;
        }
    }

    async function createPost(baseUrl,requestBody) {
        const requestContext = await request.newContext();
        return await requestContext.post(baseUrl,{data:testData.postBody});
    }

    async function storeCreatedPostField(response,fieldName) {
        try {
            const body = await response.json();
            testData['createdPostId'] = await body[fieldName];
            return testData['createdPostId'];
        } catch (error) {
            console.log('Error making GET request :',error);
            throw error;
        }
    }

    async function verifyFields(response,fieldName,expectedValue) {
        try {
            const body = await response.json();
            expect(body[fieldName]).toBe(expectedValue);
        } catch (error) {
            console.log('Error making GET request :',error);
            throw error;
        }
    }

    async function updatePost(baseUrl,requestBody) {
        const requestContext = await request.newContext();
        return await requestContext.patch(baseUrl,{data:testData.patchBody});
    }

    async function deletePost(baseUrl,pathParams=[]) {
        try {
            const url = pathParams.length > 0 ? `${baseUrl}/${pathParams.join('/')}`:baseUrl;
            const requestContext = await request.newContext();
            return await requestContext.delete(url);
        } catch (error) {
            console.log('Error making GET request :',error);
            throw error;
        }
    }

module.exports = {
    getRequest,
    verifyStatusCode,
    storePostsCount,
    createPost,
    storeCreatedPostField,
    verifyFields,
    updatePost,
    deletePost
};