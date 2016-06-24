# The SparkPost Mailer App

The SparkPost mailer app provides a Foxx script and `Foxx.queues` job type for sending transactional emails with [SparkPost](https://sparkpost.com/).

*Examples*

First add this app to your dependencies:

```js
{
  ...
  "dependencies": {
    "mailer": "mailer-sparkpost:^1.0.0"
  }
  ...
}
```

Once you've configured both apps correctly, you can use it like this:

```js
var Foxx = require('org/arangodb/foxx');
var queue = Foxx.queues.get('default');

queue.push(applicationContext.dependencies.mailer, {
    content: {
        from: {email: 'postmaster@initech.example'},
        subject: 'Termination',
        html: '<blink>YOU ARE FIRED!</blink>'
    }
    recipients: [{address: 'john.doe@employees.initech.example'}],
});
```

## Configuration

This app has the following configuration options:

* *apiKey*: Your SparkPost API key. You can find or generate this on the Account page.
* *maxFailures* (optional): The maximum number of times each job will be retried if it fails. Default: *0* (don't retry).

## Job Data

For full documentation of all job data options supported by SparkPost see [the official SparkPost API documentation](https://developers.sparkpost.com/api/transmissions).

## License

This code is distributed under the [Apache License](http://www.apache.org/licenses/LICENSE-2.0) by Christian Pekeler.
