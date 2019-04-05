DynamoDB

- download DynamoDB from AWS
- mkdir DynamoDB folder
- aws configure
  -- AWS Access keyID:
  -- AWS Secret Access Key:
  -- Default region name:
  -- Default output format:

// view the list of tables:
aws dynamodb list-tables --endpoint-url http://localhost:8000

    {
      "TableName": "YOUR_TABLE_NAME",
      "KeySchema": [
        {
          "AttributeName": "KEY_COLUMN_NAME", //<<-- primary key for the table
          "KeyType": "HASH"
        }
      ],
      "AttributeDefinitions": [
        {
          "AttributeName": "KEY_COLUMN_NAME",
          "AttributeType": "S"
        }
      ],
      "ProvisionedThroughput": {
        "ReadCapacityUnits": 5,
        "WriteCapacityUnits": 5
      }
    }

// create table on AWS
- aws dynamodb create-table --cli-input-json file://YOUR_FULL_PATH/config/tables/YOUR_JSON_FILE.json --endpoint-url http://localhost:8000

// in config/config.js
module.exports = {
  aws_table_name: 'fruitsTable',
  aws_local_config: {
    region: 'local',
    endpoint: 'http://localhost:8000'
  },
  aws_remote_config: {
    accessKeyId: 'I_REMOVED_THIS_FOR_POSTING',
    secretAccessKey: 'I_REMOVED_THIS_FOR_POSTING',
    region: 'us-east-1',
  }
};
