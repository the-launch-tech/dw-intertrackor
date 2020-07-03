# InterTracktor

InterTracktor is a SSR ReactJS app that tracks click interactions in a creative way and represents that data visually in real-time as well as gathering some naive information about the clicking history. All click-windows are persisted to a PostgreSQL DB leveraged by the Java SpringBoot MVC.

---

## Tools

- ReactJS
- SSR with ExpressJS
- Redux
- Typescript
- Java
- Spring Boot
- Gradle
- PostgreSQL

---

## Thoughts

I enjoyed putting this simple real-time interaction tracker together. And, I think it plays nicely with the novel button idea - adding another dimension of play.

My only reservation is that during the development of the Java backend I scoped out a set of schemas/packages that was too robust for the amount of time I had to work on the project - not to mention my inexperience with Java. After being very close to tying it all together, in the end, I had to make some sacrifices.

Nonetheless, the ideas for the front-end that I touched on were very fun - and hopefully pretty cool to play around with.

## Installation

#### Server

- API Port `:5000`
- Add database credentials in `/src/main/resources/application.properties`

1. `gradle`
2. `gradle wrapper`
3. `gradle build`
4. `java -jar ./build/libs/clickwindow-0.1.jar`

Summary: First, add db credentials. Then, the listed commands will build the `gradle wrapper` and an executable `jar`. Finally, run the `jar`. This should also handle the migration for the db - the file for which is included in the project.

#### Client (`NodeJS 14.4.0`)

- Client Port: `:3000`

1. Rename `.env.example` to `.env` in `/client`, keep the ports the same. Normally we could adjust the ports but, ehh.
2. `npm i`
3. `npm run prod:build`
4. `npm run prod:start`

Summary: Install NPM first. After that we can build our bundles. Then, start!
