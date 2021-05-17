import {FcViewDetails} from 'react-icons/fc'

export default {
  name: 'optionSet',
  title: 'Option Set',
  type: 'object',
  icon: FcViewDetails,
  options: {collapsible: true, collapsed: false},
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Administrative Title',
      description: 'This is only shown here and is used to help describe this setup of options.',
      validation: Rule => Rule.required()
    },
    {
      name: 'optionLogics',
      title: 'Logic',
      type: 'array',
      description: 'If used, the option set would show if all true. If you do not add any logic, the option will always show to everyone. NOTE! This always uses AND logic, so every logic condition needs to be true.',
      of: [
        {type: 'optionLogic'},
        {type: 'optionNumericLogic'}
      ]
    },
    {
      name: 'options',
      title: 'Options',
      type: 'array',
      of: [{
        type: 'option'
      }],
      validation: Rule => Rule.required().min(2)
    }
  ]
}
