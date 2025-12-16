import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export interface SensorReading {
  value: number;
  timestamp: Date;
  areaId: string;
}

export interface IrrigationControl {
  areaId: string;
  action: 'START' | 'STOP';
  duration?: number;
}