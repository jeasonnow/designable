import { ISchema } from '@formily/json-schema'
import { DataSourceSetter, ValidatorSetter } from '@designable/formily-setters'
import { FormItemSwitcher } from '../../common/FormItemSwitcher'
import { AllSchemas } from '../../schemas'

export const createComponentSchema = (
  component: ISchema,
  decorator: ISchema
) => {
  return {
    'component-group': component && {
      type: 'void',
      'x-component': 'CollapseItem',
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{!!$form.values["x-component"]}}',
          },
        },
      },
      properties: {
        'x-component-props': component,
      },
    },
    // 'decorator-group': decorator && {
    //   type: 'void',
    //   'x-component': 'CollapseItem',
    //   'x-component-props': { defaultExpand: false },
    //   'x-reactions': {
    //     fulfill: {
    //       state: {
    //         visible: '{{!!$form.values["x-decorator"]}}',
    //       },
    //     },
    //   },
    //   properties: {
    //     'x-decorator-props': decorator,
    //   },
    // },
  }
}

export const createFieldSchema = (
  component?: ISchema,
  decorator: ISchema = AllSchemas.FormItem,
  withoutEnum = false
): ISchema => {
  return {
    type: 'object',
    properties: {
      'field-group': {
        type: 'void',
        'x-component': 'CollapseItem',
        properties: {
          name: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
          },
          title: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
          },
          // description: {
          //   type: 'string',
          //   'x-decorator': 'FormItem',
          //   'x-component': 'Input.TextArea',
          // },
          // 'x-display': {
          //   type: 'string',
          //   enum: ['visible', 'hidden', 'none', ''],
          //   'x-decorator': 'FormItem',
          //   'x-component': 'Select',
          //   'x-component-props': {
          //     defaultValue: 'visible',
          //   },
          // },
          'x-pattern': {
            type: 'string',
            enum: ['editable', 'disabled'],
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              defaultValue: 'editable',
            },
          },
          default: {
            'x-decorator': 'FormItem',
            'x-component': 'ValueInput',
          },
          ...(withoutEnum
            ? {}
            : {
                enum: {
                  'x-decorator': 'FormItem',
                  'x-component': DataSourceSetter,
                  'x-component-props': {
                    allowExtendOption: false,
                  },
                },
              }),
          'x-validator': {
            type: 'array',
            'x-component': ValidatorSetter,
          },
          required: {
            type: 'boolean',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
          },
        },
      },
      ...createComponentSchema(component, decorator),
    },
  }
}

export const createVoidFieldSchema = (
  component?: ISchema,
  decorator: ISchema = AllSchemas.FormItem
) => {
  return {
    type: 'object',
    properties: {
      'field-group': {
        type: 'void',
        'x-component': 'CollapseItem',
        properties: {
          name: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
          },
          title: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-reactions': {
              fulfill: {
                state: {
                  hidden: '{{$form.values["x-decorator"] !== "FormItem"}}',
                },
              },
            },
          },
          description: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
            'x-reactions': {
              fulfill: {
                state: {
                  hidden: '{{$form.values["x-decorator"] !== "FormItem"}}',
                },
              },
            },
          },
          'x-display': {
            type: 'string',
            enum: ['visible', 'hidden', 'none', ''],
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              defaultValue: 'visible',
            },
          },
          'x-pattern': {
            type: 'string',
            enum: ['editable', 'disabled', 'readOnly', 'readPretty', ''],
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              defaultValue: 'editable',
            },
          },
          'x-decorator': {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': FormItemSwitcher,
          },
        },
      },
      ...createComponentSchema(component, decorator),
    },
  }
}
