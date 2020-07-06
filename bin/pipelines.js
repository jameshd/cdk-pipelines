#!/usr/bin/env node

const { App } = require("@aws-cdk/core");
const { LambdaStack } = require("../lib/lambdaStack");
const { PipelineStack } = require("../lib/pipelineStack");

const app = new App();

const lambdaStack = new LambdaStack(app, "LambdaStack");
new PipelineStack(app, "PipelineDeployingLambdaStack", {
  lambdaCode: lambdaStack.lambdaCode,
});

app.synth();
