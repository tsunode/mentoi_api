import { createConnections } from 'typeorm';
import * as pg from 'pg';

// Resolve problema do horário que vinha com +6
pg.defaults.parseInputDatesAsUTC = true;

pg.types.setTypeParser(
  1114,
  (stringValue: string) => new Date(`${stringValue}Z`),
);

createConnections();
