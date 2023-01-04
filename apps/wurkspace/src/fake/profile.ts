import {
  IntelligentContext,
  PersonalInformation,
  OrganizationData,
} from '@specs/old/profile'

export const organizationData: OrganizationData = {
  name: 'Audrey',
  position: 'CEO',
  children: [
    {
      name: 'Emma',
      position: 'Manager',
      children: [
        { name: 'JohnDoe', position: 'Software Engineer', isLoggedIn: true },
        { name: 'Micheal', position: 'Software Engineer' },
        { name: 'Thomas', position: 'Software Engineer' },
        { name: 'Elizabeth', position: 'Software Engineer' },
        { name: 'David', position: 'Software Engineer' },
      ],
    },
  ],
}
export const PersonalInformations: PersonalInformation[] = [
  { id: 'Display Name', value: 'John Doe' },
  { id: 'Email', value: 'john.doe@technoidentity.com' },
  { id: 'Phone', value: '+14845219746' },
  {
    id: 'Bio',
    value:
      'I can explore the possibility of a new era in the field of information technology',
  },
  { id: 'Reporting Manager', value: 'Emma' },
]
export const IntelligentContextList: IntelligentContext[] = [
  {
    type: 'Alerts',
    content: ['Course completion before the deadline', 'Leave Approval'],
  },
  {
    type: 'Insights',
    content: [
      ' Client recognition ',
      'Onboarded a new team member by providing the KT ',
      'Contributed to company resources by writing blog post',
      'Referred a friend who is successfully onboarded to the XXXX client',
    ],
  },
  {
    type: 'Probable Discussion Points',
    content: [
      'Participated in Marathon held in the city for a cause',
      'Client recognition',
    ],
  },
]
export const GoalsData = [
  {
    result: 95,
    objective: 'Learning kubernates',
  },
  {
    result: 34,
    objective: 'Improve code quality',
  },
  {
    result: 59,
    objective: 'Onboarded a new team member',
  },
]
