const codedeploy = require("@aws-cdk/aws-codedeploy");
const lambda = require("@aws-cdk/aws-lambda");
const { Stack } = require("@aws-cdk/core");

class LambdaStack extends Stack {
  constructor(app, id, props) {
    super(app, id, props);

    this.lambdaCode = lambda.Code.fromAsset(__dirname + "/src/");

    const func = new lambda.Function(this, "Lambda", {
      code: this.lambdaCode,
      handler: "lambda.handler",
      runtime: lambda.Runtime.NODEJS_12_X,
    });

    const version = func.latestVersion;
    const alias = new lambda.Alias(this, "LambdaAlias", {
      aliasName: "Prod",
      version,
    });

    new codedeploy.LambdaDeploymentGroup(this, "DeploymentGroup", {
      alias,
      deploymentConfig:
        codedeploy.LambdaDeploymentConfig.LINEAR_10PERCENT_EVERY_1MINUTE,
    });
  }
}

module.exports = { LambdaStack };
