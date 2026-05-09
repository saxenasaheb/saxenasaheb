// ─────────────────────────────────────────────────────────────────────────────
// SITE CONFIG — single source of truth for all editable content
// Update this file to change practitioner details, services, copy, and metadata.
// ─────────────────────────────────────────────────────────────────────────────

export const practitioner = {
  name: "Sue-Ellen Pereira",
  titleLine1: "Advanced Musculoskeletal",
  titleLine2: "Physiotherapist",
  roles: [
    "Advanced Musculoskeletal Physiotherapist",
    "Clinical Lead",
    "First Contact Practitioner",
  ],
  tagline: "Expert musculoskeletal physiotherapy. NHS-trained. London-based.",
  email: "hello@sueellenpereira.co.uk", // PLACEHOLDER — update before launch
  phone: "+44 7700 900000",             // PLACEHOLDER — update before launch
  location: {
    addressLine1: "Private Clinic",           // PLACEHOLDER
    addressLine2: "London",                   // PLACEHOLDER
    city: "London",
    postcode: "EC1A 1AA",                     // PLACEHOLDER
    country: "UK",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.9!2d-0.1!3d51.5!", // PLACEHOLDER
  },
  openingHours: [
    { day: "Monday", hours: "8:00am – 7:00pm" },
    { day: "Tuesday", hours: "8:00am – 7:00pm" },
    { day: "Wednesday", hours: "8:00am – 7:00pm" },
    { day: "Thursday", hours: "8:00am – 7:00pm" },
    { day: "Friday", hours: "8:00am – 5:00pm" },
    { day: "Saturday", hours: "9:00am – 2:00pm" },
    { day: "Sunday", hours: "Closed" },
  ],
} as const;

export const registrations = {
  hcpc: "PHY00000", // PLACEHOLDER — HCPC registration number
  csp: "000000",    // PLACEHOLDER — CSP membership number
  ico: "ZA000000",  // PLACEHOLDER — ICO registration number
};

export const credentials = [
  { label: "HCPC Registered", abbr: "HCPC" },
  { label: "Chartered Society of Physiotherapy Member", abbr: "CSP" },
  { label: "MSc Advanced Physiotherapy", abbr: "MSc" },
  { label: "Band 8a Clinical Lead, NHS", abbr: "NHS Band 8a" },
  { label: "FCP Roadmap Supervisor, Health Education England", abbr: "FCP Supervisor" },
  {
    label: "Independent Prescribing — University of Hertfordshire (in progress)",
    abbr: "IP (in progress)",
  },
] as const;

