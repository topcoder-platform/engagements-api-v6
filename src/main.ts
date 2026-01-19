import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { PrismaClientExceptionFilter } from "./common/filters/prisma-client-exception.filter";
import { DbService } from "./db/db.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  //const config = app.get(ConfigService);
  const port = Number(process.env.PORT || 3000);

  // Apply the Prisma exception filter globally
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  app.setGlobalPrefix("v6/engagements");

  // Get PrismaService instance to handle graceful shutdown
  const prismaService = app.get(DbService);
  prismaService.enableShutdownHooks(app);

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle("Topcoder Engagements API")
    .setDescription(
      "API for managing temporary contract work engagements. " +
        "Supports JWT authentication for users and M2M tokens for " +
        "service-to-service communication. All endpoints require " +
        "authentication with appropriate scopes.",
    )
    .setVersion("6.0")
    .addServer("http://localhost:3000", "Local")
    .addServer("https://api.topcoder-dev.com", "Dev")
    .addServer("https://api.topcoder.com", "Prod")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description:
          "JWT token for user authentication or M2M token for service access",
      },
      "bearer",
    )
    .addTag(
      "Engagements",
      "Endpoints for managing engagement opportunities",
    )
    .addTag(
      "Applications",
      "Endpoints for managing engagement applications",
    )
    .addTag(
      "Feedback",
      "Endpoints for managing engagement feedback, including anonymous customer feedback",
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/v6/engagements/api-docs", app, document);

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(
    `Swagger docs available at: ${await app.getUrl()}/v6/engagements/api-docs`,
  );
}
bootstrap().catch(console.error);
