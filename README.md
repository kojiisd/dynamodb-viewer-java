# DynamoDB Viewer
This is for DynamoDB viewer. You can see DynamoDB contents.

# Preparation
You can arrange ```application.yml``` file for your own URL. Default value is below(us-east-1).

```application.yml
amazon:
  dynamodb:
    endpoint: https://dynamodb.us-east-1.amazonaws.com
```

As precondition, this applicaiton will work on a machine which has AWS configuration of AWS CLI.

# Build
Firstly to get a jar file type mvn command.

```
$ mvn clean package
```

# Execution
Type below command after creating jar file with maven command at project root folder.

```
$ java -jar target/dynamodb-view-0.0.1-SNAPSHOT.jar
```
If you want to access to DynamoDB with not default host and port, you can type below.

```
$ java -jar target/dynamodb-view-0.0.1-SNAPSHOT.jar --server.host=<YOUR HOST> --server.port=<YOUR PORT>
```
