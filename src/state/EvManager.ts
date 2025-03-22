import { EvCase } from "../cases/EvCases";
import { evInfo } from "../constant";
import { Worker } from "../core/Worker";
import { EvInfo } from "../types";

export class EvWorkerManager {
  private static instance: EvWorkerManager | null = null;
  private evs: EvCase[] = [];
  private workers: Worker[] = [];

  constructor() {
    this.addAllEvs();
  }

  public getEvs(): EvInfo[] {
    return this.evs.map((ev) => ev.evInfo);
  }

  public static getInstance(): EvWorkerManager {
    if (!EvWorkerManager.instance) {
      EvWorkerManager.instance = new EvWorkerManager();
    }
    return EvWorkerManager.instance;
  }

  public addAllEvs() {
    this.evs = evInfo.map((ev) => new EvCase(ev));
  }

  public addWorker(id: string, ev: EvCase, timeRideStarted: number) {
    const worker = new Worker(id, ev, timeRideStarted);
    this.workers.push(worker);
  }

  public removeWorker(id: string) {
    this.workers = this.workers.filter((worker) => worker.id !== id);
  }

  public getWorker(id: string) {
    return this.workers.find((worker) => worker.id === id);
  }

  public getEvCase(id: string) {
    return this.evs.find((ev) => ev.evInfo.id === id);
  }

  public increaseChargeInAllEvs() {
    this.evs.forEach((ev) => ev.increaseCharging());
  }
}
