const { request, expect } = require('@playwright/test');
import testData from '../fixtures/testData.json'

export default class Utilities{

    static testDataMap = new Map();

    static async getRequest(baseUrl,pathParams=[]){
        try {
            const url = pathParams.length > 0 ? `${baseUrl}/${pathParams.join('/')}`:baseUrl;
            const requestContext = await request.newContext();
            return await requestContext.get(url);             
        } catch (error) {
            console.log('Error making GET request :',error);
            throw error;
        }
    }

    static async verifyStatusCode(response,expectedStatus){
        try {
            const status = await response.status();
            expect(status).toBe(expectedStatus);
        } catch (error) {
            console.log('Error on assertion statuses :',error);
            throw error;
        }
    }

    static async storePostsCount(response){
        try {
            const body = await response.json();
            testData['allPostsCount'] = await body.length;         
        } catch (error) {
            console.log('Error on storing post counts :',error);
            throw error;
        }
    }

    static async createPost(baseUrl,requestBody) {
        try {
            const requestContext = await request.newContext();
            return await requestContext.post(baseUrl,{data:requestBody});
        } catch (error) {
            console.log('Error making POST request :',error);
            throw error;            
        }
    }

    static async storeCreatedPostField(response,fieldName) {
        try {
            const body = await response.json();
            this.testDataMap.set(fieldName,await body[fieldName]);
        } catch (error) {
            console.log('Error on reading json :',error);
            throw error;
        }
    }

    static async verifyFields(response,fieldName,expectedValue) {
        try {
            const body = await response.json();
            expect(body[fieldName]).toBe(expectedValue);
        } catch (error) {
            console.log('Error on fieldname assertions :',error);
            throw error;
        }
    }

    static async updatePost(baseUrl,requestBody) {
        const requestContext = await request.newContext();
        return await requestContext.patch(baseUrl,{data:testData.patchBody});
    }

    static async deletePost(baseUrl,pathParams=[]) {
        try {
            const url = pathParams.length > 0 ? `${baseUrl}/${pathParams.join('/')}`:baseUrl;
            const requestContext = await request.newContext();
            return await requestContext.delete(url);
        } catch (error) {
            console.log('Error making DELETE request :',error);
            throw error;
        }
    }

    static async verifyPostsCount(actualLength, expectedLength) {
        expect(actualLength).toBe(expectedLength);
    }
}