import { connect } from "@dagger.io/dagger"

// initialize Dagger client
connect(
  async (client) => {
    const source = client
      .host()
      .directory("hello-world", { exclude: ["node_modules/"] })

    const cargo = client
      .container()
      .from("rust:1.67")

    const runner = cargo
      .withDirectory("/src", source)
      .withWorkdir("/src")
      .withEntrypoint(["cargo"])

    await runner
      .withExec(["test"])
      .sync()

  },
  { LogOutput: process.stderr }
)
