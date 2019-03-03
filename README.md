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
$ java -jar target/dynamodb-view-0.0.1-SNAPSHOT.jar  --amazon.dynamodb.endpoint=<NEW URL>
```

For host targeting, if you don't put any setting in command line parameter, this program access to localhost that means all resources(e.g. js files) will be referred from local contents.

If you want to change the situation, you can put ```server.host``` and ```server.port``` parameters like below.

```
$ java -jar target/dynamodb-view-0.0.1-SNAPSHOT.jar  --server.host=<HOST NAME> --server.port=<PORT NUMBER>

e.g.
$ java -jar target/dynamodb-view-0.0.1-SNAPSHOT.jar  --server.host=ec2-XXX-XXX-XXX-XXX.compute-1.amazonaws.com --server.port=8080

```

 
