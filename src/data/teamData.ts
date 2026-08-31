export type HeadInfo = {
  id: number;
  name: string;
  position: string;
  image: string;
  linkedin?: string;
  instagram?: string;
  objectPosition?: string; // e.g. 'center 30%' to focus face crop
};

type DepartmentData = { [departmentName: string]: HeadInfo[] };
type YearlyTeamData = { [year: string]: DepartmentData };

export const teamData: YearlyTeamData = {
  "2026-27": {
    "Executive Board": [
      { id: 101, name: "Khushi Nagelia", position: "Chairperson", image: "/team/khushi-nagelia.jpg" },
      { id: 102, name: "Pratham Gupta", position: "Deputy Chairperson", image: "/team/pratham-gupta.jpg" },
      { id: 103, name: "Sarah Gupta", position: "Deputy Chairperson", image: "/team/sarah-gupta.jpg" },
    ],
    "Startup Development and Guidance": [
      { id: 104, name: "Nikunj Nagpal", position: "Department Head", image: "/team/nikunj-nagpal.png" },
      { id: 105, name: "Raiyaan Mansoor", position: "Department Head", image: "/team/raiyaan-mansoor.jpg" },
    ],
    "Corporate and Alumni Relations": [
      { id: 106, name: "Dida Divya Sai Reddy", position: "Department Head", image: "/team/dida-divya-sai-reddy.jpg" },
      { id: 107, name: "Drishti Choudhary", position: "Department Head", image: "/team/drishti-choudhary.jpg" },
    ],
     "Technical": [
      { id: 115, name: "Sarthak Chaddha", position: "Department Head", image: "/team/sarthak-chaddha.jpg", objectPosition: "center 40%" },
    ],
    "Events and Operations": [
      { id: 108, name: "Vedika Singh", position: "Department Head", image: "/team/vedika-singh.jpg" },
      { id: 109, name: "Ishan Sonkule", position: "Department Head", image: "/team/ishan-ekbote.jpg" },
    ],
    "Marketing": [
      { id: 110, name: "Yusuf Khan", position: "Department Head", image: "/team/yusuf-khan.jpg" },
      { id: 111, name: "Aditya Vyas", position: "Department Head", image: "/team/aditya-vyas.jpg" },
    ],
    "Internal Relations & Resource Management": [
      { id: 112, name: "Vedant Mendhekar", position: "Department Head", image: "/team/vedant-mendhekar.jpg" ,objectPosition: "center 40%" },
    ],
    "Public Relations and Outreach": [
      { id: 113, name: "Siddharth Pareek", position: "Department Head", image: "/team/siddharth-pareek.jpg" },
      { id: 114, name: "Dhruv Agrawal", position: "Department Head", image: "/team/dhruv-agrawal.jpg" },
    ],
   
  },
  "2025-26": {
    "Executive Board": [
      { id: 6, name: "Bhavesh Changulani", position: "Chairperson", image: "https://res.cloudinary.com/dmaalzm4h/image/upload/v1762079601/Bhavesh_xbfwzr.webp", linkedin: "https://www.linkedin.com/in/bhavesh-changulani-b4a1592a1/" },
      { id: 1, name: "Riddhima Chauhan", position: "Deputy Chairperson", image: "https://res.cloudinary.com/dmaalzm4h/image/upload/v1762083457/Riddhima_vt1oja.webp", linkedin: "https://www.linkedin.com/in/riddhima-chauhan-30a879281/" },
      { id: 7, name: "Piyush Verma", position: "Deputy Chairperson", image: "https://res.cloudinary.com/dmaalzm4h/image/upload/v1762079609/Piyush_V_gnfest.webp", linkedin: "https://www.linkedin.com/in/piyush-verma-030a9327a/" },
    ],
    "Startup Development and Guidance": [
      { id: 8, name: "Vansh Sharma", position: "Department Head", image: "https://res.cloudinary.com/dmaalzm4h/image/upload/v1762079596/Vansh_jp3hfa.webp", linkedin: "https://www.linkedin.com/in/vanshsharma111/" },
      { id: 9, name: "Siddhant Chutke", position: "Department Head", image: "https://res.cloudinary.com/dmaalzm4h/image/upload/v1762079589/Siddhant_idfoiw.webp", linkedin: "https://www.linkedin.com/in/siddhant-chutke-164b441b7/" },
    ],
    "Technical": [
      { id: 16, name: "Ahmed Sahigara", position: "Department Head", image: "https://res.cloudinary.com/dmaalzm4h/image/upload/v1762077497/Ahmed_Sahigara_n6vm4b.webp", linkedin: "https://www.linkedin.com/in/ahmed-sahigara/", instagram: "https://www.instagram.com/spfeezy" },
      { id: 10, name: "Sanchit Sood", position: "Department Head", image: "https://res.cloudinary.com/dmaalzm4h/image/upload/v1762181807/Sanchit_pglzmb.webp", linkedin: "https://www.linkedin.com/in/sanchit-sood-8583a02aa/" },
    ],
    "Events and Operations": [
      { id: 2, name: "Aryan Nair", position: "Department Head", image: "https://res.cloudinary.com/dmaalzm4h/image/upload/v1762077498/Aryan_Nair_ls6fxt.webp", linkedin: "https://www.linkedin.com/in/aryan-nair-a1805-n/", instagram: "https://www.instagram.com/aryannair_18o5" },
      { id: 11, name: "Anshuman Utpal", position: "Department Head", image: "https://res.cloudinary.com/dmaalzm4h/image/upload/v1762079599/Anshuman_ssaqhc.webp", linkedin: "https://www.linkedin.com/in/anshuman-utpal-69133033a/" },
    ],
    "Internal Relations & Resource Management": [
      { id: 5, name: "Prakhar Bhagat", position: "Department Head", image: "https://res.cloudinary.com/dmaalzm4h/image/upload/v1762079612/Prakhar_ph5xio.webp", linkedin: "https://www.linkedin.com/in/prakhar-bhagat/" },
    ],
    "Marketing": [
      { id: 3, name: "Krishna Vatsal Mishra", position: "Department Head", image: "https://res.cloudinary.com/dmaalzm4h/image/upload/v1762077684/Krishna_Vatsal_Mishra_dncrj6.webp", linkedin: "https://www.linkedin.com/in/krishna-vatsal-mishra-163638258/", instagram: "https://www.instagram.com/krishnaaa.0_o" },
      { id: 12, name: "Mehak Khandelwal", position: "Department Head", image: "https://res.cloudinary.com/dmaalzm4h/image/upload/v1762079604/Mehak_uohvuy.webp", linkedin: "https://www.linkedin.com/in/mehak-khandelwal-1423871b3/" },
    ],
    "Corporate and Alumni Relations": [
      { id: 13, name: "Suhani Gupta", position: "Department Head", image: "https://res.cloudinary.com/dmaalzm4h/image/upload/v1762079591/Suhani_vyta27.webp", linkedin: "https://www.linkedin.com/in/suhani-gupta-46821a2a1/" },
      { id: 14, name: "Piyush Kumar", position: "Department Head", image: "https://res.cloudinary.com/dmaalzm4h/image/upload/v1762079607/Piyush_K_j20eu6.webp", linkedin: "https://www.linkedin.com/in/piyush-kumar-8b0b722a3/" },
    ],
    "Public Relations and Outreach": [
      { id: 15, name: "Ambica Mehra", position: "Department Head", image: "https://res.cloudinary.com/dmaalzm4h/image/upload/v1762079596/Ambica_ogwi7b.webp", linkedin: "https://www.linkedin.com/in/ambica-mehra-461aa7279/" },
      { id: 4, name: "Preyanshi Doshi", position: "Department Head", image: "https://res.cloudinary.com/dmaalzm4h/image/upload/v1762077733/Preyanshi_Doshi_a6cppr.webp", linkedin: "https://www.linkedin.com/in/preyanshi-doshi-0aa909281/", instagram: "https://www.instagram.com/preyanshi.doshi" },
    ],
  },
};

export const getAvailableYears = (): string[] => {
  return Object.keys(teamData).sort((a, b) => b.localeCompare(a));
};

export const getDepartmentsForYear = (year: string): string[] => {
  return Object.keys(teamData[year] || {});
};
