import axios from 'axios';
import app from '../src/app';

describe("Application", (): void => {
  const port = 8001;
  const path = `http://localhost:${port}`;

  beforeAll(async (): Promise<void> => {
      await app.start(port);
  });

  afterAll(async (): Promise<void> => {
      await app.stop();
  });

  it("Swagger should be available", async (): Promise<void> => {
    const result = await axios.get(`${path}/swagger/`);
    expect(result.status).toBe(200);
  })

  it("Should return a 404 error if endpoint does not exist", async (): Promise<void> => {
    await axios.get(`${path}/pagedoesnotexist`).catch((e) => expect(e.response.status).toBe(404))
  })
})
