export interface SlateSchemas {
  getSchema?: () => object;
}

export default function createSchema() {
  const schemas: SlateSchemas = {};
  const schema = {};
  schemas.getSchema = () => schema;
  return schemas;
}
