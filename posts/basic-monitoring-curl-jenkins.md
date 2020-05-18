---
title: 'Basic monitoring with curl and jenkins/gitlab'
date: '2020-02-04'
---

So you just finished your super webapp/api and it’s already going live. I’ll show you a simple way to add a basic monitoring on your server without adding a new dedicated app to do the task, using only your CI/CD

**The scripts**

Say you want to check if your app responds with an HTTP 200. The following command will exit with error if so:

`curl — silent — show-error — fail https://my-webapp.fr/`

If you want to verify that a specific endpoint respond with a json object containing a predefined number of elements. We’re using jq:

```bash
#/bin/sh
nbElements=$(curl https://my-webapp.fr/api/endpoint | jq length)
echo $nbElements
if [ $nbElements -eq 2 ]; then
    echo "No errors, the list of nbElements is 2 as expected"
    exit 0;
else
    echo "Oops, something went wrong, nbElements should have 2 elements and only $nbElements were received..."
    exit 1;
fi
```

**Monitor with Jenkins**

Using Jenkins you can create a specific job that you will configure to run every (minute/5 minutes.. you decide)

![jenkins](/images/basic-monitoring-curl-jenkins/jenkins.png)

And simply add new build steps with the commands you want to execute:

![jenkins](/images/basic-monitoring-curl-jenkins/jenkins_job.png)

Specify a way of being notified if one of the scripts fail, email, slack etc.. and you’re done with this simple solution to monitor your service is up and running.

**Seeing it fails…**

*You should never have faith in a test you haven’t seen fail…*

So playing with my server I received the following mail when the test began to exit 1

```cmd
+ curl https://mywebpp.fr/api/endpoint
+ jq length
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100   568  100   568    0     0  10281      0 --:--:-- --:--:-- --:--:-- 10327
+ nbElement=1
+ echo 1
1
+ [ 2 -eq 10 ]
+ echo Oops, something went wrong, nbElement should have 2 elements and only 1 were received...
Oops, something went wrong, urbanAreas should have 2 elements and only 1 were received...
+ exit 1
Build step 'Exécuter un script shell' marked build as failure
```

**Monitor with Gitlab**

You will be using the Scheduled Pipelines of Gitlab:

![jenkins](/images/basic-monitoring-curl-jenkins/gitlab.png)

You need to add a specific stage for your monitoring tasks and exclude the other stages from being executed by the scheduled task

```yml
stages:
  - test
  - release
  - monitoring
test:
  stage: test
  except:
    - schedules
  script:
    - mvn test
release:
  stage: release
  except:
    - schedules
  script:
    - docker build --pull -t $PROJECT_RELEASE_IMAGE node/
    - docker push $PROJECT_RELEASE_IMAGE
monitoring:
  stage: monitoring
  only:
    - schedules
  script:
    - curl - silent - show-error - fail https://my-webapp.fr/
    - chmod +x /root/scripts/monitoring.sh     
    - ./sh /root/scripts/monitoring.sh
```

The downside of this last solution is that it will pollute your pipelines..

See you on twitter: [m4nu56](https://twitter.com/m4nu56)

