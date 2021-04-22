// import React from 'react'
// const Icon = () => <span style={{fontSize: '1.5rem'}}>{'🧮'}</span>

import {FcCalculator} from 'react-icons/fc'

export default {
  name: 'calculator',
  type: 'document',
  title: 'calculator',
  icon: FcCalculator,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      type: 'text',
      rows: 3,
      title: 'Description'
    },
    {
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{
            type: 'question'
          }]
        }]
    }
  ]
}