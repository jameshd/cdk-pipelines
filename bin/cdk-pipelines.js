#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { CdkPipelinesStack } = require('../lib/cdk-pipelines-stack');

const app = new cdk.App();
new CdkPipelinesStack(app, 'CdkPipelinesStack');
