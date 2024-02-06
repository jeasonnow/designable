import { ISchema } from '@formily/react'

export const FormItem: ISchema = {
  type: 'object',
  properties: {
    tooltip: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
}
