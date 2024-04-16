import React from 'react'
import { Upload as FormilyUpload } from '@formily/antd'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'

export const Upload: DnFC<React.ComponentProps<typeof FormilyUpload>> =
  FormilyUpload

Upload.Behavior = createBehavior({
  name: 'Upload',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Upload',
  designerProps: {
    propsSchema: createFieldSchema(
      AllSchemas.Upload,
      AllSchemas.FormItem,
      true,
      false,
      true
    ),
  },
  designerLocales: AllLocales.Upload,
})

Upload.Resource = createResource({
  icon: 'UploadSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'Array<object>',
        title: 'Upload',
        'x-decorator': 'FormItem',
        'x-component': 'Upload',
        'x-component-props': {
          textContent: 'Upload',
        },
      },
    },
  ],
})
