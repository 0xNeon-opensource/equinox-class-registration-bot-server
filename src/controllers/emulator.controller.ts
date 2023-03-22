import { NextFunction, Request, Response } from 'express';
import { exec } from 'child_process';

class EmulatorController {
    public getPackages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log('👹👹👹👹👹👹👹');
        
      exec(`adb connect ${process.env.EMULATOR_IP}:5555`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error connecting to emulator: ${error}`);
          res.status(500).send('Error connecting to emulator');
          return;
        }

        exec(`adb shell pm list packages`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error fetching packages: ${error}`);
            res.status(500).send('Error fetching packages');
            return;
          }

          const packageList = stdout
            .split('\n')
            .map((pkg: string) => pkg.replace('package:', '').trim())
            .filter((pkg: string) => pkg);

          res.json({ packages: packageList });
        });
      });
    } catch (error) {
      next(error);
    }
  };
}

export default EmulatorController;
