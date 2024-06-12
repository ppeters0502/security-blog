import { DynamoResponseMetadata } from "./DynamoResponseMetadata";
import { DynamoSingleComment } from "./DynamoSingleComment";

export interface DynamoResponse {
    Count: number;
    ScannedCount: number;
    $metadata: DynamoResponseMetadata;
    Items: DynamoSingleComment[];
}