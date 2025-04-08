import supertest from 'supertest';
import { expect } from 'chai';

import app from '../src/app';

const request = supertest(app);

describe('GET /', () => {
  it('should return 200 OK', async () => {
    const response = await request.get('/');
    expect(response.status).to.equal(200);
  });

  it('should return "Hello World!"', async () => {
    const response = await request.get('/');
    expect(response.text).to.equal('Hello World!');
  });

  it('should return 404 Not Found', async () => {
    const response = await request.get('/foo/bar');
    expect(response.status).to.equal(404);
  });
});
