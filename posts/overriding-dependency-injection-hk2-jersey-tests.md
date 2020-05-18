---
title: 'Overriding Dependency Injection with HK2 in Jersey Tests'
date: '2019-12-05'
---

A common problem when testing APIs is to be able to inject Mock of the services we don’t want to invoke during our test.

![mockito](/images/overriding-dependency-injection-hk2-jersey-tests/mockito.png)

Imagine you’re testing an API that sends Email through the [Postal Api](https://postal.atech.media/).

The service `postalServicethat` will be sending the email should be tested on its own already, it’s not the goal of our API Test to verify that mails are correctly sent.

We would then want to mock the behavior of our service during the execution of the test with the behavior we will indicate in our mock. 
For instance we want to test that our API endpoint handles correctly error from the `postalService`, returns the `PostalApiResponse` object when the email has been sent etc..

I’ve been using Jersey to build my API and JerseyTest as a framework for testing it with a Grizzly container.

Our API looks like this:

```java
@Api
@Path("postal")
@Secured
@NoArgsConstructor
public class PostalApi {

    @Inject
    private PostalService postalService;

    @POST
    @Path("send")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public PostalApiResponse send(PostalMessage message) throws Exception {

        if (message == null) {
            throw new QueryParamMandatoryException("postalMessage");
        }

        postalService.setUrl("https://postal.domain.com");
        postalService.setApiKey("API_KEY");

        return handlePostalApiResponse(postalService.sendMessage(message));
    }
}
```

Notice the `@Inject` of our `postalService` The binding is done using HK2 procedure, we need to register a new `AbstractBinder` that correctly bind the PostalService class to our implementation.

```java
public class ApplicationBinder extends AbstractBinder {
   @Override
   protected void configure() {
      bind(PostalService.class).to(PostalService.class).ranked(1);
   }
}
```
Notice I added a `ranked(1)` to the binding, it’s used to determine the order in which binding should be added in case of similar binding added to the context. The higher rank, the more prominent position in an injected for a contract.

The Binder needs to be registered to the application:

```java
register(new ApplicationBinder()); // for H2K injection dependency
```

We then can configure our test by adding a new binding to the context, specifying a higher rank for the mock binding.

```java
public class PostalApiTest extends JerseyTest {

    private PostalService postalService = Mockito.mock(PostalService.class);

    @Override
    protected Application configure() {
        ResourceConfig resourceConfig = new ApiApplication();
        resourceConfig.register(new AbstractBinder() {
            @Override
            protected void configure() {
                bind(postalService).to(PostalService.class).ranked(2); // to force the override of the binding
            }
        });
        return resourceConfig;
    }
```

It can then be configured like any other mock. That way no risk of sending unwanted email while testing our application.

```java
@Test
public void testSend_withPostalServiceReturnsError_shouldReturnError() throws Exception {
    // GIVEN
    configure();
    PostalMessage message = MockPostalMessage.mock("email@company.com");
    Mockito.doReturn(new PostalApiResponse(OperationStatus.ERROR)).when(postalService).sendMessage(any(PostalMessage.class));

    // WHEN
    final Response response = target("postal/send")
            .request(MediaType.APPLICATION_JSON)
            .header(HttpHeaders.AUTHORIZATION, mockAuthorizationJWT())
            .post(Entity.entity(message, MediaType.APPLICATION_JSON_TYPE));

    // THEN
    response.bufferEntity();
    assertEquals(Response.Status.BAD_REQUEST.getStatusCode(), response.getStatus());
    ErrorMessage errorMessage = response.readEntity(ErrorMessage.class);
    Assertions.assertNotNull(errorMessage);
}
```

If you want to know more about dependency injection with HK2 and Jersey you can take a look at another post [I published here](https://medium.com/@mnu/jersey-injection-dependency-example-with-hk2-84ebfb7cb2d2)

Obviously if you have any questions or remarks that can improve this solution I’d love to here about it in the comments or you can also find me on [Twitter](https://twitter.com/m4nu56)
