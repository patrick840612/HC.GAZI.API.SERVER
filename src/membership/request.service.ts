import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { randomBytes } from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class RequestService {
    private static readonly TIME_OUT = 5000;
    private static readonly API_KEY = '{1ac0895868d6e44ffa76cc4ca043a842277eee9d897421c34dffbe2aef224583}';
    private static readonly PPURIO_ACCOUNT = '{hcpr1234}';
    private static readonly FROM = '{07071635757}';
    private static readonly FILE_PATH = '{MMS 발송인 경우 첨부할 이미지 경로}';
    private static readonly URI = 'https://message.ppurio.com';

    public async requestSend(): Promise<void> {
        const basicAuthorization = Buffer.from(`${RequestService.PPURIO_ACCOUNT}:${RequestService.API_KEY}`).toString('base64');

        const tokenResponse = await this.getToken(RequestService.URI, basicAuthorization);
        const sendResponse = await this.send(RequestService.URI, tokenResponse.token);

        console.log(sendResponse);
    }

    public async requestCancel(): Promise<void> {
        const basicAuthorization = Buffer.from(`${RequestService.PPURIO_ACCOUNT}:${RequestService.API_KEY}`).toString('base64');

        const tokenResponse = await this.getToken(RequestService.URI, basicAuthorization);
        const cancelResponse = await this.cancel(RequestService.URI, tokenResponse.token);

        console.log(cancelResponse);
    }

    private async getToken(baseUri: string, basicAuthorization: string): Promise<{ token: string }> {
        try {
            const response = await axios.post(`${baseUri}/v1/token`, null, {
                headers: {
                    Authorization: `Basic ${basicAuthorization}`,
                    'Content-Type': 'application/json',  // 이 부분이 추가되었습니다.
                },
            });

            return response.data;
        } catch (error) {
            throw new Error('API 요청과 응답 실패');
        }
    }

    private async send(baseUri: string, accessToken: string): Promise<any> {
        try {
            const bearerAuthorization = `Bearer ${accessToken}`;
            const response = await axios.post(`${baseUri}/v1/message`, this.createSendTestParams(), {
                headers: {
                    Authorization: bearerAuthorization,
                    'Content-Type': 'application/json',
                },
            });

            return response.data;
        } catch (error) {
            throw new Error('API 요청과 응답 실패');
        }
    }

    private async cancel(baseUri: string, accessToken: string): Promise<any> {
        try {
            const token = `Bearer ${accessToken}`;
            const response = await axios.post(`${baseUri}/v1/cancel`, this.createCancelTestParams(), {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            });

            return response.data;
        } catch (error) {
            throw new Error('API 요청과 응답 실패');
        }
    }

    createSendTestParams(): any {
        const params = {
            account: RequestService.PPURIO_ACCOUNT,
            messageType: 'MMS',
            from: RequestService.FROM,
            content: '[*이름*], hello this is [*1*]',
            duplicateFlag: 'Y',
            targetCount: 1,
            targets: [
                {
                    to: '01047113012',
                    name: 'tester',
                    changeWord: {
                        var1: 'ppurio api world',
                    },
                },
            ],
            refKey: randomBytes(16).toString('hex'), // refKey 생성, 32자 이내로 아무 값이든 상관 없음
        };
        return params;
    }

    private createCancelTestParams(): any {
        // Java 코드에는 제공되지 않은 메서드이므로 요구 사항에 따라 이 메서드를 구현해야합니다.
    }
}