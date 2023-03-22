import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import EmulatorController from '@controllers/emulator.controller';

class EmulatorRoute implements Routes {
  public path = '/emulator';
  public router = Router();
  public emulatorController = new EmulatorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/packages`, this.emulatorController.getPackages);
  }
}

export default EmulatorRoute;
