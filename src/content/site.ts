export const site = {
  name: "Yashdeep Singh",
  handle: "atomicx7",
  title: "Software Engineer",
  description: "Software Engineer building production AI backends and GPU-shader Android experiments.",
  location: "Bengaluru, India",
  timezone: "Asia/Kolkata",
  github: "https://github.com/atomicx7",
  linkedin: "https://www.linkedin.com/in/yash-deep-singh/",
  resume: "/Yashdeep_Singh_Resume.pdf",
  // Kept as parts so the address is only revealed after a deliberate copy action.
  emailParts: ["punnyyashdeep", "gmail.com"],
} as const

export const emailAddress = `${site.emailParts[0]}@${site.emailParts[1]}`
