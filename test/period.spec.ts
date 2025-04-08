import supertest from 'supertest';
import { expect } from 'chai';

import app from '../src/app';

const period = {
  period: 3233,
  name: 'SEP-DIC - 2023',
  state: 1,
};

const request = supertest(app);

describe('Period', () => {
  describe('POST /api/v1/period', () => {
    it('should return period data', async () => {
      const response = await request.post('/api/v1/period').send({
        period: period.period,
      });
      expect(response.body.data.period).to.deep.equal(period);
    });
  });

  describe('GET /api/v1/period', () => {
    it('should return all periods', async () => {
      const response = await request.get('/api/v1/period');
      expect(response.body.data.periods).to.deep.include(period);
      expect(response.body.data.periods.length).to.equal(3);
    });

    it('should return current period', async () => {
      const response = await request.get('/api/v1/period/current');
      expect(response.body.data.period).to.deep.equal(period);
    });
  });

  describe('PUT /api/v1/period', () => {
    it('should return 200 OK', async () => {
      const response = await request.put('/api/v1/period').send({
        period: 3232,
        status: 1,
      });
      expect(response.body.code).to.equal(200);
    });

    it('should return 400 Bad Request', async () => {
      const response = await request.put('/api/v1/period').send({
        period: 3232,
        status: 1,
      });
      expect(response.body.code).to.equal(400);
    });
  });
});
