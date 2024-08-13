import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import axios from "axios";
import { Helmet } from "react-helmet";

const Career: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    currentCompany: "",
    currentCtc: "",
    expectedCtc: "",
    earliestStartDate: "",
    resume: null as File | null,
    role: "",
  });

  const roles = [
    {
      title: "Digital Marketing Head",
      jobDescription: `As the marketing head for Symbiosis Infra you will be responsible for developing and executing marketing plans to generate leads, build brand awareness, and create a positive customer experience. You will oversee a team of marketing professionals and work closely with the sales team to ensure that all marketing activities are aligned with our business goals. The ideal candidate will have experience in the real estate industry, as well as a proven track record in developing and executing successful marketing campaigns. He or she will be a strategic thinker with strong analytical skills and a creative mind.`,
      duties: [
        "Develop and execute marketing plans that achieve business objectives while staying within budget",
        "Research, write, edit, proofread, and design marketing collateral including but not limited to: website content, blog posts, e-books, email campaigns, social media posts",
        "Manage projects from start to finish, ensuring all deadlines are met and deliverables are of the highest quality",
        "Analyze data and metrics to assess performance of marketing campaigns and programs and make recommendations for improvement",
        "Stay up-to-date on latest industry trends and best practices and share insights with team members",
        "Develop relationships and collaborate with other departments, such as sales, to ensure alignment of marketing initiatives with business goals",
        "Identify and secure speaking opportunities and sponsorships at relevant conferences and events",
        "Serve as a brand ambassador, ensuring all marketing activities reflect the company's values and mission",
        "Manage outside vendors and agencies, providing clear direction and feedback to ensure quality work product",
        "Oversee development and maintenance of company website, making updates as needed",
        "Create and manage annual marketing budget",
        "Supervise and provide guidance to junior members of the marketing team",
        "Managing the KPI and ROI of Marketing Expenses",
      ],
      requiredSkills: [
        "Bachelor's degree in marketing, business, or related field",
        "12+ years experience in marketing, with at least 5 – 7 years in a leadership role",
        "Proven track record of developing and executing successful marketing campaigns",
        "Experience managing a team of marketing professionals",
        "Strong understanding of the real estate industry, market trends, and customer needs",
        "Excellent communication, writing, and presentation skills",
      ],
      jobLocation: "Gurgaon (ON – Site)",
      ctc: "12 LPA",
    },
    {
      title: "Sales Executive/Manager",
      jobDescription: `At, Symbiosis Infra, we would be nothing without our successful sales team. We're seeking a qualified sales representative to help us sell the products and services that our customers have grown to rely on. The sales representative should have a strong understanding of the sales process, and expertise in generating leads, building relationships, and closing deals. The ideal candidate will not only be a quick learner but also should be skilled with negotiation and compellingly showcase our offerings. If you love a challenge and have a working knowledge of real estate we can't wait to see your resume.`,
      objectives: [
        "Maintain a working relationship with existing clients to ensure exceptional services and identification of potential new sales opportunities",
        "Thoroughly learn about the estates and how to troubleshoot the issues with customers",
        "Generate leads and build relationships by planning and organizing a daily work schedule to call on existing or potential sales",
        "Suggest applicable and relevant upsells to help customers walk out the door with everything they need",
        "Meet weekly, monthly, and annual sales and call quotas through the successful implementation of sales and marketing strategies and tactics",
        "Develop and implement territory action plan through comprehensive data analysis, and adjust sales techniques based on interactions and results in the field",
        "Travel to an estate with clients to show off the features of each home and help them compare different properties based on their needs",
      ],
      requiredSkills: [
        "2+ years' quota carrying sales experience",
        "Freshers can also apply",
        "Strong written and verbal communication skills",
      ],
    },
    {
      title: "Full Stack Developer",
      jobDescription: `As a Full Stack Developer, you will work closely with our development team to design, develop, and implement software solutions that are scalable, robust, and optimised. You will be involved in the entire software development lifecycle, including ideation, development, deployment, and maintenance. Your role will require a blend of technical expertise in both front-end and back-end development, along with a solid understanding of web technologies and software engineering principles.`,
      responsibilities: [
        "Design and implement responsive, user-friendly web applications.",
        "Develop and maintain both client-side and server-side code.",
        "Collaborate with cross-functional teams (Product Management, Designers, Developers) to define, design, and ship new features.",
        "Ensure the performance, quality, and responsiveness of applications.",
        "Identify and correct bottlenecks and fix bugs.",
        "Help maintain code quality, organisation, and automatization.",
        "Stay up-to-date with emerging web technologies and best practices.",
      ],
      requiredSkills: [
        "Bachelor's degree in Computer Science, Information Technology, or a related field.",
        "Proven experience as a Full Stack Developer or similar role.",
        "Proficiency in front-end languages and frameworks (e.g., HTML, CSS, JavaScript, React, Angular).",
        "Strong experience with back-end programming languages (e.g., Python, Ruby, Java, PHP, .Net).",
        "Experience with database technology (e.g., MySQL, MongoDB).",
        "Familiarity with web servers (e.g., Apache, Nginx) and UI/UX design.",
        "Excellent problem-solving skills and ability to think algorithmically.",
        "Strong communication and teamwork skills.",
        "Ability to manage a project independently.",
      ],
    },
    {
      title: "Receptionist",
      jobDescription: `A receptionist serves as the first point of contact for visitors, clients, and employees. They play a crucial role in providing administrative support, managing inquiries, and maintaining a professional atmosphere in the workplace. Typically found in various industries, from healthcare facilities to corporate offices, receptionists ensure smooth communication and efficient operation of the front desk area.`,
      responsibilities: [
        "Greeting and Welcoming Visitors: Receptionists warmly welcome and greet visitors, clients, and employees as they arrive at the office. They create a positive first impression by offering assistance and providing necessary information.",
        "Answering and Directing Calls: Receptionists manage incoming calls, screening and transferring them to the appropriate departments or individuals. They may also take messages accurately and relay them promptly.",
        "Handling Correspondence: This includes receiving and distributing mail, emails, packages, and faxes. Receptionists may also be responsible for sorting and organizing incoming correspondence for further processing.",
        "Scheduling and Managing Appointments: Receptionists schedule appointments, meetings, and conference room bookings. They maintain calendars, update schedules, and notify relevant parties of any changes.",
        "Providing Information: Receptionists offer information about the company, its services, and its policies to visitors and callers. They may also provide directions, assist with inquiries, and offer support to guests as needed.",
        "Maintaining Security: Receptionists monitor access to the premises, ensuring only authorized individuals enter the facility. They may issue visitor badges, sign-in guests, and enforce security protocols.",
        "Administrative Support: Receptionists provide general administrative support to staff, such as photocopying documents, filing paperwork, and maintaining office supplies inventory.",
        "Handling Payments: In some settings, receptionists may collect payments, issue receipts, and process transactions for services rendered.",
        "Maintaining Cleanliness: Receptionists ensure the front desk area is neat, organized, and presentable. They may also coordinate with cleaning staff to maintain cleanliness in the reception area.",
        "Emergency Response: Receptionists may be trained to respond to emergencies, including medical situations, fire alarms, or security breaches. They may initiate appropriate protocols and alert authorities as necessary.",
      ],
      requiredSkills: [
        "Excellent communication skills, both verbal and written",
        "Proficiency in using office equipment such as phones, computers, and fax machines",
        "Strong interpersonal skills and customer service orientation",
        "Organizational and multitasking abilities to handle various tasks simultaneously",
        "Attention to detail and accuracy in managing information",
        "Knowledge of basic administrative procedures and office management practices",
        "Ability to remain calm and composed under pressure or during emergencies",
        "Familiarity with relevant software applications (e.g., Microsoft Office suite, scheduling software)",
        "High school diploma or equivalent; additional certification or training may be advantageous",
      ],
    },
    {
      title: "Telesales Executive",
      jobDescription: `As a Telesales Executive, you will be responsible for generating new sales leads and converting them into customers through effective telephone-based sales and customer support. You will work closely with the sales team to ensure a seamless sales process and provide an exceptional customer experience.`,
      objectives: [
        "Proactively make outbound calls to potential customers to generate new leads",
        "Effectively qualify and nurture leads, building relationships and trust",
        "Provide detailed information about our products and services to customers",
        "Handle customer inquiries, provide solutions, and address any concerns",
        "Maintain accurate records of all customer interactions and sales activities",
        "Collaborate with the sales team to develop and implement sales strategies",
        "Achieve and exceed individual and team sales targets and KPIs",
      ],
      requiredSkills: [
        "1-2 years of experience in a telesales or customer service role",
        "Strong communication and interpersonal skills",
        "Ability to work in a fast-paced, target-driven environment",
        "Excellent problem-solving and customer service skills",
        "Proficiency in using CRM and other sales-related software",
        "Enthusiasm and a positive attitude to succeed in a sales role",
      ],
    },
  ];


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      role: value,
    }));
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData((prevData) => ({
      ...prevData,
      resume: file || null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSubmit = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          if (key === 'resume') {
            formDataToSubmit.append(key, value as File);
          } else {
            formDataToSubmit.append(key, value as string);
          }
        }
      });
      
      const response = await axios.post("http://localhost:4000/careers", formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log(response.data); // Log the response for debugging
      resetFormData();
      alert("Career form submitted successfully!");
    } catch (error) {
      console.error("Error submitting career form:", error);
      
    }
  };

  const resetFormData = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      currentCompany: "",
      currentCtc: "",
      expectedCtc: "",
      earliestStartDate: "",
      resume: null as File | null,
      role: "",
    });
  };

  return (
    <div className="flex flex-col items-center lg:mt-[5%] relative bg-[#F5F5F7] mt-10 lg:space-y-0 space-y-2 ptop">
      <Helmet>
        <title>Career</title>
      </Helmet>
      <div className="lg:w-9/12 w-11/12 px-4 workswidth md:w-full md:px-10 lg:px-0 lg:bg-[#f5f5f7] text-left xl:py-[3%] text-gray-600 md:bg-[#f5f5f7]">
        <h1 className="text-2xl lg:text-4xl pb-5 mt-16 md:mt-8 mmargin">
          Join Our Team
        </h1>
        <p className="text-lg">
          Join our dynamic team where your talents are celebrated and
          opportunities for growth are endless.
        </p>
      </div>

      <div className="lg:w-9/12 w-11/12 px-4">
        <Accordion type="single" collapsible className="mb-8">
          {roles.map((role, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{role.title}</AccordionTrigger>
              <AccordionContent>
                <div className="mb-4">
                  <p className="mb-2 font-semibold">Job Description:</p>
                  <p>{role.jobDescription}</p>
                </div>
                {role.duties && (
                  <div className="mb-4">
                    <p className="mb-2 font-semibold">Duties:</p>
                    <ul className="list-disc list-inside">
                      {role.duties.map((duty, index) => (
                        <li key={index} className="mb-1">
                          {duty}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {role.responsibilities && (
                  <div className="mb-4">
                    <p className="mb-2 font-semibold">Responsibilities:</p>
                    <ul className="list-disc list-inside">
                      {role.responsibilities.map((responsibility, index) => (
                        <li key={index} className="mb-1">
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {role.objectives && (
                  <div className="mb-4">
                    <p className="mb-2 font-semibold">Objectives:</p>
                    <ul className="list-disc list-inside">
                      {role.objectives.map((objective, index) => (
                        <li key={index} className="mb-1">
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {role.requiredSkills && (
                  <div className="mb-4">
                    <p className="mb-2 font-semibold">Required Skills:</p>
                    <ul className="list-disc list-inside">
                      {role.requiredSkills.map((skill, index) => (
                        <li key={index} className="mb-1">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {role.jobLocation && (
                  <p className="mb-2 font-semibold">
                    Job Location: {role.jobLocation}
                  </p>
                )}
                {role.ctc && (
                  <p className="mb-2 font-semibold">CTC: {role.ctc}</p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="lg:w-5/12 w-11/12 px-4">
        <h1 className="text-2xl lg:text-3xl py-3 lg:py-7 font-semibold text-center text-gray-600">
          Apply Now
        </h1>

        <form onSubmit={handleSubmit} className="" encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="flex  font-medium text-gray-600"
              >
                First Name <p className="text-orange-500">*</p>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block  font-medium text-gray-600"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="flex  font-medium text-gray-600"
              >
                Email <p className="text-orange-500">*</p>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="flex font-medium text-gray-600"
              >
                Mobile <p className="text-orange-500">*</p>
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="currentCompany"
                className="block  font-medium text-gray-600"
              >
                Current Company
              </label>
              <input
                type="text"
                id="currentCompany"
                name="currentCompany"
                value={formData.currentCompany}
                onChange={handleInputChange}
                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label
                htmlFor="currentCtc"
                className="flex  font-medium text-gray-600"
              >
                Current CTC (LPA) <p className="text-orange-500">*</p>
              </label>
              <input
                type="text"
                id="currentCtc"
                name="currentCtc"
                value={formData.currentCtc}
                onChange={handleInputChange}
                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label
                htmlFor="expectedCtc"
                className="flex  font-medium text-gray-600"
              >
                Expected CTC (LPA) <p className="text-orange-500">*</p>
              </label>
              <input
                type="text"
                id="expectedCtc"
                name="expectedCtc"
                value={formData.expectedCtc}
                onChange={handleInputChange}
                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label
                htmlFor="earliestStartDate"
                className="block  font-medium text-gray-600"
              >
                Earliest Possible Start Date
              </label>
              <input
                type="text"
                id="earliestStartDate"
                name="earliestStartDate"
                value={formData.earliestStartDate}
                onChange={handleInputChange}
                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="role" className="block  font-medium text-gray-600">
              Select Role
            </label>
            <Select value={formData.role} onValueChange={handleRoleChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Digital Marketing Head">
                    Digital Marketing Head
                  </SelectItem>
                  <SelectItem value="Sales Executive/Manager">
                    Sales Executive/Manager
                  </SelectItem>
                  <SelectItem value="Full Stack Developer">
                    Full Stack Developer
                  </SelectItem>
                  <SelectItem value="Receptionist">Receptionist</SelectItem>
                  <SelectItem value="Telesales Executive">
                    Telesales Executive
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            
          </div>

          <div className="mt-8">
            <label
              htmlFor="resume"
              className="block  font-medium text-gray-600"
            >
              Upload your updated CV
            </label>
            <div className="mt-1">
              <input
                type="file"
                name="resume"
                id="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                className="sr-only"
              />
              <label htmlFor="resume" className="cursor-pointer">
                <span className="inline-flex items-center px-2 py-2 border border-transparent  font-medium rounded-md text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-teal-500">
                  {formData.resume ? formData.resume.name : "Choose a file"}
                </span>
              </label>
            </div>
          </div>
            <div className="flex text-gray-500">
              The <p className="text-orange-500 px-1">*</p> mark fields are mandetory
            </div>
          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Career;
