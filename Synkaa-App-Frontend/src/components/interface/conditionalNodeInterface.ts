export interface ConditionContentInterface {
  toggleDrawer: any;
  onConditionUpdate: any;
  initialFormValues: ConditionalForm;
}

export interface ConditionalForm {
  operand1: string;
  operator: string;
  operand2: string;
  dynamicConditions: Array<any>;
}
