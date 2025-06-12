import { ValidatorFn } from "@angular/forms";
export interface ConditionalVisibility {
    dependsOn: string; // key of the field to depend on
    condition: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan';
    value: any; // the value to compare against
}
export interface FormFieldConfig {
    template?: string;
    key?: string;
    type?: string;
    label?: string;
    validators?: ValidatorFn[];
    options?: any[];
    placeholder?: string;
    styleClass?: string;
    minDate?: string;
    maxDate?: string;
    dateFormat?: 'dd/mm/yyyy' | 'mm/dd/yyyy' | 'yyyy-mm-dd' | undefined;
    minTime?: string;
    maxTime?: string;
    step?: number;
    timeFormat?: "12" | "24" | undefined;
    showTimeFormat?: boolean;
    conditionalVisibility?: ConditionalVisibility; // New property for conditional visibility
    defaultValue?: any;
    // New properties for form array
    isArray?: boolean;
    arrayConfig?: FormArrayConfig;
}
export interface FormArrayConfig {
    minItems: number;
    maxItems?: number;
    addButtonText?: string;
    removeButtonText?: string;
    fields: FormFieldConfig[]; // Fields for each array item
    itemClass?: string;
    addButtonClass?: string;
    removeButtonClass?: string;
}
export interface fieldGroup {
    groupClass?: string;
    fields?: FormFieldConfig[];
    conditionalVisibility?: ConditionalVisibility;
}
