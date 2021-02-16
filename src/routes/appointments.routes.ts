import { Request, Response, Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '@src/repositories/AppointmentsRepository';
import CreateAppointmentService from '@src/services/CreateAppointmentService';
import { getCustomRepository } from 'typeorm';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (req: Request, res: Response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return res.status(200).json(appointments);
});

appointmentsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();

    const appointment = await createAppointmentService.execute({
      date: parsedDate,
      provider,
    });

    return res.json(appointment);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default appointmentsRouter;