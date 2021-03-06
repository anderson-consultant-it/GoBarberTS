/* eslint-disable no-restricted-syntax */
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  describe('SHOULD BE ABLE TO', () => {
    it('List the month availability from provider', async () => {
      await fakeAppointmentsRepository.create({
        provider_id: 'provider_id',
        customer_id: 'customer_id',
        date: new Date(2021, 4, 20, 8, 0, 0),
      });

      await fakeAppointmentsRepository.create({
        provider_id: 'provider_id',
        customer_id: 'customer_id',
        date: new Date(2021, 4, 20, 9, 0, 0),
      });

      await fakeAppointmentsRepository.create({
        provider_id: 'provider_id',
        customer_id: 'customer_id',
        date: new Date(2021, 4, 20, 10, 0, 0),
      });

      await fakeAppointmentsRepository.create({
        provider_id: 'provider_id',
        customer_id: 'customer_id',
        date: new Date(2021, 4, 20, 11, 0, 0),
      });

      await fakeAppointmentsRepository.create({
        provider_id: 'provider_id',
        customer_id: 'customer_id',
        date: new Date(2021, 4, 20, 12, 0, 0),
      });

      await fakeAppointmentsRepository.create({
        provider_id: 'provider_id',
        customer_id: 'customer_id',
        date: new Date(2021, 4, 20, 13, 0, 0),
      });

      await fakeAppointmentsRepository.create({
        provider_id: 'provider_id',
        customer_id: 'customer_id',
        date: new Date(2021, 4, 20, 14, 0, 0),
      });

      await fakeAppointmentsRepository.create({
        provider_id: 'provider_id',
        customer_id: 'customer_id',
        date: new Date(2021, 4, 20, 15, 0, 0),
      });

      await fakeAppointmentsRepository.create({
        provider_id: 'provider_id',
        customer_id: 'customer_id',
        date: new Date(2021, 4, 20, 16, 0, 0),
      });

      await fakeAppointmentsRepository.create({
        provider_id: 'provider_id',
        customer_id: 'customer_id',
        date: new Date(2021, 4, 20, 17, 0, 0),
      });

      await fakeAppointmentsRepository.create({
        provider_id: 'provider_id',
        customer_id: 'customer_id',
        date: new Date(2021, 4, 21, 8, 0, 0),
      });

      const availability = await listProviderMonthAvailability.execute({
        provider_id: 'provider_id',
        year: 2021,
        month: 5,
      });

      expect(availability).toEqual(
        expect.arrayContaining([
          { day: 19, available: true },
          { day: 20, available: false },
          { day: 21, available: true },
          { day: 22, available: true },
        ]),
      );
    });
  });
});
