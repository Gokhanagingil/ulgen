import { Injectable } from '@nestjs/common';

@Injectable()
export class DotWalkingService {
  private resolve(obj: any, path: string): any {
    const parts = path.split('.').map((p) => p.trim());
    let current = obj;
    for (const part of parts) {
      if (current == null) return undefined;
      current = current[part];
    }
    return current;
  }

  parse(obj: any, query: string): any {
    const segments = query.split('->').map((s) => s.trim());
    const result: Record<string, any> = {};
    for (const seg of segments) {
      result[seg] = this.resolve(obj, seg);
    }
    return result;
  }
}
