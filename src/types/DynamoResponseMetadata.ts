export interface DynamoResponseMetadata {
    httpStatusCode: number;
    requestId: string;
    attempts: number;
    totalRetryDelay: number;
}