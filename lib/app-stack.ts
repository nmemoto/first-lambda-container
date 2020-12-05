import { Rule, Schedule } from '@aws-cdk/aws-events';
import * as eventsTargets from '@aws-cdk/aws-events-targets';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import * as path from 'path';

export class AppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const fn = new lambda.DockerImageFunction(this, 'AssetFunction', {
      code: lambda.DockerImageCode.fromImageAsset(path.join('app', 'lambda'))
    });

    const rule = new Rule(this, 'ScheduleRule', {
      schedule: Schedule.cron({
        minute: '30', hour: '6'  // UTC
      }),
      targets: [
        new eventsTargets.LambdaFunction(fn)
      ]
    })
  }
}
