import { Logger, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HealthModule } from "./health/health.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { TasksModule } from "./tasks/tasks.module";

@Module({
  imports: [
    TasksModule,
    HealthModule,
    MongooseModule.forRoot(
      "mongodb+srv://admin:miracle123@oliver-mongodb.nlhibo6.mongodb.net/?retryWrites=true&w=majority&appName=oliver-mongodb",
      {
        connectionFactory: (connection: Connection) => {
          connection.on("connected", () => {
            Logger.log("MongoDB connected successfully!", "MongoDB Connection");
          });

          connection.on("error", (err) => {
            Logger.error(
              `MongoDB connection error: ${err}`,
              "",
              "MongoDB Connection",
            );
          });

          connection.on("disconnected", () => {
            Logger.warn("MongoDB disconnected!", "MongoDB Connection");
          });

          return connection;
        },
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
