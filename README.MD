# Crewbite website
This installation guide covers the setup & deployment process of
* Production environment (crewbite.io, hosted by AWS Amplify)

> The following operating systems were tested:
> * Mac OS X (12.3.1)
> * Windows 11 Pro (Build 21H2)


### Tools
- [Git](https://git-scm.com/downloads) (For Windows please install Git Bash as well, it is included in Git installer)
- [Node JS](https://www.python.org/downloads/)
- [Aws Command lines](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- [Amplify Command lines](https://docs.amplify.aws/cli/start/install/)
> Aws and Amplify CLI are for deployment only.

### Permissions
* Please ask Xia, Shiyang for AWS access credentials

## Setup
### 1. Verify Node,AwsCli and AmplifyCli are globally installed
```
node --version
npm --version
aws --version
amplify --version
```
### 2. Setup AWS programmatic access
```
aws configure
```
* Access id, secret id should come with your credential file
* Region: us-east-1
* Format: json

### 3. Initialize project 
```
npm install
```

### 4. Hookup with Amplify cloud
```
amplify init
```
* Use existing environment "dev"
* Use the AWS profile you just created in the previous step (named "default" if you haven't renamed it)

## Verify the change locally
```
npm start
```
> Features require service callbacks will not work locally (e.g. Cognito auth, Stripe session)
## Deploy to the Cloud
```
amplfy publish
```
> Your change is now visible at crewbite.io