export const bio = {
  shortIntro:
    "Advanced MSK physiotherapy, evidence-based from day one.",
  paragraphs: [
    "Sue-Ellen is an Advanced Musculoskeletal Physiotherapist and Clinical Lead with the NHS, where she leads First Contact Practitioner services across North East London.",
    "With an MSc in Advanced Physiotherapy and specialist expertise in complex MSK conditions, sports injuries, and injection therapy, she brings the same evidence-based, consultant-level care to her private clinic.",
    "She mentors clinicians through advanced practice pathways as an FCP Supervisor with Health Education England, and has volunteered as part of the medical teams at major sporting events including the Birmingham Commonwealth Games and the London Marathon.",
  ],
  sportingEvents: [
    {
      event: "Birmingham Commonwealth Games 2022",
      role: "Medical Team Volunteer",
      description:
        "Provided pitch-side and athlete support at one of the world's largest multi-sport events.",
    },
    {
      event: "London Marathon",
      role: "Medical Team Volunteer",
      description:
        "Delivered on-course injury assessment and management for marathon runners.",
    },
  ],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES — all marked PLACEHOLDER: confirm with client before launch
// ─────────────────────────────────────────────────────────────────────────────
export const services = [
  {
    id: "initial-assessment",
    label: "ASSESSMENT",
    title: "Initial MSK Assessment & Treatment",
    duration: "60 min",
    price: "£120",
    priceNote: null,
    description:
      "A comprehensive first appointment covering detailed history-taking, clinical examination, movement analysis, and a working diagnosis — followed by hands-on treatment in the same session. You will leave with clarity on your condition and a personalised management plan.",
    whatToExpect: [
      "Full subjective and objective assessment",
      "Evidence-based clinical diagnosis",
      "Hands-on treatment within the same appointment",
      "Personalised rehabilitation plan",
      "Onward referral or imaging advice if indicated",
    ],
    image: {
      // PLACEHOLDER: editorial portrait-orientation image — hands on shoulder, soft light
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
      alt: "Physiotherapy assessment session",
    },
    placeholder: true,
  },
  {
    id: "follow-up",
    label: "FOLLOW-UP",
    title: "Follow-up Treatment",
    duration: "45 min",
    price: "£90",
    priceNote: null,
    description:
      "Focused treatment sessions to progress your rehabilitation, refine your management plan, and deliver targeted manual therapy, exercise prescription, or other specialist interventions as clinically indicated.",
    whatToExpect: [
      "Progress review against your management goals",
      "Targeted manual therapy and rehabilitation",
      "Exercise programme review and progression",
      "Ongoing monitoring and plan adjustment",
    ],
    image: {
      // PLACEHOLDER: movement/rehabilitation exercise image
      src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
      alt: "Physiotherapy follow-up treatment session",
    },
    placeholder: true,
  },
  {
    id: "sports-injury",
    label: "SPORTS INJURY",
    title: "Sports Injury Consultation",
    duration: "60 min",
    price: "£130",
    priceNote: null,
    description:
      "Specialist assessment for acute and chronic sports injuries, with a focus on accurate diagnosis, safe return-to-sport planning, and performance optimisation. Drawing on clinical experience from elite sporting events including the Commonwealth Games and London Marathon.",
    whatToExpect: [
      "Sport-specific injury assessment",
      "Biomechanical screening where relevant",
      "Structured return-to-sport programme",
      "Load management and performance advice",
      "Liaison with coaching staff on request",
    ],
    image: {
      // PLACEHOLDER: running shoes or athletic movement, warm light, editorial
      src: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&q=80",
      alt: "Sports physiotherapy consultation",
    },
    placeholder: true,
  },
  {
    id: "injection-therapy",
    label: "INJECTION THERAPY",
    title: "Injection Therapy Consultation",
    duration: "45 min",
    price: "£150",
    priceNote: "Subject to clinical assessment",
    description:
      "Expert-led consultation for patients where injection therapy may be clinically appropriate — including corticosteroid and hyaluronic acid injections for joint, tendon, and soft tissue conditions. Treatment is only offered where evidence supports clinical benefit.",
    whatToExpect: [
      "Thorough clinical assessment of suitability",
      "Discussion of evidence, benefits, and risks",
      "Procedure under strict clinical governance",
      "Post-procedure rehabilitation guidance",
      "Follow-up review as clinically indicated",
    ],
    image: {
      // PLACEHOLDER: clinical close-up, neutral tones — not generic syringe stock
      src: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80",
      alt: "Injection therapy consultation",
    },
    placeholder: true,
  },
  {
    id: "gait-analysis",
    label: "GAIT ANALYSIS",
    title: "Running Gait Analysis",
    duration: "75 min",
    price: "£160",
    priceNote: null,
    description:
      "A detailed video-based analysis of your running mechanics, identifying movement patterns that contribute to injury or inefficiency. Paired with an advanced MSK assessment and a structured programme to correct technique and reduce re-injury risk.",
    whatToExpect: [
      "Treadmill video capture and slow-motion analysis",
      "Biomechanical assessment of foot, knee, hip, and trunk",
      "Personalised technique cues and drills",
      "Footwear and orthotics advice",
      "Written report with annotated video findings",
    ],
    image: {
      // PLACEHOLDER: runner in motion, editorial style, natural light
      src: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=600&q=80",
      alt: "Running gait analysis session",
    },
    placeholder: true,
  },
] as const;

export const cancellationPolicy = {
  noticePeriod: "48 hours",
  lateCancellationFee: "50% of the appointment fee",
  nonAttendanceFee: "Full appointment fee",
  detail:
    "We require 48 hours' notice to cancel or rearrange an appointment. Cancellations with less than 48 hours' notice will incur a charge of 50% of the appointment fee. Failure to attend without notice will be charged at the full appointment fee. This policy exists to protect appointment availability for all patients.",
};

export const memberships = [
  {
    name: "HCPC",
    fullName: "Health and Care Professions Council",
    description: "Regulatory body for health and care professionals in the UK",
    logoPlaceholder: "HCPC",
  },
  {
    name: "CSP",
    fullName: "Chartered Society of Physiotherapy",
    description: "UK's professional, educational and trade union body for physiotherapists",
    logoPlaceholder: "CSP",
  },
  {
    name: "HEE",
    fullName: "Health Education England",
    description: "FCP Roadmap Supervisor — advancing clinical practice in primary care",
    logoPlaceholder: "HEE",
  },
  {
    name: "NHS",
    fullName: "National Health Service",
    description: "Band 8a Clinical Lead, Advanced MSK Physiotherapy",
    logoPlaceholder: "NHS",
  },
] as const;

// PLACEHOLDER — replace with real testimonials before launch
export const testimonials = [
  {
    id: 1,
    quote:
      "Sue-Ellen's assessment was the most thorough I've had — she identified the root cause of my knee pain that two previous practitioners had missed. I was back running within six weeks.",
    author: "M.T.",
    context: "Sports injury — knee",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "The level of expertise is exceptional. She explains everything clearly, and her treatment plan was evidence-based and structured. My shoulder is finally pain-free after months of struggling.",
    author: "R.P.",
    context: "Shoulder rehabilitation",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "I came in with a complex lower back presentation that had been going on for years. Sue-Ellen's diagnostic approach was methodical and precise, and her treatment got results where others hadn't.",
    author: "J.A.",
    context: "Chronic low back pain",
    rating: 5,
  },
] as const;

export const faqs = [
  {
    question: "What happens during an initial assessment?",
    answer:
      "Your first appointment lasts 60 minutes and covers a detailed history of your symptoms, a full physical examination including movement analysis and special clinical tests, and a working diagnosis. Treatment begins within the same session. You will leave with a clear understanding of your condition and a personalised management plan.",
  },
  {
    question: "Do I need a GP referral?",
    answer:
      "No — you can self-refer directly. As an Advanced MSK Physiotherapist and First Contact Practitioner, Sue-Ellen can assess, diagnose, and treat without a GP referral. If imaging or onward specialist referral is clinically indicated, she will advise accordingly.",
  },
  {
    question: "How many appointments will I need?",
    answer:
      "This varies considerably depending on your condition, chronicity, and goals. Many patients see significant improvement within 3–6 sessions. You will receive a realistic expectation at your first appointment, and the plan is reviewed and adjusted as you progress.",
  },
  {
    question: "Is injection therapy available at the first appointment?",
    answer:
      "No — injection therapy requires a separate clinical assessment to confirm suitability and ensure you meet the criteria for treatment. This protects your safety and ensures any intervention is evidence-based and clinically justified.",
  },
  {
    question: "What should I wear?",
    answer:
      "Comfortable, loose-fitting clothing that allows access to the area being treated. For lower limb conditions, shorts are ideal. For shoulder or upper body conditions, a vest top or loose T-shirt works well. You can also change at the clinic.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We require 48 hours' notice to cancel or rearrange. Late cancellations (under 48 hours) are charged at 50% of the fee; non-attendance is charged at the full fee. This protects appointment availability for all patients.",
  },
] as const;

export const siteNav = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Book", href: "/book" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = {
  main: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Book an Appointment", href: "/book" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
} as const;
