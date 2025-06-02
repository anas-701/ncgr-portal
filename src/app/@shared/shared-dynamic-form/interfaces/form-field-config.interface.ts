import { ValidatorFn } from "@angular/forms";
export interface ConditionalVisibility {
    dependsOn: string; // key of the field to depend on
    condition: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan';
    value: any; // the value to compare against
}
export interface FormFieldConfig {
    key: string;
    type: string;
    label: string;
    validators?: ValidatorFn[];
    options?: any[];
    placeholder?: string;
    styleClass?: string;
    conditionalVisibility?: ConditionalVisibility; // New property for conditional visibility
}