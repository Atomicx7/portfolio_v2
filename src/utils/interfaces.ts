export interface About {
  quote: string
  description: string
  name: string
  avatar: {
    url: string
  }
}

export interface Timeline {
  _id: string
  jobTitle: string
  company_name: string
  jobLocation: string
  startDate: string
  endDate: string
  summary: string
  bulletPoints: string[]
  forEducation: boolean
  enabled: boolean
  sequence: number
}

