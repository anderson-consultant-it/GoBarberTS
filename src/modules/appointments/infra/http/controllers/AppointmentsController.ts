import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { provider_id, date } = req.body;
      const customer_id = req.user.id;

      const createAppointmentService = container.resolve(
        CreateAppointmentService,
      );

      const appointment = await createAppointmentService.execute({
        date,
        provider_id,
        customer_id,
      });

      return res.json(appointment);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
